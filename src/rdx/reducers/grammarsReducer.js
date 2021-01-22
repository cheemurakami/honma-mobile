import * as c from "../actions/types";

export default (state = { completedIds: {}, selectedId: null }, action) => {
  switch (action.type) {
    case c.COMPLETED_GRAMMARS: {
      const currentState = { ...state };
      const currentCompletedIds = { ...state.completedIds };
      return {
        ...currentState,
        completedIds: {
          ...currentCompletedIds,
          [action.grammarId]: new Date(),
        },
      };
    }
    case c.SELECTED_GRAMMAR: {
      const currentState = { ...state };
      return {
        ...currentState,
        selectedId: action.grammarId,
      };
    }
    default:
      return state;
  }
};
