import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Flex, Button } from '@ursip/design-system'

import * as JokesDuck from './jokes-duck'

function Groups(props) {
  const dispatch = useDispatch()
  const groups = useSelector(JokesDuck.selectors.groupNames)
  const selectedGroup = useSelector(JokesDuck.selectors.selectedGroup)

  const setGroup = group => dispatch(JokesDuck.actions.setGroup(group))
  const handleClick = group => () => setGroup(group)

  if (groups.length === 1) {
    setGroup(groups[0])
  }

  return (
    <Flex {...props}>
      {groups.length > 1 && (
        <Button
          key="all"
          size="small"
          type={selectedGroup === null ? 'primary' : 'bordered'}
          onClick={handleClick(null)}
          children="all"
        />
      )}
      {groups.map(group => (
        <Button
          key={group}
          size="small"
          type={group === selectedGroup ? 'primary' : 'bordered'}
          ml={groups.length === 1 ? 0 : 2}
          onClick={handleClick(group)}
          children={group}
        />
      ))}
    </Flex>
  )
}

export default Groups
