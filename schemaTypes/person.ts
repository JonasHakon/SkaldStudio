import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  fields:  [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'firstName', title: 'FirstName', type: 'string', validation: r => r.required() }),
    defineField({ name: 'lastName', title: 'LastName', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 96 } }),
    defineField({ name: 'picture', title: 'Picture', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'secondPicture', title: 'Second Picture', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'signaturePicture', title: 'Signature Picture (High-Res)', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'height', title: 'Height (cm)', type: 'number' }),
    defineField({ name: 'eyeColor', title: 'Eye Color', type: 'string' }),
    defineField({ name: 'hair', title: 'Hair', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
  ],
  preview: {
    select: { title: 'name', media: 'picture' },
  },
})
