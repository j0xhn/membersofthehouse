import React, {createContext, useContext, useReducer} from 'react';
import userReducer, {userInitialState} from './user'
export const StateContext = createContext({user:{}});

const mainReducer = ({ user }, action) => ({
  user: userReducer(user, action)
});

const initialState = {
  ...userInitialState
}

export default ({children}) =>{
  return <StateContext.Provider value={useReducer(mainReducer, initialState)}>
    {children}
  </StateContext.Provider>
}
export const useGlobalState = () => useContext(StateContext)