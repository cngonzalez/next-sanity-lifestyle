import { 
  TextOverlayFeature,
  TextUnderFeature,
  SolidBlockFeature,
  ProductCardFeature,
} from '../components'

//grouped items might be list items, product displays, etc. 
export function handleGroupedItems(content, key, additionalFilter) {
  let finalBlocks = []
  let verticalGroup = {_key: null, _type: `${key}Group`, children: []}
  let startingItem = null

  content.forEach((block, i) => {
    if (block._type == key && block[additionalFilter._key] == additionalFilter._value) {
      if (!startingItem) {
        startingItem = i
        verticalGroup._key = `groupedItemContainer-${i}`
      }
      verticalGroup.children.push(block)
    } else {
      //verticals have ended, end the block
      if (startingItem) {
        //TODO: test if you really need the deep copy
        finalBlocks.push(JSON.parse(JSON.stringify(verticalGroup)))
        verticalGroup = {_key: null, _type: `${key}Group`, children: []}
        startingItem = null
      }
      finalBlocks.push(block)
    }
  })

  if (verticalGroup._key) {
    finalBlocks.push(JSON.parse(JSON.stringify(verticalGroup)))
  }

  return finalBlocks
}

export function handleBlockFeature(featureType, props, fullSize) {
  let featureDisplay;

  switch(featureType) {
    case 'textBelowFeature':
      featureDisplay = <TextUnderFeature {...props} />
      break;
    case 'textOverlayFeature':
      featureDisplay = <TextOverlayFeature fullSize={fullSize} {...props} />
      break;
    case 'solidBlockFeature':
      featureDisplay = <SolidBlockFeature {...props} />
      break;
    case 'productCardFeature':
      featureDisplay = <ProductCardFeature {...props} />
      break;
    default: 
      featureDisplay = <TextUnderFeature {...props} />
  }

  return featureDisplay

}


export function handleLocaleField(fieldName, obj, locale) {
  if (!locale || locale == 'en-US') {
    return obj[fieldName]
  } else {
    return obj[`locale_${locale}_${fieldName}`]
  }
}
