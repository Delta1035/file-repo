export const DataProgress = (prevState = {
  dataProgress: false
}, action) => {
  let { type } = action
  switch (type) {
    case 'change_dataProgress':
      let newstate = { ...prevState }
      newstate.dataProgress = !newstate.dataProgress
      return newstate

    default:
      return prevState
  }

} 