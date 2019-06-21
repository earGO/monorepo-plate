import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DynamicModuleLoader } from 'redux-dynamic-modules'

import JokesDuck, { selectors as jokesSelectors, actions as jokesActions } from './jokes-duck'
import UserDuck, { selectors as userSelectors } from '../user/user-duck'
import Loading from '../common/Loading'
import List from './List'
import Groups from './Groups'
import SearchInput from '../common/SearchInput'
import CommentsDuck from '../comments/comments-duck'
import LikesDuck from '../likes/likes-duck'

function Jokes() {
  const loading = useSelector(jokesSelectors.loading)
  const searchQuery = useSelector(jokesSelectors.searchQuery)
  const user = useSelector(userSelectors.singleUser)
  const dispatch = useDispatch()
  const handleSearch = value => dispatch(jokesActions.search(value))

  console.log('user in Jokes:', user)

  return (
    <DynamicModuleLoader modules={[JokesDuck, UserDuck, CommentsDuck, LikesDuck]}>
      <SearchInput mb={3} value={searchQuery} onChange={handleSearch} />
      <Groups mb={3} />
      {loading && <Loading overlay>Loading funniest jokes...</Loading>}
      <List user={user} />
    </DynamicModuleLoader>
  )
}

export default Jokes
