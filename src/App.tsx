import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Landing from "./pages/landing";
import Setting from "./pages/setting";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
