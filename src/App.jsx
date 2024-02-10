import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  Home,
  About,
  Contact,
  Notfound,
  Signin,
  ForgotPassword
} from './pages';
import UserLayout from './Layout/UserLayout';
import AdminLayout from './Layout/AdminLayout';
import {
  Dashboard,
  Feedback,
  Settings,
  Survey,
  Users,
  Analytics,
  Profile,
  Dimessions,
  Institutions,
  Questions,
  CreateSurvey,
  SurveyDimensions
} from './admin/pages';
import { AppContext } from './context/AppProvider';
import { UserHomePage, ConductSurvey } from './user/pages';
import ConductPage from './user/pages/conductSurvey/ConductPage';
function App() {
  const { loggedUser } = React.useContext(AppContext);
  console.log(loggedUser);

  return (
    <>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='signin' element={<Signin />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='userHomePage' element={<UserHomePage />} />
          <Route path='conduct' element={<ConductSurvey />} />
          <Route path='conduct/:surveyId' element={<ConductPage />} />

          <Route />
          <Route path='*' element={<Notfound />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='analytics' element={<Analytics />} />
          <Route path='feedback' element={<Feedback />} />
          <Route path='survey' element={<Survey />} />
          <Route path='settings' element={<Settings />} />
          <Route path='users' element={<Users />} />
          <Route path='profile' element={<Profile />} />
          <Route path='dimessions' element={<Dimessions />} />
          <Route path='institutions' element={<Institutions />} />
          <Route path='questions' element={<Questions />} />
          <Route path='createsurvey' element={<CreateSurvey />} />
          <Route path='surveydimension/:id' element={<SurveyDimensions />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
