export type Category = {
  name: string,
  slug: string
}

export type Article = {
  title: string,
  slug: string,
  imageRef: string
  subsectionName: string?,
  content: any[] | any?
}

export type SubsectionArticles = {
  name: string,
  slug: string,
  articles: Article[]
}

export type ListItem = {
  _key: string,
  _type: string,
  orientation: string,
  text: any[] | any?,
  title: string,
  products: any[] | any?
}
