import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import OLL from './pages/OLL'
import Sidebar from './components/Sidebar'

function App() {
  return (
    <BrowserRouter basename="/rubik">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-48">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/oll" element={<OLL />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
