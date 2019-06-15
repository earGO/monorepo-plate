import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Flex } from '@ursip/design-system'

import Item from './Item'

import * as JokesDuck from './jokes-duck'

function List(props) {
  const jokes = useSelector(JokesDuck.selectors.getData)
  const seen = useSelector(JokesDuck.selectors.seenJokes)
  const dispatch = useDispatch()

  const setSeen = id => () => dispatch(JokesDuck.actions.setSeen(id))

  return (
    <Flex flexDirection="column" {...props}>
      {jokes.map(joke => (
        <Item
          key={joke.id}
          mb={3}
          header={`#${joke.id} ${joke.setup}`}
          content={joke.punchline}
          seen={seen.includes(joke.id)}
          onClick={setSeen(joke.id)}
        />
      ))}
    </Flex>
  )
}

export default List
