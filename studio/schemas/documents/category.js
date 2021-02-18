export default {
  title: "Category",
  name: "category",
  type: "document",
  fields: [
    {
      title: "name",
      name: "name",
      type: "string",
      description: "The name of this category",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "slug",
      name: "slug",
      type: "slug",
      description: "The slug for this category; where it is routable on the main site.",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: "icon",
      name: "icon",
      type: "image",
      description: "Choose a small icon to represent this category (shows up on article pages) and internally in the studio"
    },
    {
      title: "Featured Article",
      name: "featuredArticle",
      description: "The featured article for this category",
      type: "reference",
      to: [{type: "article"}],
      // options: {
      //   filter: ({document}) => {
      //     return {
      //       filter: "*[_type == 'article' && references(*[_type == 'subsection' && references($id)]._id)]",
      //       params: {id: document._id}
      //     }
      //   }
      // }
    },
    {
      title: "Featured Article Display",
      name: "featuredArticleDisplay",
      type: "string",
      description: "Determines how the featured article will be displayed on the hub page.",
      options: {
        list: ['Text Below', '50/50 Card', 'Text Overlay'],
      },
    },
  ]
}
