function selectorOnId(id, arrayOfIds, func1, func2) {
  return arrayOfIds.includes(id) ? func2(id) : func1(id)
}

export default selectorOnId
