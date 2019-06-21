import fetch from 'node-fetch'

async function fetchApi(api = '') {
  try {
    const response = await fetch(api)
    const json = await response.json()
    return json
  } catch (e) {
    return e
  }
}

module.exports = {
  fetchApi,
}
