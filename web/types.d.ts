export type Category = {
  name: string,
  slug: string
}

export type Subsection = {
  name: string,
  slug: string
}

export type Author = {
  imageRef: string,
  bio: string
}

export type Article = {
  _id: string?,
  title: string,
  slug: string,
  imageRef: string
  subsection: Subsection,
  category: Category,
  content: any[] | any?
}

export type ArticleData = {
  data: Article
}

export type CategoryFeature = {
  categoryId: string,
  featuredArticle: Article
}

export type SubsectionArticles = {
  name: string,
  slug: string,
  articles: Article[]
}

export type ListItem= {
  _key: string,
  _type: string,
  orientation: string,
  text: any[] | any?,
  title: string,
  products: Product[]
}

export type Product = {
  image: string,
  name: string,
  slug: string,
  description: string,
  price: string,
  manufacturer: string
}

export type CategoryProducts = {
  name: string,
  products: Product[]
}
