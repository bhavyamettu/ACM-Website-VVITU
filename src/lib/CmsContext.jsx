import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { client, sanityConfigured, urlFor } from './sanity.js';
import { SITE_QUERY } from './queries.js';
import { CATEGORY_COLORS, LOCAL_PHOTOS, PLACEHOLDER_TEAM, YRS } from '../data/content.js';
import { FALLBACK } from '../data/fallback.js';

const EMPTY = { events: [], team: [], community: [], blogs: [], calendar: [] };
const CmsContext = createContext({ ...EMPTY, loading: false });

export function CmsProvider({ children }) {
  const [state, setState] = useState({ data: EMPTY, loading: sanityConfigured, error: null });

  useEffect(() => {
    if (!client) return;
    let off = false;

    client
      .fetch(SITE_QUERY)
      .then((data) => {
        if (off) return;

        const n = Object.values(data).reduce(
          (a, list) => a + (Array.isArray(list) ? list.length : 0),
          0
        );

        if (!n) {
          console.warn(
            '[Sanity] Connected, but no PUBLISHED documents were returned. In Studio, click "Publish" on each document, and check the dataset name matches VITE_SANITY_DATASET.'
          );
        }

        setState({ data: { ...EMPTY, ...data }, loading: false, error: null });
      })
      .catch((error) => {
        console.error(
          '[Sanity] Fetch failed. Check the Sanity CORS origins, project ID, and dataset. Details:',
          error
        );

        if (!off) setState({ data: EMPTY, loading: false, error });
      });

    return () => {
      off = true;
    };
  }, []);

  const value = useMemo(() => {
    const { data } = state;

    const group = (visibility) => {
      const own = data.events.filter((event) => event.visibility === visibility);
      return own.length
        ? own
        : FALLBACK.events.filter((event) => event.visibility === visibility);
    };

    const events = [...group('public'), ...group('private')];

    const members = (type) => {
      const own = data.community.filter((member) => member.membershipType === type);
      return own.length
        ? own
        : FALLBACK.community.filter((member) => member.membershipType === type);
    };

    const community = [...members('acm'), ...members('acmw')];
    const blogs = data.blogs.length ? data.blogs : FALLBACK.blogs;

    const card = (member) => ({
      n: member.name,
      r: member.role,
      l: member.team === 'acmw' ? 'ACM-W' : undefined,
      li: member.linkedin,
      gh: member.github,
      p: LOCAL_PHOTOS[member.name],
      photo: member.photo
        ? urlFor(member.photo).width(240).height(240).fit('crop').url()
        : null,
    });

    const teamByYear = {};

    YRS.forEach((year, yearIndex) => {
      const membersForYear = data.team
        .filter((member) => member.academicYear === year)
        .slice()
        .sort((a, b) => {
          const orderA = Number.isFinite(a.order) ? a.order : 999999;
          const orderB = Number.isFinite(b.order) ? b.order : 999999;

          return orderA - orderB;
        });

      const pick = (team) => {
        const list = membersForYear
          .filter((member) => member.team === team)
          .map(card);

        if (list.length) return list;

        if (yearIndex === 0 && FALLBACK.team[team]) {
          return FALLBACK.team[team];
        }

        return PLACEHOLDER_TEAM[team];
      };

      teamByYear[year] = {
        acm: pick('acm'),
        acmw: pick('acmw'),
        heads: pick('heads'),
      };
    });

    const calendar = {};
    const calendarEvents = data.calendar.length
      ? data.calendar
      : FALLBACK.calendar;

    calendarEvents.forEach((event) => {
      if (!event.date) return;

      (calendar[event.date] ||= []).push({
        ...event,
        color:
          event.color ||
          CATEGORY_COLORS[event.category] ||
          CATEGORY_COLORS.Other,
      });
    });

    const subEventsFor = (title, year) => {
      const event = events.find((item) => item.title === title);

      return (event?.subEvents || [])
        .filter((item) => item.academicYear === year)
        .map((item) => ({
          ...item,
          posterUrl: item.poster
            ? urlFor(item.poster).width(700).url()
            : null,
        }));
    };

    return {
      ...data,
      subEventsFor,
      events,
      community,
      blogs,
      teamByYear,
      calendarByDate: calendar,
      loading: state.loading,
      error: state.error,
    };
  }, [state]);

  return (
    <CmsContext.Provider value={value}>
      {children}
    </CmsContext.Provider>
  );
}

export const useCms = () => useContext(CmsContext);