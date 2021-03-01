export default {
  title: "Product",
  name: "product",
  type: "document",
  fields: [
    {
      title: "Name",
      name: "name",
      type: "string",
      description: "The name of this product",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Big Commerce Entity ID",
      name: "entityId",
      type: "number",
      description: "The unique ID of this product in BC (used to ensure that our representation in Sanity is up-to-date with changes in BC)",
    },
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
      type: 'array',
      of: [{type: 'block'}],
      description: "The description for this product",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Price",
      name: "price",
      type: "number",
      description: "The price of this product (note, this is the first price in USD that we could find in BigCommerce -- there may be other prices available!)",
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
      description: "Category this product belongs to (used for editorial embeds, etc.)",
      type: "reference",
      to: [{type: "category"}]
    }
  ]
}
