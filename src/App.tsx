
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/pages/Home'
import CharacterDetail from './components/pages/CharacterDetail';

function App() {
  return (
    <>
<Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
        {/* <Route exact path="/" component={Characters} />
        <Route path="/character/:id" component={CharacterDetail} /> */}
      </Routes>
    </Router>    </>
  )
}

export default App
