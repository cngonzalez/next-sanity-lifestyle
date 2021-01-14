import S from '@sanity/desk-tool/structure-builder'

export default () =>
  S.list()
    .title('Content')
    .items(
      // S.documentTypeListItems()
      [S.listItem()
        .title('Hub')
        .child(
            S.documentList()
              .title("Hubs")
              .filter("_type == 'category'"),
        ),
        S.listItem()
          .title('Subsections')
          .child(
              S.documentList()
                .title("Subsections")
                .filter("_type == 'subsection'"),
          ),
        S.listItem()
          .title('All Articles')
          .child(
              S.documentList()
                .title("Articles")
                .filter("_type == 'article'"),
          ),
        S.listItem()
          .title('Products')
          .child(
              S.documentList()
                .title("Products")
                .filter("_type == 'product'"),
          ),


      ],

      //have subsections be next level
      //have articles
//..documentTypeList.getItems()
    )
