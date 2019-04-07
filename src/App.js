import React, { Component } from 'react';
import './App.css';

import AnimatedCapital from './AnimatedCapital';
import IlluminatedManuscript from './IlluminatedManuscript';

class App extends Component {

  render() {
    return (
      <div className="">
        <IlluminatedManuscript>
            <div>
            <AnimatedCapital />
            <>xempli gratia</>
            </div>
            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque vehicula sem eget elementum. Suspendisse potenti.
              
            </div>
        </IlluminatedManuscript>
      </div>
    );
  }
}

export default App;
