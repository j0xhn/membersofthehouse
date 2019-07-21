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
  const [budget] = useState(10);
  return (
    <div className="App">
      <header className="App-header">
        <h1>{budget}</h1>
        <div>
        {snacks.map(category => <div>
          {/* {category.title} */}
          {category.options.map(snack => <div key={snack.title} style={{display: 'flex'}}>
            {snack.title}
            {/* <small>{` $${snack.price}`}</small> */}
            <Slider
              defaultValue={0}
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
