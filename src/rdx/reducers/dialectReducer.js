import * as c from "../actions/types"

export default (state = {}, action) => {
  switch (action.type){
    case c.LOADED_DIALECTS: {
      return {dialects: action.dialects}
    }
    default:
      return state;
  }
}