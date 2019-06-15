import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DynamicModuleLoader } from 'redux-dynamic-modules'

import JokesDuck, { selectors as jokesSelectors, actions as jokesActions } from './jokes-duck'
import Loading from '../common/Loading'
import List from './List'
import Groups from './Groups'
import SearchInput from '../common/SearchInput'

function Jokes() {
  const loading = useSelector(jokesSelectors.loading)
  const searchQuery = useSelector(jokesSelectors.searchQuery)

  const dispatch = useDispatch()
  const handleSearch = value => dispatch(jokesActions.search(value))

  return (
    <DynamicModuleLoader modules={[JokesDuck]}>
      <SearchInput mb={3} value={searchQuery} onChange={handleSearch} />
      <Groups mb={3} />
      {loading && <Loading overlay>Loading funniest jokes...</Loading>}
      <List />
    </DynamicModuleLoader>
  )
}

export default Jokes
