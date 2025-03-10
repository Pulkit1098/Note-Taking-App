import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import NoteState from './context/notes/NoteState'
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { useState } from 'react';

function App() {

  const [alert, setAlert] = useState(null)

  const showAlert = (message, type)=>{
    setAlert({msg: message, type: type})
    setTimeout(() => {
        setAlert(null);
    }, 1500);
  }

  return (
    <>
    <NoteState>
    <Router>
      <Navbar/>
      <Alert alert={alert}/>
      <div className="container">
      <Routes>
        <Route path='/' element={<Home showAlert={showAlert}/>}></Route>
        <Route path='/login' element={<Login showAlert={showAlert}/>}></Route>
        <Route path='/signup' element={<SignUp showAlert={showAlert}/>}></Route>
        <Route path='/about' element={<About/>}></Route>
      </Routes>
      </div>
    </Router>
    </NoteState>
    </>
  )
}

export default App
