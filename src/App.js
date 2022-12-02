import './App.scss';
import {Routes, Route} from "react-router-dom";
import Layout from './components/Layout';
import Home from './components/Home';
import Contact from './components/Contact';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
function App() {
  return (
  <div>

    <Routes>
      <Route path="/Portfolio" element={<Layout />}>
        <Route path="" element= {<Home/>} />
        <Route path="home" element= {<Home/>} />
        <Route path="signIn" element= {<SignIn/>} />
        <Route path="signUp" element= {<SignUp/>} />
        <Route path="contact" element= {<Contact/>} />
      </Route>
    </Routes>
  </div>
  );
}

export default App;
