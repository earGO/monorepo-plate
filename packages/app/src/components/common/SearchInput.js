import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Input, Icon, Box } from '@ursip/design-system'

const ClearButton = styled(Icon)`
  cursor: pointer;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`
const SearchIcon = styled(Icon)`
  opacity: 0.7;
`

function SearchInput({ onChange, value, placeholder, ...props }) {
  const handleSearch = value => onChange(value)
  const handleClear = () => onChange('')

  const prefix = <SearchIcon name="search" />
  const suffix = <ClearButton name="times" fontSize={0} onClick={handleClear} />

  return (
    <Box {...props}>
      <Input
        placeholder={placeholder}
        value={value}
        prefix={prefix}
        suffix={Boolean(value) ? suffix : null}
        onChange={handleSearch}
      />
    </Box>
  )
}

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
}

SearchInput.defaultProps = {
  placeholder: 'Search',
  value: '',
  onChange: () => {},
}

export default SearchInput
