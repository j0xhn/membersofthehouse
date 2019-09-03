import React, {createContext, useContext, useReducer} from 'react';
import {generateUID} from '../utils'
let uid = localStorage.getItem('hasa_uid')
const lastVoteTimestamp = localStorage.getItem('hasa_lastVoteTimestamp')
if (!uid) {
  uid = generateUID()
  localStorage.setItem('hasa_uid', uid)
}
const initialState = {
  user: { 
    uid,
    lastVoteTimestamp
  }
};
export const StateContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'user.set':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      };
      
    default:
      return state;
  }
};
export default ({children}) =>{
  // const [globalState, dispatch] = useReducer(reducer, initialState) 
  // Object.values(globalState).map
  return <StateContext.Provider value={useReducer(reducer,initialState)}>
    {children}
  </StateContext.Provider>
}
export const useStateValue = () => {
  const state = useContext(StateContext)
  return state
};
export const useGlobalState = useStateValue