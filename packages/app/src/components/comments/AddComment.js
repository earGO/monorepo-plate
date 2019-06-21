import React from 'react'
import PropTypes from 'prop-types'
import noop from '../../utils/noop'

function AddComment({ user, jokeId, addComment, comments, ...props }) {
  const [content, setValue] = React.useState('')

  const onChange = event => setValue(event.target.value)

  const onSubmit = event => {
    event.preventDefault()
    addComment(user, content, comments, jokeId)
  }
  return (
    <form onSubmit={onSubmit} id={'AddComment'}>
      <input type="text" value={content} onChange={onChange} name="commentText" />
      <input type="submit" value="Submit" />
    </form>
  )
}

AddComment.propTypes = {
  user: PropTypes.object,
  jokeId: PropTypes.string,
  addComment: PropTypes.func,
  comments: PropTypes.array,
}

AddComment.defaultProps = {
  user: { name: 'john', lastname: 'doe' },
  jokeId: 'not recieving ID from parent',
  addComment: noop,
  comments: [],
}

export default AddComment
