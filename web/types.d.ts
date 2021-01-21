export type Category = {
  name: string,
  slug: string
}

export type ArticleExcerpt = {
  title: string,
  slug: string,
  imageRef: string
  subsectionName: string?,
  content: any[] | any?
}

export type SubsectionArticles = {
  name: string,
  slug: string,
  articles: ArticleExcerpt[]
}
