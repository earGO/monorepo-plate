import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Card, Flex, Box, Text, Icon, Relative } from '@ursip/design-system'

import noop from '../../utils/noop'

const StyledCard = styled(Card)`
  opacity: ${props => (props.transparent ? 0.4 : 1)};
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

function Item({ header, contentPostfix, onClick, opened, children, punchline, ...props }) {
  return (
    <StyledCard p={4} {...props}>
      <Flex>
        <Icon name={opened ? 'chevron-up' : 'chevron-down'} top={2} color="primary" mr={3} fontSize={3} />
        <Box>
          <Text color="primary" fontSize={3} mb={opened ? 4 : 0} onClick={onClick} style={{ cursor: 'pointer' }}>
            {header}
          </Text>
          {opened && <BouncingText fontSize={5}>{punchline + contentPostfix}</BouncingText>}
        </Box>
      </Flex>
      {/*All outside packages invoked here through children-props*/}
      <Relative p={1} top={'1em'} width={'30%'}>
        <Flex justifyContent={'flex-start'} flexDirection={'column'}>
          {children}
        </Flex>
      </Relative>
    </StyledCard>
  )
}

Item.propTypes = {
  contentPostfix: PropTypes.string,
  header: PropTypes.string,
  punchline: PropTypes.string,
  onClick: PropTypes.func,
  transparent: PropTypes.bool,
  opened: PropTypes.bool,
  jokeId: PropTypes.string,
}

Item.defaultProps = {
  contentPostfix: '))))))))',
  header: 'Setup',
  punchline: 'Punchline',
  transparent: false,
  onClick: noop,
  opened: false,
  openedComments: false,
  addComment: false,
}

export default Item
