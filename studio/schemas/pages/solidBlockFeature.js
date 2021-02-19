import React from 'react'

export default {
  title: "Solid Block Feature",
  name: "solidBlockFeature",
  type: "object",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
      description: "The title of this block",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Text",
      name: "text",
      description: "The text of this block",
      type: 'array', 
      of: [{type: 'block'}],
    },
    {
      title: "Image",
      name: "image",
      type: "image",
      description: "The image to be used for this block",
      options: {
        crop: true,
        hotspot: true
      }
    },
    //eventually: use similar to choose left or right
    //TODO: reference to article, product, or campaign
    // {
    //   title: "Orientation",
    //   name: "orientation",
    //   type: "string",
    //   description: "The orientation of this list item",
    //   options: {
    //     list: ["horizontal", "vertical"],
    //   },
    //   validation: (Rule) => Rule.required(),
    // },
  ]
}

