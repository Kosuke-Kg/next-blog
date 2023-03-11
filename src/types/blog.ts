export type Blog = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  title: string
  content: string
  eyecatch: eyecatch
  category: category
}

export type eyecatch = {
  url: string
  height: number
  width: number
}

export type category = {
  createdAt: string
  id: string
  name: string
  publishedAt: string
  revisedAt: string
  updatedAt: string
}
