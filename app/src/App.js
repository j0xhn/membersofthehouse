import React, {useState} from 'react';
import './App.css';
import Slider from '@material-ui/core/Slider';

const snacks = [
  { title: 'Cookies',
    options: [
      { title: 'Oreos', price: 1 },
      { title: 'Chocolate Chip', price: 1.1 }
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

function App() {
  const totalBudget = 10
  const [budget, setBudget] = useState(10);
  const handleChange = (e, value) => {
    console.log('v', value)
  }
  return (
    <div className="App">
      <header className="App-header">
        <span style={{marginBottom: '50px', fontSize: '14px'}}>allocate:
        <span style={{fontSize: '50px'}}>${budget}/</span>
        ${totalBudget}
        </span>
        <div>
        {snacks.map(category => <div>
          {category.options.map(snack => <div 
            key={snack.title} 
            style={{display: 'flex', alignItems: 'flex-end', marginBottom: '40px'}}>
            <div style={{width: '200px', textAlign: 'right', marginRight: '20px'}}> {snack.title}</div>
            <Slider
              style={{width: '200px'}}
              max={budget}
              step={.1}
              defaultValue={snack.price}
              onChangeCommitted={handleChange}
              getAriaValueText={() => 'input'}
              aria-labelledby="discrete-slider-always"
              valueLabelDisplay="on"
            />
          </div>)}
        </div>)}
        </div>
      </header>
    </div>
  );
}

export default App;
