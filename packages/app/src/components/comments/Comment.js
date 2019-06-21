import React from 'react'
import PropTypes from 'prop-types'
import { Text, Relative } from '@ursip/design-system'
/*other import goes here*/

function Comment({ singlecomment }) {
  const { user, content, date } = singlecomment
  /*some private methods*/

  return (
    /*component return JSX code goes here*/
    user && content && date ? (
      <Relative>
        <Text fontSize={3} bold id={'user'}>
          {user.name} {user.lastname}
        </Text>
        <Text id={'content'}>{`${content}`}</Text>
        <Text fontSize={3} bold id={'date'}>
          {date}
        </Text>
      </Relative>
    ) : (
      <Relative>
        <Text>Recieved empty props, check API</Text>
      </Relative>
    )
  )
}

Comment.propTypes = {
  singlecomment: PropTypes.object,
}

Comment.defaultProps = {
  singlecomment: {
    user: {
      id: 'ooops',
      name: 'something',
      lastname: 'wrong',
    },
    date: 'check your code',
    content: 'Not got data from API',
  },
}

export default Comment
