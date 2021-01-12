import React from 'react'

// const Test = (test) => {
//   return (<div>List Item</div>)
// }

// function truncateText(text, length) {
//   if (text.length <= length) {
//     return text;
//   }

//   return text.substr(0, length) + '\u2026'
// }

export default {
  title: "List Item",
  name: "listItem",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
      description: "The title of this list item",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Orientation",
      name: "orientation",
      type: "string",
      description: "The orientation of this list item",
      options: {
        list: ["horizontal", "vertical"],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Text",
      name: "text",
      description: "The text of this list item",
      type: 'array', 
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Product Display Size",
      name: "productDisplaySize",
      type: "string",
      description: "Determines whether the items display large or small in the list item.",
      options: {
        list: ["small", "large"],
      },
    },
    {
      title: "Products",
      name: "products",
      description: "The products for this list item",
      type: "array",
      of: [{type: "reference",
            to: [
                  {type: "product"}
                ]
          }]
    }
  ],
  initialValue: {
    orientation: "horizontal",
    productDisplaySize: "small",
  },
  // preview: {
  //   select: {
  //     title: 'text'
  //   },
  //   component: Test,
  //   prepare(selection) {
  //     console.log(selection)
  //     const {text} = selection;
  //     return {
  //       title: truncateText(text, 20),
  //       subtitle: orientation
  //     }
  //   }
  // }
}

