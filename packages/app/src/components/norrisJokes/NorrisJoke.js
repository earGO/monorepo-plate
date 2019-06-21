import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DynamicModuleLoader } from 'redux-dynamic-modules'

import NorrisDuck, { selectors as jokesSelectors, selectors as norrisSelectors } from './norris-duck'
import LikesDuck from '../likes/likes-duck'
import UserDuck, { selectors as userSelectors } from '../user/user-duck'
import CommentsDuck from '../comments/comments-duck'

import Loading from '../common/Loading'
import NorrisList from './NorrisList'

function NorrisJoke({ loading, user, jokes }) {
  console.log('user in ChuckNorris', user)
  return (
    <DynamicModuleLoader modules={[NorrisDuck, UserDuck, CommentsDuck, LikesDuck]}>
      {loading ? (
        <Loading overlay>Loading Chuck Norris joke...</Loading>
      ) : (
        <NorrisList user={user} joke={jokes[0]} />
      )}
    </DynamicModuleLoader>
  )
}

NorrisJoke.propTypes = {
  loading: PropTypes.bool,
  loadingUser: PropTypes.bool,
}

NorrisJoke.defaultProps = {
  loading: false,
  loadingUser: false,
}

export default connect((state, props) => ({
  jokes: jokesSelectors.singleJoke(state, props),
  loading: norrisSelectors.loading(state),
  user: userSelectors.singleUser(state),
}))(NorrisJoke)
