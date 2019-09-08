import React, {createContext, useState} from 'react'
import Snackbar from '@material-ui/core/Snackbar';
export const ToastContext = createContext({})
const defaultData = {
  anchorOrigin:{ vertical: 'bottom', horizontal: 'center' }
}
export default ({children}) => {
  const [data,setData] = useState({
    
  })
  if (data.message){
    setTimeout(() => {
     setData({}) 
    }, 3000);
  }
  const {
    anchorOrigin,
    message
  } = {
    ...defaultData,
    ...data
  }
  return <ToastContext.Provider value={{set: setData}}>
    <Snackbar
      anchorOrigin={anchorOrigin} 
      open={!!data.message}
      onClose={()=> setData({message: null})}
      ContentProps={{ 'aria-describedby': 'message-id', }}
      message={<span>{message}</span>}
    />
    {children}
  </ToastContext.Provider>
}