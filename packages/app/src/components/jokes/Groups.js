import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Flex, Button } from '@ursip/design-system'

import * as JokesDuck from './jokes-duck'

function Groups({ groupNames, setGroup, selectedGroup, ...props }) {
  const handleClick = group => () => setGroup(group)

  if (groupNames.length === 1) {
    setGroup(groupNames[0])
  }

  return (
    <Flex {...props}>
      {groupNames.length > 1 && (
        <Button
          key="all"
          size="small"
          type={selectedGroup === null ? 'primary' : 'bordered'}
          onClick={handleClick(null)}
          children="all"
        />
      )}
      {groupNames.map(group => (
        <Button
          key={group}
          size="small"
          type={group === selectedGroup ? 'primary' : 'bordered'}
          ml={groupNames.length === 1 ? 0 : 2}
          onClick={handleClick(group)}
          children={group}
        />
      ))}
    </Flex>
  )
}

Groups.propTypes = {
  groupNames: PropTypes.array,
}

Groups.defaultProps = {
  groupNames: [],
  selectedGroup: null,
}

const withConnect = connect(
  state => ({
    groupNames: JokesDuck.selectors.groupNames(state),
    selectedGroup: JokesDuck.selectors.selectedGroup(state),
  }),
  { setGroup: JokesDuck.actions.setGroup },
)

export default withConnect(Groups)
