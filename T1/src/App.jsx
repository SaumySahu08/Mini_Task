import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './services/store'

import Login from './components/Login'
import Home from './components/Home'
import Users from './components/Users'
import Chat from './components/Chat' 
import Products from './components/Products'

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products/>} />
        </Routes>

     
        <Chat />
      </BrowserRouter>
    </Provider>
  )
}

export default App
