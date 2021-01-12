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
      description: "The slug for this category (remove with new route obj)",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required(),
    }
  ]
}
