import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'
import Webcam from './pages/Webcam'
import Realtime from './components/Realtime/Realtime'
import TableTest from './components/Table/TableTest'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/webcam" element={<Webcam />} />
        <Route path='/realtime' element={<Realtime/>} />
        <Route path='/test2' element={<TableTest typeTable={1}/>} />

      </Routes>
    </Router>
    
  );
}

export default App;
