import S from '@sanity/desk-tool/structure-builder'
import client from 'part:@sanity/base/client'
import { MdEdit, MdRemoveRedEye } from "react-icons/md"
import { articlePreview, categoryPreview, productPreview } from './preview'

async function categoriesToListItems() {
  const query = `*[_type=='category']{
      name, _id, slug,
      'subsections': *[_type=='subsection'&& references(^._id) ]{name, _id, slug} 
    }`
  const categories = await client.fetch(query)

  return categories.map(cat => (
      S.listItem()
        .title(cat.name)
        .id(cat._id)
        .child(
          S.list()
            .initialValueTemplates([
              S.initialValueTemplateItem('subsection-with-category', {categoryId: cat._id})
            ])
            .title(cat.name)
            .id(cat._id)
            .items([
              S.documentListItem()
                .schemaType('category')
                .title(`${cat.name} Hub Options`)
                .id(cat._id)
                .child(
                  S.document()
                    .schemaType('category')
                    .documentId(cat._id)
                    .views([
                      S.view.form(), 
                      S.view.component(categoryPreview)
                        .title('Web Preview')
                        .icon(MdRemoveRedEye)
                    ])
              ),
              ...createSubsectionListItems(cat.slug.current, cat.subsections)
            ]) 
        ) 
    )
  ) 
}

function createSubsectionListItems(categorySlug, subsections) {
  return subsections.map(sub => (
      S.listItem()
        .title(sub.name)
        .child(
          S.documentTypeList('article')
            .title(sub.name)
            .filter("subsection._ref == $id")
            .params({id: sub._id})
            .initialValueTemplates([
              S.initialValueTemplateItem('article-with-subsection', {subsectionId: sub._id})
            ])
            .child(id => 
              S.document()
                .schemaType('article')
                .documentId(id)
                .views([
                  S.view.form(),
                  S.view.component(document => 
                      articlePreview(document, categorySlug, sub.slug.current)
                    )
                    .title('Web Preview')
                    .icon(MdRemoveRedEye)
                ])
            )
          ) 
      )
    )
}

async function buildList() {
  return (
    S.list()
      .title('Content')
      .items([...await categoriesToListItems(),
             S.divider(), 
             S.documentTypeListItem('person'),
             S.divider(), 
             S.listItem()
                .title("Shop")
                .child(
                  S.documentTypeList('product')
                    .child(id => 
                      S.document()
                        .schemaType('product')
                        .documentId(id)
                        .views([
                          S.view.form(),
                          S.view.component(productPreview)
                            .title('Web Preview')
                            .icon(MdRemoveRedEye)
                        ])
                    )
                )
           ])
  )
}

export default buildList;
