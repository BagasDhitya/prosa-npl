import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/home"
import Landing from "./pages/landing"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App