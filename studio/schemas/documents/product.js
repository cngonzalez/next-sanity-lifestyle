export default {
  title: "Product",
  name: "product",
  type: "document",
  fields: [
    {
      title: "Product image",
      name: "productImage",
      type: "image",
      description: "The manufacturer photo for this image.",
      options: {
        crop: true,
        hotspot: true
      }
    },
    {
      title: "name",
      name: "name",
      type: "string",
      description: "The name of this product",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "slug",
      name: "slug",
      type: "slug",
      description: "The slug for the dedicated product page",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: "SKU",
      name: "sku",
      type: "string",
      description: "The sku of this product",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Description",
      name: "description",
      type: "string",
      description: "The description for this product",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Price",
      name: "price",
      type: "number",
      description: "The price of this product",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Manufacturer",
      name: "manufacturer",
      type: "string",
      description: "The manufacturer of this product",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Category",
      name: "category",
      description: "Category this product belongs to",
      type: "reference",
      to: [{type: "category"}]
    },
  ]
}
