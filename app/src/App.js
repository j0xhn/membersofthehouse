/* eslint-disable jsx-a11y/accessible-emoji */
import React, {useState} from 'react';
import './App.css';
import './Shorthand.css';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
import terms from './terms'
import Card from './components/card'
import Button from '@material-ui/core/Button';
import {generateUID} from './utils'
import Airtable from 'airtable'

/* 
*
* INITIAL SETUP
*
*/
const base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_KEY}).base('appVnznDLeNrQGLnE');
const uid = localStorage.getItem('hasa_uid')
if (!uid) localStorage.setItem('hasa_uid', generateUID())

/* 
*
* DATA -- replace with API call when ready
*
*/
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
    defaults[cat.id] = {
      ...defaults[cat.id],
      [snack.id]: snack.defaultAllo
    }
  ))
  return defaults
}


function App() {
  const totalBudget = 10
  const [budget] = useState(10);

  const onSubmit = () => {
    base('Table 1').create({id: uid, ...allocations}, function(err, record) {
      if (err) {
        console.error(err);
        return;
      } else {
        setMessage('Save Successfull')
      }
    });
  }
  
  // const [snackMessage, setMessage] = useState(`You have ${budget} voice credits to allocate, choose wisely `)
  const [snackMessage, setMessage] = useState(null)
  const [allocations, setAllocation] = useState(getDefaults(snackCats))
  const total = Object.values(allocations)
    .reduce((acc, cats) => ([...acc, ...cats]), [])
    .reduce((acc,allo) => acc + allo)
  const showTerms = () => setMessage(terms) 

  const handleChange = ({id, cid, value}) => {
    const currentAllo = allocations[id]
    const hypotheticalTotal = total - currentAllo + value
    const isDecreasing = value < currentAllo
    const isLessThanTotal = hypotheticalTotal <= totalBudget 
    if (isDecreasing || isLessThanTotal) { 
      setAllocation({
        ...allocations, 
        [cid]:{
          ...allocations[cid],
          [id]: value
        }
      })
    }
  }

  return (
    <div className="App tac">
      <div className='flex jcc aife mt30'>
        <span className='fs1'> {Math.round( total * 10) / 10}</span>
        <span>/{budget}</span>
      </div>
      <p className='fs16 mb30'>budget wisely my friend 🤔</p>
      <div className='flex'>
      {snackCats.map(cat => 
        <Card 
          {...cat} 
          allos={allocations[cat.id]}
          key={cat.id}
          className='m10' 
        />)}
      </div>
      {/* {snackCats.map(category => <div key={category.id} className='flex column w100p'>
        {category.options.map(snack => <div 
          key={snack.id} 
          className="flex mb40 jcc tar">
          <Tooltip title={snack.title} placement="top">
            <div className='ellipsis mr20 mw150'> {snack.title}</div>
          </Tooltip>
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
      </div>)} */}
      <div className='mb50 w100p'>
        <Button 
          variant="contained" 
          color="primary"
          onClick={onSubmit}
          >
            Blast Off! 🚀
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
