
/* ------------------------------------------------------------------ */
/* Fragments -- partial queries for hubpages, inline references, etc  */
/* ------------------------------------------------------------------ */

export const productQuery = `
   _id,
  'slug': slug.current,
  'image': {"asset": {"_ref": productImage.asset._ref}, "crop": productImage.crop, "hotspot": productImage.hotspot},
  name,
  description,
  price,
  manufacturer
`

export const articleDisplayQuery = `
        _id,
        title,
        text,
        "slug": slug.current,
        "image": {"ref": heroImage.asset._ref, "crop": heroImage.crop, "hotspot": heroImage.hotspot},
        "subsection": subsection->{name, "slug": slug.current},
        "category": subsection->category->{name, "slug": slug.current},
        excerpt,
        publishedDate
`

/* ------------ */
/* Page queries */
/* ------------ */
// const indexQuery
// const pdpQuery
// const hubQuery
// const articlePageQuery

/* ---------------- */
/* Commerce queries */
/* ---------------- */

export const singleProductQuery = (id) => (
  `*[_type == 'product' && _id == '${id}'][0]
  { ${productQuery} }`
)
