import React, { useState, useContext, useRef} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import base from '../airtable'
import { UserContext } from "../App";
export default ({lastVoteTimestamp}) => {
  const [message, setMessage] = useState(null)
  const feedbackEl = useRef(null)
  const userData = useContext(UserContext)
  const handleSuccess=() => {
    console.log('success')
  }
  const onSubmit = () => {
    base('feedback').create({
      uid: userData.uid,
      feedback: feedbackEl.current.value
    }, function(err, record) {
      if (err) {
        setMessage(err)
      } else {
        setMessage('This form will reset in 24 hours and you can vote again.  Thank you for participating and happy snacking here at Wayfair :)')
        setTimeout(() => {
         handleSuccess() 
        }, 2000);
      }
    });
  }
  return <div className="pageContainer tac pt50">
    {/* <div>
      <Check className='fs1' />
    </div> */}
    <div className='fs2 mb20'>Thank you!</div>
      {message 
      ? <span className='w300'>{message}</span>
      :  <>
        <div className='mb20'> Leave any other feedback below. </div>
        <div>
        <TextField
          id="outlined-multiline-static"
          label="Feedback"
          inputRef={feedbackEl}
          multiline
          className="w300 block"
          rows="4"
          margin="normal"
          variant="outlined"
        />
        </div>
        <Button 
          variant="contained" 
          className="w300 block"
          color="primary"
          onClick={onSubmit}
          >
            Send
          </Button>
        </>
      }
    </div>
}