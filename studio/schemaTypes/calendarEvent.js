import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'calendarEvent',
  title: 'Calendar Event',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'date', title: 'Date', type: 'date', validation: (r) => r.required() }),
    defineField({ name: 'startTime', title: 'Start time', type: 'string', description: 'e.g. 10:00 AM' }),
    defineField({ name: 'endTime', title: 'End time', type: 'string', description: 'e.g. 12:30 PM' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: ['Talk', 'Workshop', 'Contest', 'Hackathon', 'Meeting', 'Other'] },
      initialValue: 'Other',
    }),
    defineField({ name: 'link', title: 'Link', type: 'url' }),
  ],
  orderings: [{ title: 'Date', name: 'date', by: [{ field: 'date', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'date' } },
});
