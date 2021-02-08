//grouped items might be list items, product displays, etc. 
//abstract back out for all items
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

//implicit assumption here that any "featured" article will have about a sentence of
//"unspecial" text up front
export function excerptBlockText(block, excerptLength) {
  const snippet = block.children[0].text.split(" ").slice(0, excerptLength).join(" ") 
  return `${snippet}...`
}
