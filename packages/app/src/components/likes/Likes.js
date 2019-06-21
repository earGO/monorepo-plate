import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Relative } from '@ursip/design-system'

import { actions as likesActions, selectors as likesSelectors } from '../likes/likes-duck'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Like from './Like'
import Dislike from './Dislike'
import LikesAmnt from './LikesAmnt'

function Likes({ like, unlike, jokeId, postLikes }) {
  const likeCombined = (id, likesArray) => () => {
    like(id, likesArray)
  }
  const dislikeCombined = (id, likesArray) => () => {
    unlike(id, likesArray)
  }
  const likesAmnt = postLikes[jokeId] || 0
  return (
    <Relative>
      <Flex>
        <Like onClick={likeCombined(postLikes, jokeId)} />
        <Dislike onClick={dislikeCombined(postLikes, jokeId)} />
        <LikesAmnt likesAmnt={likesAmnt} />
      </Flex>
    </Relative>
  )
}

Likes.propTypes = {
  postLikes: PropTypes.object,
  jokeId: PropTypes.string,
  like: PropTypes.func,
  unlike: PropTypes.func,
  save: PropTypes.func,
}

Likes.defaultProps = {
  postLikes: {},
  jokeId: '',
}

const withConnect = connect(
  (state, props) => ({
    postLikes: likesSelectors.postLikes(state),
  }),
  {
    like: likesActions.like,
    unlike: likesActions.unlike,
  },
)

export default compose(
  withRouter,
  withConnect,
)(Likes)
