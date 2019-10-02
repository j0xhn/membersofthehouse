/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import './Shorthand.css';
import Vote from './routes/vote'
import Landing from './routes/landing'
import GlobalWrapper from './stores/global'
import Toast from './components/Toast'

function App() {
    return (
    <GlobalWrapper>
      <Toast>
        <Router>
          <Route path="/vote/:baseId" component={Vote} />
          <Route exact path="/" component={Landing} />
        </Router>
      </Toast>
    </GlobalWrapper>
  );
}

export default App;
