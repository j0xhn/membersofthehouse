import React, {useState} from 'react';
import './App.css';
import './Shorthand.css';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Logo from './Components/logo'

const snacks = [
  { title: 'Cookies',
    options: [
      { title: 'Oreos', price: 1, allocation: 1 },
      { title: 'Chocolate Chip', price: 1.1, allocation: 1 }
    ]
  }, {
    title: 'Vegetables',
    options: [
      { title: 'Carrots', price: 1 },
      { title: 'Hummus', price: 1.1 },
      { title: 'Olives', price: 1.1 }
    ]
  },
];

const getDefaults = snacks => {
  return {
    Carrots: 3,
    Hummus: 5,
    Oreos: 2

  }
}

function App() {
  const totalBudget = 10
  const [allocatedBudget, setBudget] = useState(10);
  const [allocations, setAllocations] = useState(getDefaults(snacks))
  const handleChange = (e, value) => {
    console.log('v', value)
  }
  return (
    <div className="App tac pt20">
        <Logo text={<h1 className='fs1 relative'> 
              <span className="absolute fsXLarge" style={{top: '15px', left: '-20px'}}>$</span>
              {allocatedBudget} 
            </h1>} orbit={false} />
        {snacks.map(category => <div key={category.title} className='flex column w100p'>
          {category.options.map(snack => <div 
            key={snack.title} 
            className="flex mb40 jcc tar">
            <div className='ellipsis mr20 mw150'> {snack.title}</div>
            <Slider
              className='mw150'
              max={allocatedBudget}
              step={.1}
              defaultValue={snack.price}
              onChangeCommitted={handleChange}
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
    </div>
  );
}

export default App;
