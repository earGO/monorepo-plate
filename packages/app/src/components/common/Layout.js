import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { Flex, Box, Text } from '@ursip/design-system'
import { withRouter } from 'react-router-dom'

import Logo from './Logo'
import pkg from '../../../package.json'

/**
 * Main application layout
 */
function Layout({ children, width, maxWidth, history, ...props }) {
  const handleLogoClick = () => history.push('/')
  const year = new Date().getFullYear()

  return (
    <Flex height="100vh" flexDirection="column" alignItems="stretch" {...props}>
      <Box bg="lightGrey">
        <Flex mx="auto" alignItems="center" width={width} height={63} style={{ maxWidth }}>
          <Box>
            <Logo style={{ cursor: 'pointer' }} onClick={handleLogoClick} />
          </Box>
          <Box ml={3}>
            <Text bold fontSize={2}>
              {pkg.name}
            </Text>
            <Text fontSize={0}>{pkg.description}</Text>
          </Box>
          <Box ml={3} />
        </Flex>
      </Box>
      <Box flex={1}>
        <Scrollbars style={{ height: '100%' }}>
          <Box mx="auto" py={3} width={width} height="100%" style={{ maxWidth, position: 'relative' }}>
            {children}
          </Box>
        </Scrollbars>
      </Box>
      <Box bg="lightGrey">
        <Box mx="auto" py={2} width={width} style={{ maxWidth }} justifyContent="space-between">
          <Text color="darkGrey" fontSize={0} align="right">
            URSiP &copy; {year}
            <Text bold color="darkGrey">
              ver: {pkg.version}
            </Text>
          </Text>
        </Box>
      </Box>
    </Flex>
  )
}

Layout.defaultProps = {
  maxWidth: 1400,
  // Responsive breackpoints
  width: ['90%', '90%', '98%', '90%'],
}

export default withRouter(Layout)
