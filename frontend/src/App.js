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
import AddStaff from './admin/AddStaff';
import AnnouncementList from './admin/AnnouncementList';
import AnnouncementInfo from './admin/AnnouncementInfo';
import AddAnnouncement from './admin/AddAnnouncement';
import StaffHomePage from './staff/StaffHomePage';
import ComputerCrashList from './staff/ComputerCrashList';
import AddComputerCrash from './staff/AddComputerCrash';


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
      <AdminRoute exact path="/admin/staff-list/add" component={AddStaff} />
      <AdminRoute exact path="/admin/staff/:id" component={StaffInfo} />
      <AdminRoute exact path="/admin/staff/:id/edit" component={EditStaff} />

      <AdminRoute exact path="/admin/announcement-list" component={AnnouncementList}/>
      <AdminRoute exact path="/admin/announcement-list/add" component={AddAnnouncement}/>
      <AdminRoute exact path="/admin/announcement/:id" component={AnnouncementInfo}/>
      
      <StaffRoute exact path="/staff" component={StaffHomePage}/>
      <StaffRoute exact path="/staff/crash-list" component={ComputerCrashList}/>
      <StaffRoute exact path="/staff/crash-list/add" component={AddComputerCrash}/>


    </Router>
  )
    
}

export default App;
