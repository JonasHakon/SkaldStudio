import React from 'react'
import {defineType, defineField, useFormValue} from 'sanity'
import {Text} from '@sanity/ui'
import {WorkTestimonies} from '../components/WorkTestimonies'

// Wrapper component to access document via Sanity hooks
function WorkTestimoniesInput(props: any) {
  // Use Sanity's useFormValue hook to get document data
  const documentId = useFormValue(['_id']) as string | undefined
  const personName = useFormValue(['name']) as string | undefined
  
  if (!documentId) {
    return React.createElement(Text, {muted: true}, 'Save this person first to manage work testimonies.')
  }
  
  return React.createElement(WorkTestimonies, {
    personId: documentId,
    personName: personName || 'this person'
  })
}

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
    defineField({
      name: 'workTestimonies',
      title: 'Work Testimonies',
      type: 'string',
      components: {
        input: WorkTestimoniesInput
      },
    }),
  ],
  preview: {
    select: { title: 'name', media: 'picture' },
  },
})
