import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './about';
import Navbar from './navbar';
import NotFound from './404';
import Home from './home';
import '../index.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="App m-0">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="*" element={<NotFound />} />

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;
