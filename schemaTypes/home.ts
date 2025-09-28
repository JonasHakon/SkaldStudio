import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  fields: [
    defineField({ name: 'cover', title: 'Cover', type: 'image', options: {hotspot: true}, validation: r => r.required() }),
    defineField({ name: 'background', title: 'Background', type: 'image', options: {hotspot: true}, validation: r => r.required() }),
    defineField({ name: 'text', title: 'Text', type: 'text', rows: 3, validation: r => r.required() }),
  ],
  preview: { select: { title: 'text', media: 'image' } },
})
