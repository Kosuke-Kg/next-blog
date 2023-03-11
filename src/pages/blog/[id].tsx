import cheerio from 'cheerio'
import hljs from 'highlight.js'
import 'highlight.js/styles/hybrid.css'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { Endpoint, Paths } from '@/common/Label'
import { client } from '@/libs/client'
import { Blog } from '@/types/blog'

type Props = {
  blog: Blog
  highlightedBody: string
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await client.get({ endpoint: `${Endpoint.blog}` })
  const paths = data.contents.map((content: Blog) => `${Paths.blog}/${content.id}`)

  return {
    paths,
    // 存在しないIDにアクセスするとエラーになるのを404にする
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const id = context.params?.id
  const blog = await client.get({
    endpoint: `${Endpoint.blog}`,
    contentId: id,
  })

  const $ = cheerio.load(blog.content)
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text())
    $(elm).html(result.value)
    $(elm).addClass('hljs')
  })

  return {
    props: {
      blog,
      highlightedBody: $.html(),
    },
  }
}

const BlogId: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  blog,
  highlightedBody,
}: Props) => {
  return (
    <main>
      <h1>{blog.title}</h1>
      <p>{blog.publishedAt}</p>
      {blog.category && <div>#{blog.category.name}</div>}
      <div
        dangerouslySetInnerHTML={{
          __html: `${highlightedBody}`,
        }}
      />
    </main>
  )
}
export default BlogId
