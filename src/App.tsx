import Navbar from "./components/NavBar"
import Footer from "./components/Footer"
import Home from "./pages/home"
import Login  from "./pages/Login"
import Register from "./pages/Register"
import React from "react"

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
      <Login />
      <Register />
      <Footer />
    </div>
  )
}

export default App