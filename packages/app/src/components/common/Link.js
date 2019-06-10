import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'

const StyledLink = styled(RouterLink)`
  transition: all 0.1s;
  text-decoration: none;
  color: ${props => props.theme.colors.primary};
  border-bottom: 1px solid ${props => (props.bordered ? props.theme.colors.primary : 'transparent')};

  :hover {
    color: ${props => props.theme.colors.darkBlue};
    border-bottom-color: transparent;
  }
`

function Link({ bordered, ...props }) {
  return <StyledLink {...props} />
}

Link.propTypes = {
  to: PropTypes.string,
  bordered: PropTypes.bool,
}

Link.defaultProps = {
  to: '',
  bordered: false,
}

export default Link
