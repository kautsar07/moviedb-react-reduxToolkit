import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Details from './component/Details/Details';
import Horor from './component/Genres/Horor';
import Action from './component/Genres/Action'
import Adventure from './component/Genres/Adventure'
import Animation from './component/Genres/Animation'
import Comedy from './component/Genres/Comedy'
import Crime from './component/Genres/Crime'
import Documentary from './component/Genres/Documentary'
import Drama from './component/Genres/Drama'
import Family from './component/Genres/Family'
import Fantasy from './component/Genres/Fantasy'
import History from './component/Genres/History'
import Music from './component/Genres/Music'
import Mystery from './component/Genres/Mystery'
import Romance from './component/Genres/Romance'
import ScienceFiction from './component/Genres/ScienceFiction'
import TvMovie from './component/Genres/TvMovie'
import Thriller from './component/Genres/Thriller'
import War from './component/Genres/War'
import Western from './component/Genres/Western'
import Search from './component/Navbar/Search';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/search/:name" element={<Search />} />
        <Route path='/Horor' element={<Horor/>}/>
        <Route path='/action' element={<Action/>}/>
        <Route path='/adventure' element={<Adventure/>}/>
        <Route path='/animation' element={<Animation/>}/>
        <Route path='/comedy' element={<Comedy/>}/>
        <Route path='/crime' element={<Crime/>}/>
        <Route path='/documentary' element={<Documentary/>}/>
        <Route path='/drama' element={<Drama/>}/>
        <Route path='/family' element={<Family/>}/>
        <Route path='/fantasy' element={<Fantasy/>}/>
        <Route path='/history' element={<History/>}/>
        <Route path='/mystery' element={<Mystery/>}/>
        <Route path='/music' element={<Music/>}/>
        <Route path='/romance' element={<Romance/>}/>
        <Route path='/science fiction' element={<ScienceFiction/>}/>
        <Route path='/tv movie' element={<TvMovie/>}/>
        <Route path='/thriller' element={<Thriller/>}/>
        <Route path='/war' element={<War/>}/>
        <Route path='/western' element={<Western/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
