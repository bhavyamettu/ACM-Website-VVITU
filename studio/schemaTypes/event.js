
import { defineArrayMember, defineField, defineType } from 'sanity';
import { yearOptions } from './years.js';

const MAX_PER_GROUP = 5;
const API = '2025-01-01';

const strip = (id) => (id || '').replace(/^drafts\./, '');

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
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(30)
          .custom(async (value, context) => {
            if (!value) return true;

            const client = context.getClient({ apiVersion: API });
            const duplicate = await client.fetch(
              `count(*[
                _type == "event" &&
                lower(title) == lower($title) &&
                !(_id in [$id, "drafts." + $id])
              ])`,
              {
                title: value.trim(),
                id: strip(context.document?._id),
              }
            );

            return duplicate
              ? 'An event with this name already exists'
              : true;
          }),
    }),

    defineField({
      name: 'visibility',
      title: 'Group',
      type: 'string',
      options: {
        list: [
          { title: 'Public', value: 'public' },
          { title: 'Private', value: 'private' },
        ],
        layout: 'radio',
      },
      initialValue: 'public',
      validation: (Rule) =>
        Rule.required().custom(async (value, context) => {
          if (!value) return true;

          const client = context.getClient({ apiVersion: API });
          const count = await client.fetch(
            `count(*[
              _type == "event" &&
              visibility == $visibility &&
              !(_id in [$id, "drafts." + $id])
            ])`,
            {
              visibility: value,
              id: strip(context.document?._id),
            }
          );

          return count >= MAX_PER_GROUP
            ? `The diagram only has room for ${MAX_PER_GROUP} ${value} events. Remove or move another one first.`
            : true;
        }),
    }),

    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers first.',
      initialValue: 10,
      validation: (Rule) =>
        Rule.required().integer().min(1).max(999),
    }),

    defineField({
      name: 'subEvents',
      title: 'Sub-events (poster + PDF, per academic year)',
      description:
        'On the site: Event → pick year → sub-event poster cards → click one to open its PDF.',
      type: 'array',

      of: [
        defineArrayMember({
          type: 'object',
          name: 'subEvent',
          title: 'Sub-event',

          fields: [
            defineField({
              name: 'academicYear',
              title: 'Academic year',
              type: 'string',
              options: yearOptions,
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'title',
              title: 'Sub-event name',
              type: 'string',
              validation: (Rule) => Rule.required().max(60),
            }),

            defineField({
              name: 'eventSection',
              title: 'Section',
              description:
                'Choose whether this sub-event is a Main Event or a Spot Event.',
              type: 'string',
              options: {
                list: [
                  { title: 'Main Event', value: 'main' },
                  { title: 'Spot Event', value: 'spot' },
                ],
                layout: 'radio',
              },
              initialValue: 'main',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'description',
              title: 'Short description (optional)',
              type: 'string',
            }),

            defineField({
              name: 'poster',
              title: 'Poster image',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'pdf',
              title: 'Event PDF',
              type: 'file',
              options: { accept: 'application/pdf' },
            }),
          ],

          preview: {
            select: {
              title: 'title',
              year: 'academicYear',
              section: 'eventSection',
              media: 'poster',
            },
            prepare: ({ title, year, section, media }) => ({
              title: title || 'Untitled',
              subtitle: `${year || 'No academic year'} · ${
                section === 'spot' ? 'Spot Event' : 'Main Event'
              }`,
              media,
            }),
          },
        }),
      ],

      validation: (Rule) => [
        Rule.custom((list) => {
          const keys = (list || [])
            .filter((item) => item.academicYear && item.title)
            .map(
              (item) =>
                item.academicYear + '|' + item.title.trim().toLowerCase()
            );

          const duplicate = keys.find(
            (key, index) => keys.indexOf(key) !== index
          );

          return duplicate
            ? `Duplicate sub-event in the same year: ${duplicate.replace('|', ' / ')}`
            : true;
        }),

        Rule.custom((list, context) =>
          context.document?.visibility === 'public' &&
          !(list || []).length
            ? {
                message:
                  'Public events should have at least one sub-event (poster + PDF)',
                level: 'warning',
              }
            : true
        ).warning(),
      ],
    }),
  ],

  orderings: [
    {
      title: 'Display order',
      name: 'order',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      title: 'title',
      visibility: 'visibility',
      subEvents: 'subEvents',
    },
    prepare: ({ title, visibility, subEvents }) => ({
      title,
      subtitle: `${visibility === 'private' ? 'Private' : 'Public'} · ${
        (subEvents || []).length
      } sub-event(s)`,
    }),
  },
});

