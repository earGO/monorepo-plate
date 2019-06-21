import React from 'react'
import PropTypes from 'prop-types'
import { Flex } from '@ursip/design-system'
import noop from '../../utils/noop'

import Item from '../common/Item'
import Likes from '../likes/Likes'
import Comments from '../comments/Comments'

function NorrisList({ joke, user, ...props }) {
  return (
    <Flex flexDirection="column" {...props}>
      <Item key={joke.id} mb={3} header={joke.value} onClick={noop}>
        <Likes jokeId={joke.id} />
        <Comments jokeId={joke.id} user={user} />
      </Item>
    </Flex>
  )
}

NorrisList.propTypes = {
  jokes: PropTypes.object,
}

NorrisList.defaultProps = {
  joke: {},
}

export default NorrisList
