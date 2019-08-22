/* eslint-disable jsx-a11y/accessible-emoji */
import React, {useState} from 'react';
import './App.css';
import './Shorthand.css';
import Slider from '@material-ui/core/Slider';
import offlineData from './static/data/mappedSnackList'
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import terms from './terms'
import Button from '@material-ui/core/Button';
import {generateUID, mapAirtableValues} from './utils'
import Airtable from 'airtable'

/* 
*
* INITIAL SETUP
*
*/
const base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_KEY}).base('appVnznDLeNrQGLnE');
const uid = localStorage.getItem('hasa_uid')
if (!uid) localStorage.setItem('hasa_uid', generateUID())


function App() {
  const [snacks, setSnacks] = useState([]);
  const [snackMessage, setMessage] = useState(null)
  const [allos, setAllos] = useState({})
  const votesPerSnack = 4
  const defaultVotesPerSnack = 2
  const totalBudget = snacks.length * votesPerSnack

  if (!snacks.length){
    base('snacks').select({
      view: 'Grid view'
    }).firstPage(function(err, records) {
      const mappedData = err 
        ? offlineData
        : mapAirtableValues(records)
      setSnacks(mappedData)
      setAllos(mappedData.reduce((acc,snack)=>({
        ...acc, 
        [snack.id]: defaultVotesPerSnack})
      ,{}))
    });
  }

  const onSubmit = () => {
    base('votes').create({uid, ...allos}, function(err, record) {
      if (err) {
        console.error(err);
        return;
      } else {
        setMessage('Save Successfull')
      }
    });
  }
  
  const total = Object.values(allos)
    .reduce((acc,allo) => Number(acc) + Number(allo), 0)

  const showTerms = () => setMessage(terms) 

  const handleChange = ({id, value}) => {
    const currentAllo = Number(allos[id]) || 0
    const hypotheticalTotal = total - currentAllo + value
    const isDecreasing = value < currentAllo
    const isLessThanTotal = hypotheticalTotal <= totalBudget
    if (isDecreasing || isLessThanTotal) { 
      setAllos({
        ...allos, 
        [id]: value
      })
    }
  }
  const remainingBalance = totalBudget - total
  return (
    <div className="App tac">
      <div className='flex jcc aife mt30'>
        <span>
          you have 
          {remainingBalance 
            ? <span className='fs1'>{remainingBalance}</span>
            : ' used all your '
          }
          voice credits
          {!!remainingBalance &&  <div> to vote with on the following snacks </div>}
        </span>
      </div>
      {remainingBalance
        ? <p className='fs16 mb30'>budget wisely my friend 🤔</p>
        : <p className='fs16 mb30'>thank you 🥳</p>
      }
      <div className='flex'>
      </div>
      {snacks.map(snack => <div key={snack.id} className='w300 tal'>
          <Typography>{snack.title}</Typography>
          <Slider
            id={snack.id}
            name={snack.id}
            max={totalBudget}
            step={1}
            valueLabelDisplay='auto'
            value={allos[snack.id] || 0}
            onChange={(e, value) => handleChange({ id: snack.id, value })}
            getAriaValueText={() => 'input'}
          /> 
        {/* </div> */}
      </div> )}
      <div className='mt30 mb50 w100p'>
        <Button 
          variant="contained" 
          color="primary"
          onClick={onSubmit}
          >
            Send Snack Feedback
          </Button>
      </div>
      <small className='fs10 w300 txtGray'>This app is an expirement and may or <strong className='underline'>may not</strong> impact snack choices.  Thank you for your help in making Wayfair a great place to work and snack </small>
      <p className='mb20'>🙇‍♂️</p>
      <div onClick={showTerms} className='fs10 w300 txtBlue pointer underline mb50'>terms and conditions</div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={!!snackMessage}
        onClose={()=> setMessage(null)}
        ContentProps={{ 'aria-describedby': 'message-id', }}
        message={<span>{snackMessage}</span>}
      />
    </div>
  );
}

export default App;
