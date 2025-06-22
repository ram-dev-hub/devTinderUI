import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/body";
import Login from "./components/login";
import Profile from "./components/profile";
import Register from "./components/register";
import appStore from "./store/appStore";
import { Provider } from "react-redux";
import Feed from "./components/feed";
import Request from "./components/request";
import Connections from "./components/connections";

function App() {
  return (


<Provider store={appStore}>
<BrowserRouter basename="/">
 <Routes>
      <Route path="/" element={<Body />} >
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />     
      <Route path="/feed" element={<Feed />} /> 
      <Route path="/connections" element={<Connections />} /> 
      <Route path="/requests" element={<Request />} /> 

      <Route path="/profile" element={<Profile />} />
    </Route>
 </Routes>

 </BrowserRouter>
 </Provider>

    
  );
}

export default App
