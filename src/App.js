import './styles.js';
import SideBar from './components/SideBar';
import Login from './pages/Login';
import ShowProcess from 'pages/ShowProcess/index.js';
import Processes from 'pages/Processes/index.js';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Container, Content } from './styles';
import RegisterProcess from './pages/RegisterProcess/index.js';
import GlobalStyle from './globalStyles';
import { Toaster } from 'react-hot-toast';
import React, { useContext, useEffect, useState } from 'react';
import Stages from 'pages/Stages/index.js';
import Flows from 'pages/Flows/index.js';
import { AuthContext } from 'context/AuthContext';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: 'oxi' });

  useEffect(() => {
    if (!localStorage.getItem('user') && location.pathname != '/Login') {
      console.log('uai po');
      navigate('Login');
      console.log('wtfff');
    }
  });

  return (
    <>
      <GlobalStyle />
      <Toaster position="top-right"></Toaster>
      <Container>
        <AuthContext.Provider value={{ user, setUser }}>
          <SideBar />
          <Content>
            <Routes>
              <Route path="/" element={<Flows />} />
              <Route path="login" element={<Login />} />
              <Route path="stages" element={<Stages />} />
              <Route path="processes" element={<Processes />} />
              <Route
                path="processes/registerProcess"
                element={<RegisterProcess />}
              />
              <Route path="processes/showProcess" element={<ShowProcess />} />
            </Routes>
          </Content>
        </AuthContext.Provider>
      </Container>
    </>
  );
}

export default App;
