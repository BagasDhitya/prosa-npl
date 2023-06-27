import { BrowserRouter, Routes, Route } from "react-router-dom";

import SpeechToText from "./pages/stt";
import TextToSpeech from "./pages/tts";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Setting from "./pages/setting";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/stt" element={<SpeechToText />} />
        <Route path="/tts" element={<TextToSpeech />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
