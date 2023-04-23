import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Welcome from './pages/Welcome/Welcome'
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import About from './pages/About/About';
import Analytics from './pages/Analytics/Analytics';
import SNA from './pages/SNA/SNA';
import DataHandling from './pages/DataHandling/DataHandling';
import Settings from './pages/Settings/Settings';
import NotFound from './pages/NotFound/NotFound';

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Welcome/>} />
          <Route path="/welcome" element={<Welcome/>} />
          <Route path="/about" element={<About />} />
          <Route path="/sna" element={<SNA />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/datahandling" element={<DataHandling />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;