export const SITE_QUERY = `{
  "events": *[_type == "event"] | order(order asc, title asc) {
    _id,
    title,
    visibility,
    order,
    "subEvents": subEvents[]{
      _key,
      academicYear,
      title,
      description,
      poster,
      "pdfUrl": pdf.asset->url
    }
  },

  "team": *[_type == "teamMember"] | order(order asc, name asc) {
    _id,
    name,
    role,
    team,
    department,
    linkedin,
    github,
    academicYear,
    order,
    photo
  },

  "community": *[_type == "communityMember"] | order(name asc) {
    _id,
    name,
    rollNo,
    branch,
    phone,
    membershipId,
    membershipType,
    academicYear
  },

  "blogs": *[_type == "blogPost" && published == true] | order(date desc) {
    _id,
    title,
    category,
    date,
    excerpt,
    coverImage,
    author,
    body
  },

  "calendar": *[_type == "calendarEvent"] | order(date asc, startTime asc) {
    _id,
    title,
    date,
    startTime,
    endTime,
    description,
    location,
    category,
    link
  }
}`;