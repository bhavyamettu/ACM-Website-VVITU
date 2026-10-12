
import React from 'react';
import Page from '../components/Page.jsx';
import Decor from '../components/Decor.jsx';
import MemberList from '../components/MemberList.jsx';
import BlogGrid from '../components/BlogGrid.jsx';
import Calendar from '../components/Calendar.jsx';
import ContactForm from '../components/ContactForm.jsx';
import Features from '../components/Features.jsx';
import EventsStage from '../components/EventsStage.jsx';
import TimelineStrip from '../components/TimelineStrip.jsx';
import TeamPanel from '../components/TeamPanel.jsx';
import YearDraft from '../components/YearDraft.jsx';
import SubEventView from '../components/SubEventView.jsx';
import { useNav } from '../NavContext.jsx';

import collegeImg from '../assets/img30.jpg';
import compassImage from '../assets/compass-illustration.png';
import acmMembersImg from '../assets/img31.webp';
import acmwMembersImg from '../assets/img32.webp';

/* COMMUNITY */
export function Section_community() {
  const { openMemberTL } = useNav();

  return (
    <Page id="community">
      <Decor name="community" />

      <div
        className="note"
        style={{
          right: '5vw',
          top: '240px',
          background: 'none',
          boxShadow: 'none',
          transform: 'rotate(-12deg)',
        }}
      >
        Stronger
        <br />
        &nbsp;Together
      </div>

      <div className="wrap">
        <p className="eyebrow rv">— OUR COMMUNITY —</p>

        <h1
          className="serif rv"
          style={{
            '--i': '1',
            textAlign: 'center',
            font: "600 clamp(56px,9vw,104px)/1.05 'Lora'",
          }}
        >
          MEMBERS
        </h1>

        <p
          className="rv"
          style={{
            '--i': '2',
            textAlign: 'center',
            fontSize: '18px',
            maxWidth: '520px',
            margin: '14px auto 0',
            lineHeight: '1.7',
          }}
        >
          Meet the passionate minds building technology, creating impact,
          and growing together.
        </p>

        <div className="two community-cards">
          {/* ACM MEMBERS CARD */}
          <div
            className="card cm rv community-card acm-community-card"
            style={{ '--i': '3' }}
          >
            <div className="community-card-image acm-community-image">
              <img
                src={acmMembersImg}
                alt="ACM student community"
                loading="lazy"
              />
              <span className="community-image-label">
                ACM COMMUNITY
              </span>
            </div>

            <div className="community-card-content">
              <div
                className="alg"
                style={{
                  width: '50px',
                  height: '50px',
                  margin: '0 0 10px 8px',
                }}
              />

              <h2
                className="serif"
                style={{ font: "500 34px 'Lora'" }}
              >
                ACM Members
              </h2>

              <div className="tags">
                Innovators<s>•</s>Builders<s>•</s>Problem Solvers
              </div>

              <p className="community-card-description">
                A community of learners and leaders passionate about
                computing, technology and real-world impact.
              </p>

              <button
                type="button"
                className="btn"
                onClick={() => openMemberTL('ACM')}
              >
                View ACM Members →
              </button>
            </div>
          </div>

          {/* ACM-W MEMBERS CARD */}
          <div
            className="card cm rv community-card acmw-community-card"
            style={{ '--i': '4' }}
          >
            <div className="community-card-image acmw-community-image">
              <img
                src={acmwMembersImg}
                alt="ACM-W student community"
                loading="lazy"
              />
              <span className="community-image-label">
                ACM-W COMMUNITY
              </span>
            </div>

            <div className="community-card-content">
              <div
                className="dia"
                style={{
                  width: '44px',
                  height: '44px',
                  margin: '0 0 10px 8px',
                  background: '#9333ea',
                }}
              >
                <b>W</b>
              </div>

              <h2
                className="serif"
                style={{ font: "500 34px 'Lora'" }}
              >
                ACM-W Members
              </h2>

              <div className="tags">
                Empowering<s>•</s>Supporting<s>•</s>Leading
              </div>

              <p className="community-card-description">
                A community dedicated to encouraging women in computing
                and creating a more inclusive tech world.
              </p>

              <button
                type="button"
                className="btn"
                onClick={() => openMemberTL('ACMW')}
              >
                View ACM-W Members →
              </button>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

/* COMMUNITY MEMBER TIMELINE */
export function Section_memtl() {
  const { go, mem } = useNav();
  const w = mem.kind === 'ACMW';

  return (
    <Page id="memtl">
      <Decor name="timeline" />

      <div className="wrap" style={{ maxWidth: '1500px' }}>
        <button
          className="back rv"
          style={{ marginLeft: 'min(7vw,110px)' }}
          onClick={() => go('community', 'back')}
        >
          <span>←</span> Back to Community
        </button>

        <div style={{ textAlign: 'center', marginTop: '-6px' }}>
          <p className="eyebrow rv">
            —— {w ? 'ACM-W MEMBERS' : 'ACM MEMBERS'} ——
          </p>

          <h1
            className="serif rv"
            style={{
              '--i': '1',
              font: '600 clamp(46px,6vw,84px)/1.1 Lora,serif',
            }}
          >
            Timeline
          </h1>

          <p
            className="hand rv"
            style={{ '--i': '2', fontSize: '26px' }}
          >
            Pick a year to see that year's members
          </p>
        </div>

        <TimelineStrip fn="pickMember" />
      </div>
    </Page>
  );
}

/* COMMUNITY MEMBERS BY YEAR */
export function Section_memyear() {
  const { mem } = useNav();
  const w = mem.kind === 'ACMW';

  return (
    <Page id="memyear">
      <Decor name={w ? 'acmw' : 'members'} />

      <div
        className="note"
        style={{
          left: '2vw',
          top: '180px',
          transform: 'rotate(-8deg)',
        }}
      >
        {w ? (
          <>
            Support
            <br />
            Encourage
            <br />
            Create Change ♡
          </>
        ) : (
          <>
            Technology
            <br />
            Builds
            <br />
            Better
            <br />
            Tomorrows
          </>
        )}
      </div>

      <div
        className="note"
        style={{
          right: '3vw',
          top: '150px',
          background: 'none',
          boxShadow: 'none',
        }}
      >
        {w ? (
          <>
            More Women
            <br />
            in Tech
            <br />
            More Possibilities
          </>
        ) : (
          <>
            Build
            <br />
            Learn
            <br />
            Grow
            <br />
            Together
          </>
        )}
      </div>

      <div className="wrap" style={{ maxWidth: '1000px' }}>
        <MemberList kind={mem.kind} year={mem.year} />
      </div>
    </Page>
  );
}

/* BLOG */
export function Section_blog() {
  return (
    <Page id="blog">
      <Decor name="blog" />

      <div className="wrap">
        <p
          className="rv"
          style={{
            letterSpacing: '.2em',
            fontWeight: '600',
            color: 'var(--navy)',
            fontSize: '14px',
          }}
        >
          OUR BLOGS ————
        </p>

        <h1
          className="serif rv"
          style={{
            '--i': '1',
            font: "600 clamp(44px,7vw,76px)/1.1 'Lora'",
          }}
        >
          Insights &amp; Stories
        </h1>

        <p
          className="rv"
          style={{
            '--i': '2',
            fontSize: '17px',
            lineHeight: '1.6',
            maxWidth: '520px',
            marginTop: '14px',
          }}
        >
          Thoughts, experiences and updates from our community. Explore
          articles, tips and stories that inspire and inform.
        </p>

        <BlogGrid />
      </div>
    </Page>
  );
}

/* CALENDAR */
export function Section_calendar() {
  return (
    <Page id="calendar">
      <Decor name="calendar" />

      <div
        className="note"
        style={{
          left: '1vw',
          top: '400px',
          transform: 'rotate(-8deg)',
        }}
      >
        Code
        <br />
        Create
        <br />
        Collaborate
      </div>

      <div className="wrap">
        <div
          className="calendar-heading"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '20px',
            alignItems: 'flex-start',
          }}
        >
          <div>
            <p
              className="rv"
              style={{
                letterSpacing: '.25em',
                fontSize: '13px',
                color: '#4b5b78',
              }}
            >
              —— EVENTS &amp; SCHEDULE
            </p>

            <h1
              className="serif rv"
              style={{
                '--i': '1',
                font: "600 clamp(44px,7vw,82px)/1 'Lora'",
              }}
            >
              ACM EVENT
              <br />
              CALENDAR
            </h1>

            <p
              className="rv"
              style={{
                '--i': '2',
                marginTop: '16px',
                color: '#4b5b78',
                lineHeight: '1.6',
                maxWidth: '430px',
              }}
            >
              Stay updated with all upcoming events, workshops, talks and
              activities from ACM VVIT.
            </p>
          </div>

          <div
            className="pol rv"
            style={{
              '--i': '2',
              width: '260px',
              transform: 'rotate(6deg)',
              flex: 'none',
            }}
          >
            <img
              id="collegeImg"
              src={collegeImg}
              alt="VVIT College"
              style={{
                width: '100%',
                height: '170px',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        </div>

        <Calendar />
      </div>
    </Page>
  );
}

/* CONTACT */
export function Section_contact() {
  return (
    <Page id="contact">
      <Decor name="contact" />

      <div
        className="note"
        style={{
          left: '2vw',
          top: '110px',
          background: 'none',
          boxShadow: 'none',
          transform: 'rotate(-10deg)',
        }}
      >
        Let's
        <br />
        Build
        <br />
        Together
      </div>

      <div className="wrap">
        <div
          className="ct"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
            alignItems: 'center',
          }}
        >
          <div>
            <p
              className="rv"
              style={{
                letterSpacing: '.25em',
                fontWeight: '600',
                color: 'var(--navy)',
                fontSize: '13px',
              }}
            >
              GET IN TOUCH ——
            </p>

            <h1
              className="serif rv"
              style={{
                '--i': '1',
                font: "600 clamp(44px,6vw,68px) 'Lora'",
              }}
            >
              Contact Us
            </h1>

            <p
              className="rv"
              style={{
                '--i': '2',
                margin: '12px 0 26px',
                color: '#4b5b78',
                lineHeight: '1.6',
              }}
            >
              Have a question, suggestion or just want to say hello?
              We'd love to hear from you. Reach out to us anytime!
            </p>

            <ContactForm />

            <div
              style={{
                display: 'flex',
                gap: '22px',
                marginTop: '22px',
                fontSize: '12px',
                flexWrap: 'wrap',
              }}
            >
              <span>
                📍 <b>VVIT Campus</b>
                <br />
                Guntur, Andhra Pradesh
              </span>

              <span>
                📞 <b>+91 98765 43210</b>
                <br />
                Mon - Fri, 9 AM - 5 PM
              </span>

              <span>
                ✉ <b>acm@vvitu.ac.in</b>
                <br />
                We reply within 24 hours
              </span>
            </div>
          </div>

          <div
            className="pol rv contact-image-frame"
            style={{
              '--i': '3',
              transform: 'rotate(2deg)',
              margin: '20px 10px',
              padding: '12px',
            }}
          >
            <img
              src={compassImage}
              alt="See you at the next event — compass illustration"
              className="contact-illustration"
            />
          </div>
        </div>

        <div className="vf">
          <div className="vfl">
            <div className="vlogo" />

            <p className="vr">
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="none"
                stroke="#0b2a55"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 11l9-8 9 8M5 9.500V21h5v-6h4v6h5V9.500" />
              </svg>

              <span>
                Vasireddy Venkatadri International Technological University
                <br />
                Nambur (V)
                <br />
                Peda Kakani (Md)
                <br />
                Guntur (Dt)
                <br />
                Andhra Pradesh
                <br />
                522508.
              </span>
            </p>

            <p className="vr">
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="none"
                stroke="#0b2a55"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 3h4l2 5-2.500 1.500a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" />
              </svg>

              <a href="tel:08632263339">(0863)2263339</a>
            </p>

            <p className="vr">
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="none"
                stroke="#0b2a55"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>

              <a href="mailto:acm.vvit@gmail.com">
                acm.vvit@gmail.com
              </a>
            </p>

            <p className="vr">
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="none"
                stroke="#0b2a55"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
              </svg>

              <a
                href="https://acm.vvitguntur.com"
                target="_blank"
                rel="noopener"
              >
                acm.vvitguntur.com
              </a>
            </p>
          </div>

          <div className="vfr">
            <h3>Google Map</h3>
            <a
              className="vmap"
              href="https://www.google.com/maps/search/?api=1&query=Vasireddy+Venkatadri+International+Technological+University"
              target="_blank"
              rel="noopener"
              aria-label="Open VVIT University in Google Maps"
            />
          </div>
        </div>
      </div>
    </Page>
  );
}

/* HOME */
export function Section_home() {
  const { go } = useNav();

  return (
    <Page id="home">
      <Decor name="home" />

      <div
        className="wrap hm"
        style={{ maxWidth: '1400px', paddingTop: '6vh' }}
      >
        <div className="hmt">
          <h1 className="rv">Association For Computing Machinery</h1>

          <p className="rv" style={{ '--i': '1' }}>
            A student-led community at VVITU, exploring technology,
            collaboration and innovation beyond the classroom.
          </p>

          <div
            className="rv"
            style={{
              '--i': '2',
              display: 'flex',
              gap: '14px',
              flexWrap: 'wrap',
            }}
          >
            <button className="btn big" onClick={() => go('events')}>
              Explore Events →
            </button>

            <button
              className="btn big ghost"
              onClick={() => go('about')}
            >
              About ACM →
            </button>
          </div>
        </div>

        <div className="pol hmp rv" style={{ '--i': '2' }}>
          <img alt="VVIT University" src={collegeImg} />
        </div>
      </div>
    </Page>
  );
}

/* HOME INTRO */
export function Section_home2() {
  return (
    <Page id="home2" frame>
      <Decor name="home2" />

      <div className="wrap" style={{ textAlign: 'center' }}>
        <div className="lg rv" />

        <h1 className="h2t rv" style={{ '--i': '1' }}>
          ACM VVITU
        </h1>

        <p className="h2s rv" style={{ '--i': '2' }}>
          ASSOCIATION FOR COMPUTING MACHINERY
        </p>
      </div>
    </Page>
  );
}

/* ABOUT */
export function Section_about() {
  const { openTL } = useNav();

  return (
    <Page id="about" frame>
      <Decor name="about" />

      <div className="wrap" style={{ maxWidth: '1280px' }}>
        <div className="ab1">
          <div>
            <p className="eb rv">— OUR STORY —</p>

            <h1 className="abh rv" style={{ '--i': '1' }}>
              About ACM
            </h1>

            <h3 className="abs rv" style={{ '--i': '1' }}>
              Association for Computing Machinery
            </h3>

            <p className="tx rv" style={{ '--i': '2' }}>
              ACM VVITU is the student chapter of the world's largest
              computing society, dedicated to fostering innovation,
              collaboration, and technical excellence among students.
              We provide a platform to learn, build, and grow through
              workshops, technical talks, hackathons, and community
              initiatives.
            </p>

            <button className="btn rv" onClick={() => openTL('ACM')}>
              Learn More →
            </button>
          </div>

          <div className="pol abp rv" style={{ '--i': '2' }}>
            <div
              className="ph"
              style={{ background: 'var(--phA) center/cover' }}
            />
          </div>
        </div>

        <Features id="ft1" cls="card ft rv" style={{ '--i': '3' }} />

        <div style={{ display: 'flex' }}>
          <div className="note qn rv" style={{ '--i': '4' }}>
            “ A global community empowering students to advance computing
            and create a better tomorrow.
          </div>
        </div>

        <div className="ab1 ab2" style={{ marginTop: '26px' }}>
          <div className="pol abp rv" style={{ rotate: '2deg' }}>
            <div
              className="ph"
              style={{
                background: 'var(--phW) center/cover',
                aspectRatio: '330/246',
              }}
            />
          </div>

          <div>
            <p className="eb rv">— OUR INITIATIVE —</p>

            <h1 className="abh rv">About ACM-W</h1>

            <h3 className="abs rv">
              ACM's Council on Women in Computing
            </h3>

            <p className="tx rv" style={{ '--i': '2' }}>
              ACM-W VVITU is a community dedicated to encouraging,
              supporting, and empowering women in computing. We aim to
              create an inclusive environment through technical programs,
              mentorship, networking and leadership opportunities,
              helping women explore, grow, and make an impact in technology.
            </p>

            <button className="btn rv" onClick={() => openTL('ACM-W')}>
              Learn More →
            </button>
          </div>
        </div>

        <Features id="ft2" cls="card ft w rv" style={{ marginTop: '30px' }} />

        <div style={{ height: '230px' }} />
      </div>
    </Page>
  );
}

/* EVENTS */
export function Section_events() {
  return (
    <Page id="events" frame>
      <Decor name="events" />
      <div className="evc">
        <EventsStage />
      </div>
    </Page>
  );
}

/* EVENTS TIMELINE */
export function Section_timeline() {
  const { go, tl } = useNav();

  return (
    <Page id="timeline">
      <Decor name="timeline" />

      <div className="wrap" style={{ maxWidth: '1500px' }}>
        <button
          className="back rv"
          style={{ marginLeft: 'min(7vw,110px)' }}
          onClick={() => go('events', 'back')}
        >
          <span>←</span> Back
        </button>

        <div style={{ textAlign: 'center', marginTop: '-6px' }}>
          <p className="eyebrow rv">—— EVENTS ——</p>

          <h1
            className="serif rv"
            style={{
              '--i': '1',
              font: '600 clamp(46px,6vw,84px)/1.1 Lora,serif',
            }}
          >
            Timeline
          </h1>

          <p className="hand rv" style={{ '--i': '2', fontSize: '26px' }}>
            {tl.cat}
          </p>
        </div>

        <TimelineStrip fn="pick" />
      </div>
    </Page>
  );
}

/* TEAM */
export function Section_team() {
  return (
    <Page id="team">
      <Decor name="team" />

      <div
        className="wrap"
        style={{ maxWidth: '1760px', padding: '0 6.5vw' }}
      >
        <p className="teb rv">
          <i />
          OUR<b>◆</b>TEAM
          <i />
        </p>

        <h1 className="tth rv" style={{ '--i': '1' }}>
          The People Behind
          <br />
          the Impact.
        </h1>

        <p className="ttp rv" style={{ '--i': '2' }}>
          A passionate group of students, builders, and dreamers working
          together to create a stronger tech community at VVITU.
        </p>

        <TeamPanel />
      </div>
    </Page>
  );
}

/* TEAM TIMELINE */
export function Section_teamtl() {
  return (
    <Page id="teamtl">
      <Decor name="timeline" />

      <div className="wrap" style={{ maxWidth: '1500px' }}>
        <button
          className="back rv"
          style={{ marginLeft: 'min(7vw,110px)' }}
          onClick={() => useNav().go('team', 'back')}
        >
          <span>←</span> Back to Team
        </button>

        <div style={{ textAlign: 'center', marginTop: '-6px' }}>
          <p className="eyebrow rv">—— OUR TEAM ——</p>

          <h1
            className="serif rv"
            style={{
              '--i': '1',
              font: '600 clamp(46px,6vw,84px)/1.1 Lora,serif',
            }}
          >
            Timeline
          </h1>

          <p className="hand rv" style={{ '--i': '2', fontSize: '26px' }}>
            Pick a year to meet that year's team
          </p>
        </div>

        <TimelineStrip fn="pickTeam" />
      </div>
    </Page>
  );
}

/* TEAM BY YEAR */
export function Section_tyear() {
  const { go, teamYear } = useNav();

  return (
    <Page id="tyear">
      <Decor name="team" />

      <div
        className="wrap"
        style={{ maxWidth: '1760px', padding: '0 6.5vw' }}
      >
        <button className="back rv" onClick={() => go('teamtl', 'back')}>
          <span>←</span> Back to Timeline
        </button>

        <p className="teb rv">
          <i />
          OUR<b>◆</b>TEAM<b>◆</b>
          <em style={{ fontStyle: 'normal' }}>{teamYear}</em>
          <i />
        </p>

        <h1 className="tth rv" style={{ '--i': '1' }}>
          The People Behind
          <br />
          the Impact.
        </h1>

        <p className="ttp rv" style={{ '--i': '2' }}>
          Meet the ACM VVITU team of <b>{teamYear}</b>.
        </p>

        <TeamPanel year />
      </div>
    </Page>
  );
}

/* EVENT YEAR */
export function Section_year() {
  const { go, tl } = useNav();

  return (
    <Page
      id="year"
      data-year={tl.year || undefined}
      data-cat={tl.cat || undefined}
    >
      <div className="yb">
        <button className="back" onClick={() => go('timeline', 'back')}>
          <span>←</span> Back
        </button>
      </div>

      <div className="ysheet has-draft">
        <i style={{ left: '-6px', top: '-6px' }} />
        <i style={{ right: '-6px', top: '-6px' }} />
        <i style={{ left: '-6px', bottom: '-6px' }} />
        <i style={{ right: '-6px', bottom: '-6px' }} />
        <YearDraft />
      </div>
    </Page>
  );
}

/* SUBEVENT */
export function Section_subevent() {
  const { go } = useNav();

  return (
    <Page id="subevent">
      <div className="yb">
        <button className="back" onClick={() => go('year', 'back')}>
          <span>←</span> Back
        </button>
      </div>

      <div className="ysheet has-draft">
        <i style={{ left: '-6px', top: '-6px' }} />
        <i style={{ right: '-6px', top: '-6px' }} />
        <i style={{ left: '-6px', bottom: '-6px' }} />
        <i style={{ right: '-6px', bottom: '-6px' }} />
        <SubEventView />
      </div>
    </Page>
  );
}

/* FALLBACK */
export function Section_stub() {
  const { go } = useNav();

  return (
    <Page id="stub">
      <div className="stub">
        <h1 className="serif" style={{ font: "600 48px 'Lora'" }}>
          Coming soon
        </h1>

        <p style={{ margin: '14px 0 24px' }}>
          This chapter of the book is still being written.
        </p>

        <button className="btn" onClick={() => go('community')}>
          Open Community →
        </button>
      </div>
    </Page>
  );
}

/* SECTION REGISTRY */
export const SECTIONS = [
  Section_community,
  Section_memtl,
  Section_memyear,
  Section_blog,
  Section_calendar,
  Section_contact,
  Section_home,
  Section_home2,
  Section_about,
  Section_events,
  Section_timeline,
  Section_team,
  Section_teamtl,
  Section_tyear,
  Section_year,
  Section_subevent,
  Section_stub,
];