import xlsx from "xlsx";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "kaldn5j4",      // Example: kaldn5j4
  dataset: "production",
  apiVersion: "2025-01-01",
  token: "skvtliZbUwjuSYMklARsQn9vWE1XyVqoNnGKOmhYuDnrXWrf40F9gT5a7VoV4fgCMUXxNiJhml0EEjA3733Dfmj9Iyck7TTUKsBVdT7tlT3nbIIIKlWOaDAAwvT5MVbqNdNLWLwG1rNuCNx0J28J0CEdWTWcSkM7offmjXAnqw02NA9X59qe",
  useCdn: false,
});

const workbook = xlsx.readFile("./communityMembersW.xlsx");
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rows = xlsx.utils.sheet_to_json(sheet, {
  range: 1,
});
console.log(rows[0]);
console.log(`Found ${rows.length} members`);

for (const row of rows) {
  await client.create({
    _type: "communityMember",
    name: row["Name"] || "",
    rollNo: row["Roll No"] || "",
    branch: row["Branch"] || "",
    phone: String(row["Phn No"] || ""),
    membershipId: row["Membership Id"] || "",
    membershipType: "acmw",
    academicYear: "2025-26",
  });

  console.log(`Imported ${row["Name"]}`);
}

console.log("✅ Import completed.");