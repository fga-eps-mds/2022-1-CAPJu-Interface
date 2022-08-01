import './styles.js';
import SideBar from './components/SideBar';
import Login from './pages/Login';
import ShowProcess from 'pages/ShowProcess/index.js';
import Processes from 'pages/Processes/index.js';
import { Routes, Route } from 'react-router-dom';
import { Container, Content } from './styles';
import RegisterProcess from './pages/RegisterProcess/index.js';
import GlobalStyle from './globalStyles';
import { Toaster } from 'react-hot-toast';
import React from 'react';
import Stages from 'pages/Stages/index.js';
import Flows from 'pages/Flows/index.js';

function App() {
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
            <Route path="stages" element={<Stages />} />
            <Route path="processes" element={<Processes />} />
            <Route
              path="processes/registerProcess"
              element={<RegisterProcess />}
            />
            <Route path="processes/showProcess" element={<ShowProcess />} />
          </Routes>
        </Content>
      </Container>
    </>
  );
}

export default App;
