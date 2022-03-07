import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { MainComponent } from './MainComponent';
import { OtherPage } from './OtherPage';

function App() {
  return (
    <>
    <Router>
      <header>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/otherpage">Other page</Link>
          </li>
        </ul>
      </header>
      <Routes>
        <Route exact path="/" element={<MainComponent />} />
        <Route path="/otherpage" element={<OtherPage />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
