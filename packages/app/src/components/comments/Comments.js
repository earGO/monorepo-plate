import React from 'react'
import PropTypes from 'prop-types'

import { Text, Relative, Flex } from '@ursip/design-system'
import { connect } from 'react-redux'
import { actions as commentsActions, selectors as commentsSelectors } from './comments-duck'
import { compose } from 'redux'
import CommentsList from './CommentsList'
import selectorOnId from '../../utils/selectorOnId'
import noop from '../../utils/noop'
import AddComment from './AddComment'
import styled from 'styled-components'

const HoverText = styled(Text)`
  :hover {
    background-color: blue;
  }
`

const RedHoverText = styled(Text)`
  :hover {
    background-color: red;
  }
`

function Comments({
  openedComments,
  addComments,
  addComment,
  user,
  postComments,
  setAddOpen,
  setAddClose,
  setOpen,
  setClose,
  jokeId,
  ...props
}) {
  const handleShowComments = () => {
    selectorOnId(jokeId, openedComments, setOpen, setClose)
  }
  const handleAddComment = () => {
    selectorOnId(jokeId, addComments, setAddOpen, setAddClose)
  }
  return (
    <Relative>
      <Flex flexDirection={'row'}>
        <HoverText onClick={handleAddComment} style={{ cursor: 'pointer' }} p={1} id={'addCommentButton'}>
          Add Comment
        </HoverText>
        {addComments.includes(jokeId) && (
          <Relative>
            <AddComment
              jokeId={jokeId}
              user={user}
              addComment={addComment}
              comments={postComments[jokeId] || []}
            />
          </Relative>
        )}
      </Flex>
      {postComments[jokeId] ? (
        <Flex flexDirection={'column'}>
          <RedHoverText onClick={handleShowComments} style={{ cursor: 'pointer' }} p={1}>
            {openedComments.includes(jokeId) ? <Text>Close Comments</Text> : <Text>Show Comments</Text>}
          </RedHoverText>
          {openedComments.includes(jokeId) && (
            <Relative>
              <CommentsList comments={postComments[jokeId]} />
            </Relative>
          )}
        </Flex>
      ) : (
        <Flex></Flex>
      )}
    </Relative>
  )
}

Comments.propTypes = {
  openComments: PropTypes.bool,
  postComments: PropTypes.object,
  openedComments: PropTypes.array,
  addComments: PropTypes.array,
  setAddOpen: PropTypes.func,
  setAddClose: PropTypes.func,
  setOpen: PropTypes.func,
  setClose: PropTypes.func,
  jokeId: PropTypes.string,
  addComment: PropTypes.func,
  user: PropTypes.object,
}

Comments.defaultProps = {
  openComments: false,
  postComments: {},
  openedComments: [],
  addComments: [],
  setAddOpen: noop,
  setAddClose: noop,
  setOpen: noop,
  setClose: noop,
  jokeId: 'no id from parrent',
  addComment: noop,
  user: {
    id: 'no user from parent',
    name: 'Check your',
    lastname: 'Parrent props',
  },
}

const withConnect = connect(
  state => ({
    postComments: commentsSelectors.postComments(state),
    openedComments: commentsSelectors.openedComments(state),
    addComments: commentsSelectors.addComments(state),
  }),
  {
    setOpen: commentsActions.setOpen,
    setClose: commentsActions.setClose,
    setAddOpen: commentsActions.setAddOpen,
    setAddClose: commentsActions.setAddClose,
    addComment: commentsActions.addComment,
  },
)

export default compose(
  // withRouter,
  withConnect,
)(Comments)
