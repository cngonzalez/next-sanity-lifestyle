export default {
  title: "Article Display",
  name: "articleDisplay",
  type: "document",
  fields: [
    {
      title: "Article",
      name: "article",
      type: "reference",
      to: [
        {
          type: "page"
        }
      ]
    },
    {
      title: "Size",
      name: "size",
      type: "string",
      list: ["large", "small"]
    },
    {
      title: "Article fields to include",
      name: "articleFields",
      type: "array",
      of: [{type: "string"}],
      list: ["author", "excerpt"]
    }
  ],
}
