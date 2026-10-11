import { defineField, defineType } from 'sanity';
import { yearOptions } from './years.js';

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'role', title: 'Role', type: 'string', description: 'e.g. Chair, Web Master, Design Head', validation: (r) => r.required() }),
    defineField({
      name: 'team',
      title: 'Team',
      type: 'string',
      options: { list: [{ title: 'ACM', value: 'acm' }, { title: 'ACM-W', value: 'acmw' }, { title: 'Heads', value: 'heads' }], layout: 'radio' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'department',
      title: 'Department / head category',
      type: 'string',
      description: 'Only for Heads (e.g. Design, Promotion, Technical, Draft)',
      options: { list: ['Draft', 'Design', 'Promotion', 'Technical', 'Other'] },
      hidden: ({ document }) => document?.team !== 'heads',
    }),
    defineField({ name: 'linkedin', title: 'LinkedIn', type: 'url' }),
    defineField({ name: 'github', title: 'GitHub', type: 'url' }),
    defineField({ name: 'academicYear', title: 'Academic year', type: 'string', options: yearOptions, validation: (r) => r.required() }),
    defineField({ name: 'order', title: 'Display order', type: 'number', initialValue: 10 }),
    defineField({ name: 'photo', title: 'Photo (optional)', type: 'image', options: { hotspot: true } }),
  ],
  orderings: [{ title: 'Year, then order', name: 'yo', by: [{ field: 'academicYear', direction: 'desc' }, { field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'role', media: 'photo', year: 'academicYear', team: 'team' }, prepare: ({ title, subtitle, media, year, team }) => ({ title, subtitle: `${subtitle} · ${team} · ${year}`, media }) },
});
