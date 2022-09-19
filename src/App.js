import './styles.js';
import SideBar from './components/SideBar';
import Login from './pages/Login';
import ShowProcess from 'pages/ShowProcess/index.js';
import Processes from 'pages/Processes/index.js';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Container, Content } from './styles';
import GlobalStyle from './globalStyles';
import { Toaster } from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
import Stages from 'pages/Stages/index.js';
import Flows from 'pages/Flows/index.js';
import AccessProfile from 'pages/AccessProfile/index.js';
import Statistics from 'pages/Statistics/index.js';
import Recovery from 'pages/Recovery/index.js';
import StatisticsProcesses from 'pages/StatisticsProcesses/index.js';
import EditAccount from 'pages/EditAccount/index.js';
import EditAccountEmail from 'pages/EditAccountEmail/index.js';
import EditAccountPassword from 'pages/EditAccountPassword/index.js';
import SolicitacoesCadastro from 'pages/SolicitacoesCadastro/index.js';
import Unidades from 'pages/Unidades/index.js';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  console.log(location.pathname);

  useEffect(() => {
    if (
      !localStorage.getItem('user') &&
      location.pathname != '/Login' &&
      !location.pathname.startsWith('/recovery/')
    ) {
      navigate('Login');
      return;
    }

    let currentDate = new Date();

    if (
      !localStorage.getItem('user') ||
      !JSON.parse(localStorage.getItem('user'))?.expiresIn ||
      new Date(JSON.parse(localStorage.getItem('user'))?.expiresIn) <
        currentDate
    ) {
      // localStorage.setItem('user', null);
      navigate('Login');
      return;
    }
    if (!user) {
      setUser(localStorage.getItem('user'));
    }
  }, [user, location.pathname, navigate]);

  return (
    <>
      <GlobalStyle />
      <Toaster position="top-right"></Toaster>
      <Container>
        <SideBar />
        <Content>
          <Routes>
            <Route path="/" element={<Flows />} />
            <Route path="login" element={<Login />} />
            <Route path="recovery">
              <Route path=":hash" element={<Recovery />} />
            </Route>
            <Route path="accessProfile" element={<AccessProfile />} />
            <Route path="stages" element={<Stages />} />
            <Route path="unidades" element={<Unidades />} />
            <Route path="processes" element={<Processes />} />
            <Route path="processes/showProcess" element={<ShowProcess />} />
            <Route path="statistics" element={<Statistics />} />
            <Route
              path="statistics/stageProcesses"
              element={<StatisticsProcesses />}
            />
            <Route
              path="statistics/stageProcesses/showProcess"
              element={<ShowProcess />}
            />
            <Route path="editAccount" element={<EditAccount />} />
            <Route path="editAccount/email" element={<EditAccountEmail />} />
            <Route path="editAccount/senha" element={<EditAccountPassword />} />
            <Route path="solicitacoes" element={<SolicitacoesCadastro />} />
          </Routes>
        </Content>
      </Container>
    </>
  );
}

export default App;
