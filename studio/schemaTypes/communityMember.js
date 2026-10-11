import { defineField, defineType } from 'sanity';
import { yearOptions } from './years.js';

export default defineType({
  name: 'communityMember',
  title: 'Community Member',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'rollNo',
      title: 'Roll No',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'branch',
      title: 'Branch',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'phone',
      title: 'Phone No',
      type: 'string',
    }),

    defineField({
      name: 'membershipId',
      title: 'Membership ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'membershipType',
      title: 'Membership Type',
      type: 'string',
      options: {
        list: [
          { title: 'ACM', value: 'acm' },
          { title: 'ACM-W', value: 'acmw' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'academicYear',
      title: 'Academic Year',
      type: 'string',
      options: yearOptions,
      validation: (Rule) => Rule.required(),
    }),
  ],

  orderings: [
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Membership ID',
      name: 'membershipAsc',
      by: [{ field: 'membershipId', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'membershipId',
    },
  },
});