import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import NasaPhoto from './components/NasaPhoto';
import NightSkyQuiz from './components/NightSkyQuiz';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/nasaphoto' element={<NasaPhoto />} />
          <Route path='/quiz' element={<NightSkyQuiz />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
