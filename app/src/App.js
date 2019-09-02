/* eslint-disable jsx-a11y/accessible-emoji */
import React, {useState, createContext} from 'react';
import './App.css';
import './Shorthand.css';
import Slider from '@material-ui/core/Slider';
import offlineData from './static/data/mappedSnackList'
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import terms from './terms'
import Button from '@material-ui/core/Button';
import Thankyou from "./routes/thankyou";
import {shuffle, generateUID, mapAirtableValues} from './utils'
import base from './airtable'

/* 
*
* INITIAL SETUP
*
*/
let uid = localStorage.getItem('hasa_uid')
const lastVoteTimestamp = localStorage.getItem('hasa_lastVoteTimestamp')
if (!uid) {
  uid = generateUID()
  localStorage.setItem('hasa_uid', uid)
}
export const UserContext = createContext({uid, lastVoteTimestamp});


function App() {
  const [snacks, setSnacks] = useState([]);
  const [snackMessage, setMessage] = useState(null)
  const [allos, setAllos] = useState({})
  const [userData, setUserData] = useState({uid, lastVoteTimestamp})
  const votesPerSnack = 4
  const defaultVotesPerSnack = 2
  const totalBudget = snacks.length * votesPerSnack
  const handleSuccess = () => {
    const lastVoteTimestamp = Date.now()
    localStorage.setItem('hasa_lastVoteTimestamp', lastVoteTimestamp)
    setUserData({uid, lastVoteTimestamp, voted: true})
  }

  if (!snacks.length){
    base('snacks').select({
      view: 'Grid view'
    }).firstPage(function(err, records) {
      const mappedData = err 
        ? offlineData
        : mapAirtableValues(records)
      setSnacks(shuffle(mappedData))
      setAllos(mappedData.reduce((acc,snack)=>({
        ...acc, 
        [snack.id]: defaultVotesPerSnack})
      ,{}))
    });
  }

  const onSubmit = () => {
    base('votes').create({uid, ...allos}, function(err, record) {
      if (err) {
        setMessage(err)
      } else {
        setMessage('Save Successfull')
        setTimeout(() => {
         handleSuccess() 
        }, 2000);
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
  // const oneday = 60 * 60 * 24 * 1000
  // const hasVotedInPast24Hours = (Date.now() - oneday < userData.lastVoteTimestamp)
  // console.log('hasVotedInPast24Hours: ', hasVotedInPast24Hours);
    return (
    <UserContext.Provider value={userData}>
    {userData.voted 
    ? <Thankyou {...userData} /> 
    : <div className="App tac">
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
    }
</UserContext.Provider>
  );
}

export default App;
