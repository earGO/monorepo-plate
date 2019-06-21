import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Relative } from '@ursip/design-system'

import { useSelector, useDispatch } from 'react-redux'
import { actions as likesActions, selectors as likesSelectors } from '../likes/likes-duck'
import Like from './Like'
import Dislike from './Dislike'
import LikesAmnt from './LikesAmnt'
import noop from '../../utils/noop'

export const LikesDisconnected = ({ jokeId, postLikes, like, unlike }) => {
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

function Likes({ jokeId }) {
  const postLikes = useSelector(likesSelectors.postLikes)

  const dispatch = useDispatch()
  const like = (likes, id) => dispatch(likesActions.like(likes, id))
  const unlike = (likes, id) => dispatch(likesActions.unlike(likes, id))

  // const likeCombined = (id, likesArray) => () => {
  //   like(id, likesArray)
  // }
  // const dislikeCombined = (id, likesArray) => () => {
  //   unlike(id, likesArray)
  // }
  // const likesAmnt = postLikes[jokeId] || 0
  return <LikesDisconnected jokeId={jokeId} postLikes={postLikes} like={like} unlike={unlike} />
}

Likes.propTypes = {
  postLikes: PropTypes.object,
  jokeId: PropTypes.string,
  like: PropTypes.func,
  unlike: PropTypes.func,
}

Likes.defaultProps = {
  postLikes: {},
  jokeId: 'no_id_from_parent',
  like: noop,
  unlike: noop,
}

export default Likes
