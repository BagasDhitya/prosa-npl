import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Landing from "./pages/landing";
import Setting from "./pages/setting";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
