import React, {useState} from 'react';
import './App.css';
import './Shorthand.css';
import Slider from '@material-ui/core/Slider';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Logo from './Components/logo'

const snackCats = [
  { title: 'Cookies',
    id: 'c1',
    defaultAllo: 2,
    options: [
      { id: 'o1', title: 'Oreos', price: 1, defaultAllo: 1 },
      { id: 'o2', title: 'Chocolate Chip', price: 1.1, defaultAllo: 1 }
    ]
  }, {
    title: 'Vegetables',
    defaultAllo: 8,
    id: 'c2',
    options: [
      { id: 'o3', title: 'Carrots', price: 1, defaultAllo: 5 },
      { id: 'o4', title: 'Hummus', price: 1.1, defaultAllo: 3 },
      { id: 'o5', title: 'Olives', price: 1.1, defaultAllo: 0 }
    ]
  },
];

const getDefaults = snackCats => {
  let defaults = {}
  snackCats.forEach(cat => cat.options.forEach(snack => 
    defaults[snack.id] = snack.defaultAllo
  ))
  return defaults
}

function App() {
  const totalBudget = 10
  const [snackMessage, setMessage] = useState("This feedback will be taken into consideration along with many other factors to determine the snacks.  Even if you can't find the snack you'd like, please take a minute to be grateful for the plethora of snack choices here at Wayfair 🙇‍")
  const [budget, setBudget] = useState(10);
  const [allocations, setAllocation] = useState(getDefaults(snackCats))

  const handleChange = ({id, value}) => {
    // const spentBudget = Object.values(allocations).reduce((acc, allo) => acc + allo)
    // const remaningBudget = totalBudget - spentBudget
    console.log('allocations', allocations)
    console.log('id', id)
    
    const total = Object.values(allocations).reduce((acc,allo) => acc + allo)
    const shouldSet = value < allocations[id]
    console.log('total: ', total);
    if (shouldSet) { 
      setAllocation({
        ...allocations, 
        [id]: value,
      })
    }
  }

  return (
    <div className="App tac pt20">
        <Logo text={<h1 className='fs1 relative'> 
              {/* <span className="absolute fsXLarge" style={{top: '15px', left: '-20px'}}>₻</span> */}
              {budget} 
            </h1>} orbit={false} />
        {snackCats.map(category => <div key={category.id} className='flex column w100p'>
          {category.options.map(snack => <div 
            key={snack.id} 
            className="flex mb40 jcc tar">
            <div className='ellipsis mr20 mw150'> {snack.title}</div>
            <Slider
              className='mw150'
              id={snack.id}
              name={snack.id}
              max={budget}
              step={.1}
              value={allocations[snack.id]}
              onChange={(e,value) => handleChange({id: snack.id, value})}
              getAriaValueText={() => 'input'}
              aria-labelledby="discrete-slider-always"
              valueLabelDisplay="on"
            />
          </div>)}
        </div>)}
        <TextField
          className='w300'
          label="Feedback"
          multiline
          rows="4"
          variant='outlined'
          placeholder="Additional comments on how to improve Wayfair"
          helperText="* required"
          margin="normal"
        />
        <div className='m20 w100p'>
          <Button className='w100p' variant="contained" color="primary">Blast Off!</Button>
        </div>
        <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={!!snackMessage}
        onClose={()=> setMessage(null)}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span>{snackMessage}</span>}
      />
    </div>
  );
}

export default App;
