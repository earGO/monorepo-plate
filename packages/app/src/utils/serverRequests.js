export const postData = (url = '', data = {}) => {
  // Default options are marked with *
  return fetch(url, {
    method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  }).then(response => response.json()) // parses JSON response into native Javascript objects
}

export const patchComment = (url = '', data = {}) => {
  // Default options are marked with *
  return fetch(url, {
    method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data.payload), // body data type must match "Content-Type" header
  }).then(response => response.json()) // parses JSON response into native Javascript objects
}
