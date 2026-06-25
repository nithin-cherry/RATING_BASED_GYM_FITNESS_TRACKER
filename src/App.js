
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import "./index.css";
import Login from './pages/login';
import Dash01 from "./pages/dash01";
import E1 from "./pages/exe/exe01.jsx";
import E2 from "./pages/exe/exe02";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/physique" element={<Dash01 />} />
        <Route path="/1" element={<E1 />} />
        <Route path="/2" element={<E2 /> } /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
