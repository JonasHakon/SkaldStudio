import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'work',
  title: 'Work',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 96 } }),
    defineField({ name: 'picture', title: 'picture', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'gallery1', title: 'Gallery 1', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'gallery2', title: 'Gallery 2', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'venue', title: 'Venue', type: 'string' }),
    defineField({ name: 'author', title: 'Author', type: 'string' }),
    defineField({ name: 'description1', title: 'Description 1', type: 'text' }),
    defineField({ name: 'description2', title: 'Description 2', type: 'text' }),
    defineField({ name: 'date', title: 'Date', type: 'date' }),

    // Links
    defineField({ name: 'purchaseLink', title: 'Purchase Link', type: 'url' }),
    defineField({ name: 'videoLink', title: 'Video Link (YouTube/Vimeo URL)', type: 'url' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'venue', media: 'gallery1.0' },
  },
})
