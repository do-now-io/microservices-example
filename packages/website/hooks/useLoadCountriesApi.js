import useLoadGraphQL from 'graphql-react/public/useLoadGraphQL.js'
import { useCallback } from 'react'

export default function useLoadCountriesApi() {
  const loadGraphQL = useLoadGraphQL()

  return useCallback(
    (cacheKey, graphqlOperation) => {
      return loadGraphQL(cacheKey, 'https://api.demo-staging.do-now.io/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(graphqlOperation),
      })
    },
    [loadGraphQL]
  )
}
