import * as c from "../actions/types"

export default (state = {}, action) => {
  switch (action.type){
    case c.COMPLETED_GRAMMARS: {
      const currentState = {...state}
      return {
        ...currentState,
        [action.id]: new Date(),
      }
    }
    default:
      return state;
    }
}