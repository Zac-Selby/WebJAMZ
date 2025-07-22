import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<><Layout /> <Home /></>} />
        <Route path="/dashboard" element={<><Layout /> <Dashboard /></>} />
      </Routes>
    </>
  )
}

export default App
