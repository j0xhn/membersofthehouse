import { omit } from "lodash";
export default (state, action, prefix) => {
  switch (action.type) {
    case `${prefix}.set`:
      return {
        ...action.payload
      };
    case `${prefix}.update`:
      return {
        ...state,
        ...action.payload
      };
    case `${prefix}.delete`:
      // action.payload should be an array via lodash
      return omit(state, action.payload)
    default:
      return state;
  }
};