// sanity.config.ts
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Skald.ie',

  projectId: 'hl1mnev8',
  dataset: 'production',

  plugins: [
    structureTool({
      // Put "Home" as a singleton entry, then list all other types
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Home')
              .id('home')
              .child(S.document().schemaType('home').documentId('home')),
            S.divider(),
            ...S.documentTypeListItems().filter((item) => item.getId() !== 'home'),
          ]),
    }),
    visionTool(),
  ],

  // Prevent creating, duplicating, or deleting the singleton
  document: {
    // Hide “New document” option for `home`
    newDocumentOptions: (prev, {creationContext}) =>
      creationContext.type === 'global'
        ? prev.filter((t) => t.templateId !== 'home')
        : prev,

    // Hide Delete/Duplicate actions for `home`
    actions: (prev, {schemaType}) =>
      schemaType === 'home'
        ? prev.filter((action) => action.action !== 'delete' && action.action !== 'duplicate')
        : prev,
  },

  schema: {
    types: schemaTypes,
  },
})
