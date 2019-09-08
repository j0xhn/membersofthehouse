/* eslint-disable jsx-a11y/accessible-emoji */
import React, {useState} from 'react';
import { Check } from '@material-ui/icons'
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import _offlineData from '../static/data/mappedSnackList'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
const offlineData = _offlineData.slice(0,3)

function App() {
  const [snacks] = useState(offlineData)
  const [sent, setSent] = useState()
  const [allos, setAllos] = useState(offlineData.reduce((acc,snack)=>({
    ...acc, 
    [snack.id]: 2})
  ,{}))
  const votesPerSnack = 4
  const totalBudget = snacks.length * votesPerSnack
  
  const toggleSent = () => {
    setSent(!sent)
  }

  const total = Object.values(allos)
    .reduce((acc,allo) => Number(acc) + Number(allo), 0)

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
    return sent
    ? <div className='flexCenter column h100p'> 
        <div className='fs1 txtGreen'>
          <Check style={{fontSize: 100 }} /> 
        </div>
        <div onClick={toggleSent} className='txtBlue underline pointer'>back to example</div>
      </div> 
    : <div className="tac">
      <div className='flex jcc aife mt30'>
        <span>
          you have 
            <span className='fs1'>{remainingBalance}</span>
          voice credits
          <div> to vote with on the following snacks </div>
        </span>
      </div>
      {remainingBalance
        ? <p className='fs16 mb30'>🤔 budget wisely my friend 🤔</p>
        : <p className='fs16 mb30'>thank you 🥳</p>
      }
      <div className='flex aic column'>
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
      </div> )}
      </div>
        <TextField
          id="outlined-multiline-static"
          label="Thoughts on our workplace?"
          multiline
          className="w300 block"
          rows="4"
          margin="normal"
          variant="outlined"
        />
      <div className='mt30 mb50 w100p'>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => setTimeout(() => {
           toggleSent() 
          }, 300)}
          >
            Send Feedback
          </Button>
      </div>
    </div>
}

export default App;
