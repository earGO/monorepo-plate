import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Flex } from '@ursip/design-system'

import Item from './Item'

import { selectors as jokesSelectors, actions as jokesActions } from './jokes-duck'

function List({ jokes, seen, setSeen, ...props }) {
  return (
    <Flex flexDirection="column" {...props}>
      {jokes.map(joke => (
        <Item
          key={joke.id}
          mb={3}
          header={'#' + joke.id + ' ' + joke.setup}
          content={joke.punchline}
          seen={seen.includes(joke.id)}
          onClick={() => setSeen(joke.id)}
        />
      ))}
    </Flex>
  )
}

List.propTypes = {
  jokes: PropTypes.array,
  seen: PropTypes.array,
}

List.defaultProps = {
  jokes: [],
  seen: [],
}

const withConnect = connect(
  (state, props) => ({
    jokes: jokesSelectors.getData(state, props),
    seen: jokesSelectors.seenJokes(state),
  }),
  {
    setSeen: jokesActions.setSeen,
  },
)

export default compose(
  withRouter,
  withConnect,
)(List)
