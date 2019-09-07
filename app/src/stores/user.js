import defaultReducer from './default'
import {generateUID} from '../utils'
let uid = localStorage.getItem('hasa_uid')
const lastVoteTimestamp = localStorage.getItem('hasa_lastVoteTimestamp')
if (!uid) {
  uid = generateUID()
  localStorage.setItem('hasa_uid', uid)
}
export const userInitialState = {
  user: { 
    uid,
    lastVoteTimestamp
  }
};
export default (state = userInitialState, action) => {
  console.log('ur: action', action)
  switch (action.type) {
    case 'some_custom_action':
      return {
        ...state,
        // some change
      };
      
    default:
      // last string will be used as global idendifier
      // includes user.set, user.update, and user.delete
      return defaultReducer(state, action, 'user');
  }
};