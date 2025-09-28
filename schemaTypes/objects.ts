import {defineType, defineField} from 'sanity'

// Review object
export const review = defineType({
  name: 'review',
  title: 'Review',
  type: 'object',
  fields: [
    defineField({
      name: 'rating',
      title: 'Rating (1–5)',
      type: 'number',
      validation: r => r.required().integer().min(1).max(5),
    }),
    defineField({ name: 'text', title: 'Text', type: 'text', validation: r => r.required() }),
    defineField({ name: 'name', title: 'Name', type: 'string', validation: r => r.required() }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'rating' },
    prepare: ({title, subtitle}) => ({ title: title || 'Review', subtitle: `Rating: ${subtitle ?? '-'}` }),
  },
})

// Testimony object
export const testimony = defineType({
  name: 'testimony',
  title: 'Testimony',
  type: 'object',
  fields: [
    defineField({ name: 'text', title: 'Text', type: 'text', validation: r => r.required() }),
    defineField({ name: 'name', title: 'Name', type: 'string', validation: r => r.required() }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'text' },
  },
})
