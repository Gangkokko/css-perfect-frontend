import './App.css';
import { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getCurrentUser } from './lib/api/auth';
import Title from './components/page/Title';
import SignIn from './components/page/SignIn';
import SignUp from './components/page/SignUp';
import Header from './components/utils/Header';
import DrfApiFetch from './components/DrfApiFetch';
import Stage from './components/page/Stage';
import Problem from './components/page/Problem';

export const AuthContext = createContext();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();

      if (res?.status === 200) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.currentUser);
      } else {
      }
    } catch (err) {}

    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);
  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        isSignedIn,
        setIsSignedIn,
        currentUser,
        setCurrentUser,
      }}
    >
      <Router>
        <Header />
        <Routes>
          <Route path='/ca' element={<DrfApiFetch />} />
          <Route path='/' element={<Title />} />
          <Route path='/register' element={<SignUp />} />
          <Route path='/login' element={<SignIn />} />
          <Route path='/stages' element={<Stage />} />
          <Route path='/problem' element={<Problem />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
