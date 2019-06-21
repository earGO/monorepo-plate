import React from 'react'
import PropTypes from 'prop-types'
import { Relative, Text } from '@ursip/design-system'

function LikesAmnt({ likesAmnt }) {
  return (
    <Relative>
      <Text>Likes: {likesAmnt}</Text>
    </Relative>
  )
}

LikesAmnt.propTypes = {
  likesAmnt: PropTypes.number,
}

LikesAmnt.defaultProps = {
  likesAmnt: 0,
}

export default LikesAmnt
