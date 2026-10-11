import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: ['Tech & Trends', 'Community', 'Leadership', 'Events', 'Campus Life'] },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'date', title: 'Date', type: 'date', validation: (r) => r.required() }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3, validation: (r) => r.required().max(240) }),
    defineField({ name: 'coverImage', title: 'Cover image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'author', title: 'Author', type: 'string' }),
    defineField({ name: 'body', title: 'Content', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'published', title: 'Published', type: 'boolean', initialValue: false }),
  ],
  orderings: [{ title: 'Newest first', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'date', media: 'coverImage', published: 'published' }, prepare: ({ title, subtitle, media, published }) => ({ title, subtitle: `${subtitle || ''} ${published ? '' : '(draft)'}`, media }) },
});
