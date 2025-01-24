import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import {HomePage} from './components/HomePage'
import {SignIn} from './components/SignIn'
import {SignUp} from './components/SignUp'
import {TransactionDetails} from './components/TransactionDetails';
import { SchoolTransactions } from './components/SchoolTransactions'
import { CheckStatus } from './components/CheckStatus'

function App() {
  return (
    <Routes>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/details" element={<TransactionDetails />} />
      <Route path="/search-by-school" element={<SchoolTransactions />} />
      <Route path="/check-status" element={<CheckStatus />} />
    </Routes>
  )
}

export default App
