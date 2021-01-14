import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import article from './documents/article'
import person from './documents/person'
import category from './documents/category'
import subsection from './documents/subsection'
import product from './documents/product'

import listItem from './pages/page-components/listItem'
import hr from './pages/page-components/hr'
import productDisplay from './pages/page-components/productDisplay'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes
    .concat([
      article,
      person,
      category,
      subsection,
      product,
      productDisplay,
      listItem,
      hr,
    ])
})
