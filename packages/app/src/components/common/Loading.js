import React from 'react'
import styled from 'styled-components'
import { Icon, Flex, Text } from '@ursip/design-system'
import PropTypes from 'prop-types'

function Spinner(props) {
  return <Icon spin fontSize={4} color="primary" name="spinner" {...props} />
}

const Overlay = styled(Flex)`
  position: absolute;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  zindex: 9999999999;
  background-color: rgba(255, 255, 255, 0.5);
`

function Loading({ overlay, children }) {
  if (overlay) {
    return (
      <Overlay justifuContent="center" alignItems="center">
        <Spinner />
        {children && (
          <Text color="primary" bold ml={2} fomtSize={0}>
            {children}
          </Text>
        )}
      </Overlay>
    )
  }

  return <Spinner />
}

Loading.propTypes = {
  overlay: PropTypes.bool,
  icon: PropTypes.any,
}

Loading.defaultProps = {
  overlay: false,
}

export default Loading
