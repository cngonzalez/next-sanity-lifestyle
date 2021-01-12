export default {
  title: "Page",
  name: "page",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
      description: "The title of this page (this will show up in your browser heading and internal links)",
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Published date',
      name: 'publishedDate',
      description: "Date to start showing this article",
      type: 'date',
    },
    {
      title: "Authors",
      name: "authors",
      type: "array",
      of: [
        {type: "reference",
         to: [{type: "person"}]}
      ]
    },
    {
      title: 'Start featuring page on:',
      name: 'featuredArticleDate',
      description: "Date to start featuring this article on (will be replaced by any article that is set to be featured on a date after this one)",
      type: 'date',
    },
    {
      title: 'Category', 
      name: 'category',
      type: 'reference', 
      to: [{type: "category"}]
    },
    {
      title: 'Subsection', 
      name: 'subsection',
      type: 'reference', 
      to: [{type: "subsection"}]
    },
    {
      title: "Hero Image",
      name: "heroImage",
      type: "image",
      description: "The hero image for this page.",
      options: {
        crop: true,
        hotspot: true
      }
    },
    {
      title: 'Content', 
      name: 'content',
      type: 'array', 
      of: [{type: 'block'},
           {type: 'listItem'},
           {type: 'hr'},
           {type: 'productDisplay'}]
    },
  ]
}
