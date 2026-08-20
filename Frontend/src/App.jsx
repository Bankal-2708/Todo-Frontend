import React, { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'
import { Route, Routes } from 'react-router-dom'
import About from './components/About/About'
import SignIn from './components/Auth/SignIn'
import SignUp from './components/Auth/SignUp'
import Todo from './components/Todo/Todo'
import { useDispatch } from 'react-redux'
import { authActions } from './store/Index'

function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    const id = sessionStorage.getItem("id");

    if (id) {
      dispatch(authActions.login());
    }

  }, [dispatch]);

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App