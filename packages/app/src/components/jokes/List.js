import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { Flex } from '@ursip/design-system'
import selectorOnId from '../../utils/selectorOnId'
import Item from '../common/Item'
import noop from '../../utils/noop'
import Likes from '../likes/Likes'
import Comments from '../comments/Comments'

import * as JokesDuck from './jokes-duck'
import { actions as jokesActions } from './jokes-duck'

function List(props) {
  const jokes = useSelector(JokesDuck.selectors.getData)
  const seen = useSelector(JokesDuck.selectors.seenJokes)
  const opened = useSelector(JokesDuck.selectors.openedJokes)

  const dispatch = useDispatch()
  const setOpen = value => dispatch(jokesActions.setOpen(value))
  const setClose = value => dispatch(jokesActions.setClose(value))

  const setSeen = id => () => dispatch(JokesDuck.actions.setSeen(id))
  const selector = (id, opened, setOpen, setClose) => () => {
    setSeen(id)
    selectorOnId(id, opened, setOpen, setClose)
  }

  return (
    <Flex flexDirection="column" {...props}>
      {jokes.map(joke => (
        <Item
          key={joke.id}
          mb={3}
          header={'#' + joke.id + ' ' + joke.setup}
          transparent={seen.includes(joke.id)}
          opened={opened.includes(joke.id)}
          onClick={selector(joke.id, opened, setOpen, setClose)}
          punchline={joke.punchline}
        >
          <Likes jokeId={joke.id.toString()} />
          <Comments jokeId={joke.id.toString()} user={props.user} />
        </Item>
      ))}
    </Flex>
  )
}

List.propTypes = {
  jokes: PropTypes.array,
  seen: PropTypes.array,
  opened: PropTypes.array,
  setSeen: PropTypes.func,
  setOpen: PropTypes.func,
  setClose: PropTypes.func,
}

List.defaultProps = {
  jokes: [],
  seen: [],
  opened: [],
  setSeen: noop,
  setOpen: noop,
  setClose: noop,
}

export default List
