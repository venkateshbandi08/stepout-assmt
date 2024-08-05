import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import NavBar from './components/NavBar/NavBar'
// import Footer from './components/Footer/Footer'
import Register from './components/Register/Register'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login/Login';
import AddTrain from './components/AddTrain/AddTrain'

const App = () => {
    return (
      <div className="app">
        <NavBar/>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<AddTrain />} />
        </Routes>
        {/* <Footer/> */}
        <ToastContainer />
      </div>
        
    )
}



export default App