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

function App() {
  return (
    <Router>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/admin" component={AdminHomePage} />
      <Route exact path="/admin/staff/:id" component={StaffInfo} />

    </Router>
  )
    
}

export default App;
