import {StructureBuilder} from 'sanity/desk'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Singleton item
      S.listItem()
        .title('Home')
        .id('home')
        .child(
          S.document()
            .schemaType('home')
            .documentId('home') // <- fixed ID
        ),
      S.divider(),
      // All other document types except 'home'
      ...S.documentTypeListItems().filter((item) => item.getId() !== 'home'),
    ])
