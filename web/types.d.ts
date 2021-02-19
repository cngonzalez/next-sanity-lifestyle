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
  name: string,
  featuredArticleDisplay: string,
  featuredArticle: Article
}

export type SubsectionArticles = {
  name: string,
  slug: string?,
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
  manufacturer: string,
  relatedArticles: Article[]
}

export type CategoryProducts = {
  name: string,
  products: Product[]
}

export type Campaign = {
  slug: string,
  image: string,
  title: string,
  content: any[] | any?,
  products: Product[]
}
