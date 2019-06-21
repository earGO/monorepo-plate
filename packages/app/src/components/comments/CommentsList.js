import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Text } from '@ursip/design-system'
import Comment from './Comment'

function CommentsList({ comments }) {
  if (comments.length > 0) {
    return (
      <Flex flexDirection="column">
        {comments.map((singlecomment, key) => {
          return <Comment key={key} singlecomment={singlecomment} />
        })}
      </Flex>
    )
  } else {
    return <Text>Waiting for comments...</Text>
  }
}

CommentsList.propTypes = {
  comments: PropTypes.array,
}

CommentsList.defaultProps = {
  comments: [],
}

export default CommentsList
