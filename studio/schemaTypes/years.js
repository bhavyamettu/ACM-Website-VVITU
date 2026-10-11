// Academic years like "2025-26" (2017-18 … 2035-36)
export const ACADEMIC_YEARS = Array.from({ length: 19 }, (_, i) => {
  const y = 2035 - i;
  return `${y}-${String((y + 1) % 100).padStart(2, '0')}`;
});
export const yearOptions = { list: ACADEMIC_YEARS.map((y) => ({ title: y, value: y })) };
