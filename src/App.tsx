import React from 'react';
import Dragger from './components/Dragger';
import './App.css';
import Box from './components/Box';
const App: React.FC = () => {
  return (
    <div className='App'>
      <Dragger>
        <Box />
      </Dragger>
    </div>
  );
};

export default App;
