import './App.scss';
import {Routes, Route} from "react-router-dom";
import Layout from './components/Layout';
import Home from './components/Home';
import Contact from './components/Contact';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import LeaderBoard from './components/LeaderBoard';
import DashBoard from './components/Dashboard';
import UserLeaderBoard from './components/UserLeaderBoard';
import Chat from './components/Chat';
import ChartD from './components/Chart';

function App() {
  return (
  <div>

    <Routes>
      <Route path="/GamerH" element={<Layout />}>
        <Route path="" element= {<Home/>} />
        <Route path="home" element= {<Home/>} />
        <Route path="signIn" element= {<SignIn/>} />
        <Route path="signUp" element= {<SignUp/>} />
        <Route path="contact" element= {<Contact/>} />
        <Route path="world/leaderboard" element= {<LeaderBoard/>} />
      </Route>
    <Route path="/GamerH/user/dashboard" element= {<DashBoard/>} />
    <Route path="/GamerH/user/chat" element= {<Chat/>} />
    <Route path="/GamerH/user/leaderboard" element= {<UserLeaderBoard/>} />
    <Route path="/GamerH/user/chart" element= {<ChartD />} />
    </Routes>
  </div>
  );
}

export default App;
