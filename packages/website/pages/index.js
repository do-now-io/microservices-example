import useAutoLoad from 'graphql-react/public/useAutoLoad.js'
import useCacheEntry from 'graphql-react/public/useCacheEntry.js'
import useWaterfallLoad from 'graphql-react/public/useWaterfallLoad.js'
import Head from 'next/head'
import Link from 'next/link'
import { useCallback } from 'react'
import PageCache from '../components/PageCache'
import useLoadCountriesApi from '../hooks/useLoadCountriesApi'

const cacheKey = 'IndexPage'
const query = /* GraphQL */ `
  {
      books {
        title
        author
      }
}

`

export default function IndexPage() {
  const cacheValue = useCacheEntry(cacheKey)
  const loadCountriesApi = useLoadCountriesApi()
  const load = useCallback(
    () =>
      loadCountriesApi(cacheKey, {
        query,
      }),
    [loadCountriesApi]
  )

  useAutoLoad(cacheKey, load)

  const isWaterfallLoading = useWaterfallLoad(cacheKey, load)

  return isWaterfallLoading ? null : (
    <>
      <Head>
        <title>Countries</title>
        <meta name="description" content="Countries of the world." />
      </Head>
      <PageCache
        cacheValue={cacheValue}
        renderData={(data) => (
          <article>
            <h1>Books</h1>
            <ul>
              {data.books.map(({ title, author }) => (
                <li>
                    <a>{title} by {author}</a>
                </li>
              ))}
            </ul>
          </article>
        )}
      />
    </>
  )
}
