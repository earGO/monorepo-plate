export const incrementField = (objectToIncrement, value) => {
  console.log('hastables increment field recieved payload:', objectToIncrement)
  const id = objectToIncrement.payload.id
  let workingBody = { ...objectToIncrement.payload.likes }
  if (!workingBody.hasOwnProperty(id)) {
    workingBody[id] = value
    return workingBody
  } else {
    let old = workingBody[id]
    workingBody[id] = old + value
    return workingBody
  }
}

export const makePatch = data => {
  let patch = {}
  const field = data.payload.jokeId,
    user = data.payload.user,
    content = data.payload.content,
    comments = data.payload.comments,
    tempDate = new Date(),
    commentDate = tempDate.toString().slice(0, 15)
  patch[field] = comments.concat({ user: user, date: commentDate, content: content })
  return [patch, field]
}

export const getFirst = dataObject => {
  let first = {},
    globalKey = ''
  for (let key in dataObject) {
    if (dataObject.hasOwnProperty(key)) {
      first = dataObject[key]
      globalKey = key
      break
    }
  }
  return [first, globalKey]
}
