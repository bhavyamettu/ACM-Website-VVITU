
import { useNav } from '../NavContext.jsx';
import { YRS, sameName } from '../data/content.js';
import { useCms } from '../lib/CmsContext.jsx';

export default function MemberList({ kind, year = YRS[0] }) {
  const { go } = useNav();
  const w = kind === 'ACMW';

  const { community, teamByYear } = useCms();

  const type = w ? 'acmw' : 'acm';

  const rows = community.filter(
    (m) =>
      m.membershipType === type &&
      m.academicYear === year
  );

  const cur = teamByYear[year] || {
    acm: [],
    acmw: [],
    heads: [],
  };

  const team = [
    ...cur[type],
    ...cur.heads,
  ]
    .filter((m) => m.n && m.n !== 'Name Surname')
    .map((m) => ({
      n: m.n,
      r: m.r,
    }));

  return (
    <>
      <button
        className="back rv"
        onClick={() => go('memtl', 'back')}
      >
        <span>←</span> Back to Timeline
      </button>

      <div
        className="mh"
        style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: 30,
          alignItems: 'center',
        }}
      >
        <div
          className="pol rv"
          style={{
            transform: 'rotate(-5deg)',
            '--i': 1,
          }}
        >
          <i
            style={{
              height: 170,
              ...(w
                ? {
                    background:
                      'linear-gradient(135deg,#4a3f79,#8d9ad0,#a5bf9a)',
                  }
                : null),
            }}
          ></i>
        </div>

        <div
          className="rv"
          style={{ textAlign: 'center' }}
        >
          <p className="eyebrow">— OUR COMMUNITY —</p>

          <h1
            className="serif"
            style={{
              font:
                "600 clamp(38px,6vw,60px)/1.1 'Lora'",
            }}
          >
            {w ? 'ACM-W MEMBERS' : 'ACM MEMBERS'}
          </h1>

          <p
            className="hand"
            style={{
              fontSize: 28,
              marginTop: 4,
            }}
          >
            {year}
          </p>

          <p
            style={{
              letterSpacing: '.15em',
              margin: '8px 0',
              color: '#4b5b78',
            }}
          >
            {w
              ? 'Empowering • Supporting • Leading'
              : 'Innovators • Builders • Problem Solvers'}
          </p>

          <p style={{ fontSize: 14 }}>
            {w
              ? 'A community dedicated to encouraging women in computing and creating a more inclusive tech world.'
              : 'A community of learners and leaders passionate about computing, technology and real-world impact.'}
          </p>
        </div>
      </div>

      <div
  className="card rv"
  style={{
    "--i": 3,
    marginTop: 30,
  }}
>
  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
      tableLayout: "fixed",
      fontSize: "13px",
    }}
  >
    <thead>
      <tr>
        <th style={{ width: "25%" }}>Name</th>
        <th style={{ width: "15%" }}>Roll No</th>
        <th style={{ width: "18%" }}>Branch</th>
        <th style={{ width: "18%" }}>Phone No</th>
        <th style={{ width: "24%" }}>Membership ID</th>
      </tr>
    </thead>

    <tbody>
      {rows.length === 0 && (
        <tr>
          <td colSpan={5} style={{ textAlign: "center", padding: "20px" }}>
            No members listed for {year} yet.
          </td>
        </tr>
      )}

      {rows.map((row) => {
        const m = team.find((p) => sameName(p.n, row.name));

        return (
          <tr key={row._id}>
            <td
              className={m ? "td-tm" : undefined}
              data-r={m?.r}
              title={m ? "Team · " + m.r : undefined}
              style={{ wordBreak: "break-word", padding: "8px" }}
            >
              {row.name}
            </td>

            <td style={{ padding: "8px" }}>{row.rollNo}</td>

            <td style={{ wordBreak: "break-word", padding: "8px" }}>
              {row.branch}
            </td>

            <td style={{ padding: "8px" }}>{row.phone || "-"}</td>

            <td style={{ wordBreak: "break-all", padding: "8px" }}>
              {row.membershipId}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>
    </>
  );
}