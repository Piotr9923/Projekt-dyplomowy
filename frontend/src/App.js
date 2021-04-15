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
import LoginPage from './public/login/Login';
import RegistrationTypePage from './public/registration/Registration';
import ChooseMode from './public/login/ChooseMode';
import NewUserRegistration from './public/registration/NewUserRegistration';
import ClientRegistration from './public/registration/ClientRegistration';
import Logout from './public/Logout';
import { AdminRoute } from './routes/AdminRoute';
import { StaffRoute } from './routes/StaffRoute';
import { LoggedUserRoute } from './routes/LoggedUserRoute';
import { UnloggedUserRoute } from './routes/UnloggedUserRoute';
import { ClientRoute } from './routes/ClientRoute';
import StaffList from './admin/StaffList';
import EditStaff from './admin/EditStaff';


function App() {
  return (
    <Router>
      <Route exact path="/" component={MainPage} />
      <UnloggedUserRoute path="/login" component={LoginPage} />
      <LoggedUserRoute path="/dashboard" component={ChooseMode}/>
      <Route exact path="/registration" component={RegistrationTypePage} />
      <Route path="/registration/new" component={NewUserRegistration} />
      <Route path="/registration/client" component={ClientRegistration} />
      <Route path="/logout" component={Logout} />

      
      <AdminRoute exact path="/admin" component={AdminHomePage} />
      <AdminRoute exact path="/admin/staff-list" component={StaffList} />
      <AdminRoute exact path="/admin/staff/:id" component={StaffInfo} />
      <AdminRoute exact path="/admin/staff/:id/edit" component={EditStaff} />

      
    </Router>
  )
    
}

export default App;
