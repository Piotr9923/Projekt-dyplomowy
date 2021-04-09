import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from "react-router-dom";
import AdminHomePage from './admin/AdminHomePage';
import MainPage from './public/MainPage';
import StaffInfo from './admin/StaffInfo';
import LoginTypePage from './public/Login';
import LoginPage from './public/Login';
import RegistrationTypePage from './public/Registration';
import ChooseMode from './public/ChooseMode';

function App() {
  return (
    <Router>
      <Route exact path="/" component={MainPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/dashboard" component={ChooseMode}/>
      <Route path="/registration" component={RegistrationTypePage} />


      
      <Route exact path="/admin" component={AdminHomePage} />
      <Route exact path="/admin/staff/:id" component={StaffInfo} />

    </Router>
  )
    
}

export default App;
