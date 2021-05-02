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
import EditComputerCrash from './staff/EditComputerCrash';
import EditHomeCrash from './staff/EditHomeCrash';
import ComputerCrashInfo from './staff/ComputerCrashInfo';
import HomeCrashInfo from './staff/HomeCrashInfo';
import AnnouncementView from './staff/AnnouncementView';
import ClientHomePage from './client/ClientHomePage';
import AnnouncementListView from './client/AnnouncementListView';
import AnnouncementClientView from './client/AnnouncementClientView';
import ClientCrashList from './client/ClientCrashList';
import ClientCrashView from './client/ClientCrashView';
import ClientHomeCrashView from './client/ClientHomeCrashView';
import AddHomeCrash from './client/AddHomeCrash';
import ClientContact from './client/ClientContact';
import Contact from './public/Contact';


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
      <Route path="/contact" component={Contact} />
      
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
      <StaffRoute exact path="/staff/crash/:id/edit" component={EditComputerCrash}/>
      <StaffRoute exact path="/staff/home-crash/:id/edit" component={EditHomeCrash}/>
      <StaffRoute exact path="/staff/crash/:id" component={ComputerCrashInfo}/>
      <StaffRoute exact path="/staff/home-crash/:id" component={HomeCrashInfo}/>
      <StaffRoute exact path="/staff/announcement/:id" component={AnnouncementView} />


      <ClientRoute exact path="/client" component={ClientHomePage} />
      <ClientRoute exact path="/client/crash-list" component={ClientCrashList} />
      <ClientRoute exact path="/client/announcement/:id" component={AnnouncementClientView} />
      <ClientRoute exact path="/client/crash/:id" component={ClientCrashView} />
      <ClientRoute exact path="/client/home-crash/:id" component={ClientHomeCrashView} />
      <ClientRoute exact path="/client/crash-list/add" component={AddHomeCrash}/>
      <ClientRoute exact path="/client/contact" component={ClientContact}/>

    </Router>
  )
    
}

export default App;
