import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/pages/Home';
import CharacterDetail from './components/pages/CharacterDetail';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/character/:id' element={<CharacterDetail />} />
        </Routes>
      </Router>{' '}
    </>
  );
}

export default App;
