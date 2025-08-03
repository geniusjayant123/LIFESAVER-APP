import React, { useState } from 'react';
import Home from './components/Home';
import Input from './components/Input';

function App() {
  const [showInput, setShowInput] = useState(false);

  return (
    <div>
      {showInput ? <Input /> : <Home onSOSClick={() => setShowInput(true)} />}
    </div>
  );
}

export default App;
