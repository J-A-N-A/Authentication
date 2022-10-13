import './App.css';
import Login from './Login';
import Signup from './Signup';
import Dash from './Dash';
import ResetPassword from './ResetPassword';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
function App() {
  return (

    <>
    <BrowserRouter>
    <Routes>
    <Route path="/dash" element={<Dash/>}/>
    <Route path="/" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/resetpassword" element={<ResetPassword/>}/>

    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
