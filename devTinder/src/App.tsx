import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/nav-bar";
import Body from "./components/body";
import Login from "./components/login";
import Profile from "./components/profile";

function App() {
  return (



<BrowserRouter basename="/">
 <Routes>
      <Route path="/" element={<Body />} >
      <Route path="/login" element={<Login />} />

      <Route path="/profile" element={<Profile />} />
    </Route>
 </Routes>

 </BrowserRouter>

    
  );
}

export default App
