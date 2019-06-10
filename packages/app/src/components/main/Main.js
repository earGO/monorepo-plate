import React from 'react'
import Link from '../common/Link'
import { Card, Flex, Text } from '@ursip/design-system'
import * as jokesModule from '../jokes/jokes-duck'

const modules = [
  {
    name: jokesModule.name,
    route: jokesModule.baseRoute,
  },
]

function Main() {
  return (
    <Flex>
      {modules.map(module => (
        <Card key={module.name} p={3}>
          <Text align="center" fontSize={5}>
            <span role="img" aria-label="jsx-a11y/accessible-emoji">
              😬
            </span>
          </Text>
          <Text align="center" fontSize={3}>
            <Link bordered to={module.route}>
              {module.name}
            </Link>
          </Text>
        </Card>
      ))}
    </Flex>
  )
}

export default Main
