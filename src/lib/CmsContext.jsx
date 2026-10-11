
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { client, sanityConfigured, urlFor } from './sanity.js';
import { SITE_QUERY } from './queries.js';
import {
  CATEGORY_COLORS,
  LOCAL_PHOTOS,
  PLACEHOLDER_TEAM,
  YRS,
} from '../data/content.js';
import { FALLBACK } from '../data/fallback.js';

const EMPTY = {
  events: [],
  team: [],
  community: [],
  blogs: [],
  calendar: [],
};

const CmsContext = createContext({
  ...EMPTY,
  loading: false,
  error: null,
});

export function CmsProvider({ children }) {
  const [state, setState] = useState({
    data: EMPTY,
    loading: sanityConfigured,
    error: null,
  });

  useEffect(() => {
    if (!client) {
      setState({ data: EMPTY, loading: false, error: null });
      return;
    }

    let off = false;

    client
      .fetch(SITE_QUERY)
      .then((data) => {
        if (off) return;

        const safeData = {
          ...EMPTY,
          ...data,
          events: Array.isArray(data?.events) ? data.events : [],
          team: Array.isArray(data?.team) ? data.team : [],
          community: Array.isArray(data?.community) ? data.community : [],
          blogs: Array.isArray(data?.blogs) ? data.blogs : [],
          calendar: Array.isArray(data?.calendar) ? data.calendar : [],
        };

        console.info('[Sanity] Blog posts returned:', safeData.blogs.length);

        if (safeData.blogs.length === 0) {
          console.warn(
            '[Sanity] No published blog posts found. Check the blog query and publish your blog document in Sanity Studio.'
          );
        }

        setState({
          data: safeData,
          loading: false,
          error: null,
        });
      })
      .catch((error) => {
        console.error('[Sanity] Fetch failed:', error);

        if (!off) {
          setState({
            data: EMPTY,
            loading: false,
            error,
          });
        }
      });

    return () => {
      off = true;
    };
  }, []);

  const value = useMemo(() => {
    const { data } = state;

    const group = (visibility) => {
      const own = data.events.filter(
        (event) => event.visibility === visibility
      );

      return own.length
        ? own
        : FALLBACK.events.filter(
            (event) => event.visibility === visibility
          );
    };

    const events = [...group('public'), ...group('private')];

    const members = (type) => {
      const own = data.community.filter(
        (member) => member.membershipType === type
      );

      return own.length
        ? own
        : FALLBACK.community.filter(
            (member) => member.membershipType === type
          );
    };

    const community = [...members('acm'), ...members('acmw')];

    // Use Sanity blog posts only; do not substitute fallback blog content.
    const blogs = data.blogs;

    const card = (member) => ({
      n: member.name,
      r: member.role,
      l: member.team === 'acmw' ? 'ACM-W' : undefined,
      li: member.linkedin,
      gh: member.github,
      p: LOCAL_PHOTOS[member.name],
      photo: member.photo
        ? urlFor(member.photo)
            .width(240)
            .height(240)
            .fit('crop')
            .url()
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