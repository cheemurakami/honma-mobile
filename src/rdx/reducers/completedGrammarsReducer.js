import * as c from "../actions/types"

export default (state = {}, action) => {
  switch (action.type){
    case c.COMPLETED_GRAMMARS: {
      const currentState = {...state}
      return {
        ...currentState,
        completedGrammarId: action.id, 
        completedAt: new Date(),
      }
    }
    default:
      return state;
    }
}