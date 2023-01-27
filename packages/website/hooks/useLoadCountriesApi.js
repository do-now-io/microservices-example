import useLoadGraphQL from 'graphql-react/public/useLoadGraphQL.js'
import { useCallback } from 'react'

export default function useLoadCountriesApi() {
  const loadGraphQL = useLoadGraphQL()

  return useCallback(
    (cacheKey, graphqlOperation) => {
      return loadGraphQL(cacheKey, 'http://gateway-default:4000', {
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
