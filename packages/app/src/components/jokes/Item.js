import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Card, Flex, Box, Text, Icon } from '@ursip/design-system'

import noop from '../../utils/noop'

const StyledCard = styled(Card)`
  opacity: ${props => (props.seen ? 0.4 : 1)};
  :hover {
    opacity: 1;
  }
`

const BouncingText = styled(Text)`
  animation-name: bounceIn;
  animation-duration: 450ms;
  animation-timing-function: linear;
  animation-fill-mode: forwards;

  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale(0.3) translate3d(0, 0, 0);
    }
    50% {
      opacity: 0.9;
      transform: scale(1.1);
    }
    80% {
      opacity: 1;
      transform: scale(0.89);
    }
    100% {
      opacity: 1;
      transform: scale(1) translate3d(0, 0, 0);
    }
  }
`

function Item({ header, content, contentPostfix, onClick, ...props }) {
  const [visible, setVisible] = React.useState(false)
  const toggleVisibility = () => {
    setVisible(!visible)
    onClick && typeof onClick === 'function' && onClick(visible)
  }

  return (
    <StyledCard p={4} {...props} onClick={toggleVisibility} style={{ cursor: 'pointer' }}>
      <Flex>
        <Icon name={visible ? 'chevron-up' : 'chevron-down'} top={2} color="primary" mr={3} fontSize={3} />
        <Box>
          <Text color="primary" fontSize={3} mb={visible ? 4 : 0}>
            {header}
          </Text>
          {visible && <BouncingText fontSize={5}>{content + contentPostfix}</BouncingText>}
        </Box>
      </Flex>
    </StyledCard>
  )
}

Item.propTypes = {
  contentPostfix: PropTypes.string,
  header: PropTypes.string,
  content: PropTypes.string,
  seen: PropTypes.bool,
  onClick: PropTypes.func,
}

Item.defaultProps = {
  contentPostfix: '))))))))',
  header: 'Setup',
  content: 'Punchline',
  seen: false,
  onClick: noop,
}

export default Item
