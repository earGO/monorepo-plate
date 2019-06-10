import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DynamicModuleLoader } from 'redux-dynamic-modules'

import JokesDuck, { selectors as jokesSelectors, actions as jokesActions } from './jokes-duck'
import Loading from '../common/Loading'
import List from './List'
import Groups from './Groups'
import SearchInput from '../common/SearchInput'

function Jokes({ loading, searchQuery, search }) {
  const handleSearch = value => search(value)

  return (
    <DynamicModuleLoader modules={[JokesDuck]}>
      <SearchInput mb={3} value={searchQuery} onChange={handleSearch} />
      <Groups mb={3} />
      {loading && <Loading overlay>Loading funniest jokes...</Loading>}
      <List />
    </DynamicModuleLoader>
  )
}

Jokes.propTypes = {
  loading: PropTypes.bool,
  searchQuery: PropTypes.string,
}

Jokes.defaultProps = {
  loading: false,
  searchQuery: '',
}

export default connect(
  state => ({
    loading: jokesSelectors.loading(state),
    searchQuery: jokesSelectors.searchQuery(state),
  }),
  {
    search: jokesActions.search,
  },
)(Jokes)
