import S from '@sanity/desk-tool/structure-builder'
import client from 'part:@sanity/base/client'

async function categoriesToListItems() {
const query = `*[_type=='category']{
    name, _id,
    'subsections': *[_type=='subsection' && references(^._id)]{name, _id} 
    }`
  const categories = await client.fetch(query)
  return categories.map(cat => (
      S.listItem()
        .title(cat.name)
        .child(
          S.list()
            .title(cat.name)
            .items([
              S.documentListItem()
                .schemaType('category')
                .title(`${cat.name} Category/Hub Options`)
                .id(cat._id)
                .child(
                  S.document()
                    .schemaType('category')
                    .documentId(cat._id)
                    .views([S.view.form()])
              ),
              ...createSubsectionListItems(cat.subsections)
            ]) 
        ) 
    )
  ) 
}

function createSubsectionListItems(subsections) {
  return subsections.map(sub => (
      S.listItem()
        .title(sub.name)
        .child(
          S.documentList()
          .title(sub.name)
          .schemaType("article")
          .filter("subsection._ref == $id")
          .params({id: sub._id})
        ) 
      )
    )
}

async function buildList() {
  return (
    S.list()
    .title('Content')
    .items(await categoriesToListItems())
  )
}
export default buildList;
