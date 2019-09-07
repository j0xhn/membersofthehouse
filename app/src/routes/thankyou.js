import React, { useState, useRef} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import base from '../airtable'
import {useGlobalState} from '../stores/global'
export default ({lastVoteTimestamp}) => {
  const [feedbackSent, setFeedbackSent] = useState(null)
  const feedbackEl = useRef(null)
  const [{user}] = useGlobalState()
  const onSubmit = () => {
    base('feedback').create({
      uid: user.uid,
      feedback: feedbackEl.current.value
    }, function(err, record) {
      if (err) {
        setFeedbackSent(false)
      } else {
        setFeedbackSent(true)
      }
    });
  }
  return <div className="pageContainer tac pt50">
    <div className='fs2 mb20'>Thank you!</div>
      <div className='mw400 m0a'>
        This form will reset in 24 hours and you can vote again.  Leave any other feedback you'd like below.  
        <div className='mb20'> Happy snacking here at Wayfair :) </div>
      </div>
      {feedbackSent 
        ? <span>Feedback Recieved</span>
        : <>
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
        </>}
      </div>
}