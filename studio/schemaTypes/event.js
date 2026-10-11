import { defineArrayMember, defineField, defineType } from 'sanity';
import { yearOptions } from './years.js';

const MAX_PER_GROUP = 5; // the Events diagram has room for 5 per group
const API = '2025-01-01';
const strip = (id) => (id || '').replace(/^drafts\./, '');

/* Events shown on the "Events" diagram.
   - Group = Public or Private.
   - Every event (type) holds sub-events per academic year, each with a poster and a PDF.
     Site flow: Events -> pick event -> pick year -> poster cards -> click one -> its PDF. */
export default defineType({
  name: 'event',
  title: 'Event (Events page)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Name / type',
      type: 'string',
      description: 'Shown on the diagram, e.g. SPARDHA, AVEGA, HOUR OF CODE',
      validation: (r) =>
        r.required().min(2).max(30).custom(async (value, ctx) => {
          if (!value) return true;
          const client = ctx.getClient({ apiVersion: API });
          const dup = await client.fetch(
            `count(*[_type == "event" && lower(title) == lower($t) && !(_id in [$id, "drafts." + $id])])`,
            { t: value.trim(), id: strip(ctx.document?._id) }
          );
          return dup ? 'An event with this name already exists' : true;
        }),
    }),
    defineField({
      name: 'visibility',
      title: 'Group',
      type: 'string',
      options: { list: [{ title: 'Public', value: 'public' }, { title: 'Private', value: 'private' }], layout: 'radio' },
      initialValue: 'public',
      validation: (r) =>
        r.required().custom(async (value, ctx) => {
          if (!value) return true;
          const client = ctx.getClient({ apiVersion: API });
          const n = await client.fetch(
            `count(*[_type == "event" && visibility == $v && !(_id in [$id, "drafts." + $id])])`,
            { v: value, id: strip(ctx.document?._id) }
          );
          return n >= MAX_PER_GROUP ? `The diagram only has room for ${MAX_PER_GROUP} ${value} events. Remove or move another one first.` : true;
        }),
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers first.',
      initialValue: 10,
      validation: (r) => r.required().integer().min(1).max(999),
    }),
    defineField({
      name: 'subEvents',
      title: 'Sub-events (poster + PDF, per academic year)',
      description: 'On the site: Event -> pick year -> these sub-events show as poster cards -> click one to open its PDF.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'subEvent',
          title: 'Sub-event',
          fields: [
            defineField({ name: 'academicYear', title: 'Academic year', type: 'string', options: yearOptions, validation: (r) => r.required() }),
            defineField({ name: 'title', title: 'Sub-event name', type: 'string', validation: (r) => r.required().max(60) }),
            defineField({ name: 'description', title: 'Short description (optional)', type: 'string' }),
            defineField({ name: 'poster', title: 'Poster image', type: 'image', options: { hotspot: true }, validation: (r) => r.required() }),
            defineField({ name: 'pdf', title: 'Event PDF', type: 'file', options: { accept: 'application/pdf' }}),
          ],
          preview: {
            select: { title: 'title', year: 'academicYear', media: 'poster' },
            prepare: ({ title, year, media }) => ({ title: title || 'Untitled', subtitle: year, media }),
          },
        }),
      ],
      validation: (r) => [
        r.custom((list) => {
          const keys = (list || []).filter((d) => d.academicYear && d.title).map((d) => d.academicYear + '|' + d.title.trim().toLowerCase());
          const dup = keys.find((k, i) => keys.indexOf(k) !== i);
          return dup ? `Duplicate sub-event in the same year: ${dup.replace('|', ' / ')}` : true;
        }),
        r
          .custom((list, ctx) =>
            ctx.document?.visibility === 'public' && !(list || []).length
              ? { message: 'Public events should have at least one sub-event (poster + PDF)', level: 'warning' }
              : true
          )
          .warning(),
      ],
    }),
  ],
  orderings: [{ title: 'Display order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', visibility: 'visibility', drafts: 'subEvents' },
    prepare: ({ title, visibility, drafts }) => ({
      title,
      subtitle: `${visibility === 'private' ? 'Private' : 'Public'} · ${(drafts || []).length} sub-event(s)`,
    }),
  },
});
