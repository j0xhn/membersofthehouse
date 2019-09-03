import React, { useState, useRef} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import base from '../airtable'
import {useStateValue} from '../stores/global'
export default ({lastVoteTimestamp}) => {
  const [message, setMessage] = useState(null)
  const feedbackEl = useRef(null)
  const [{user}] = useStateValue()
  const handleSuccess=() => {
    console.log('success')
  }
  const onSubmit = () => {
    base('feedback').create({
      uid: user.uid,
      feedback: feedbackEl.current.value
    }, function(err, record) {
      if (err) {
        setMessage(err)
      } else {
        setMessage('This form will reset in 24 hours and you can vote again.  Happy snacking here at Wayfair :)')
        setTimeout(() => {
         handleSuccess() 
        }, 2000);
      }
    });
  }
  return <div className="pageContainer tac pt50">
    <div className='fs2 mb20'>Thank you!</div>
      {message 
      ? <div className='mw400 m0a'>{message}</div>
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