import './styles.js';
import SideBar from './components/SideBar';
import Home from './pages/Home';
import Login from './pages/Login';
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
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="stages" element={<Stages />} />
            <Route path="flows" element={<Flows />} />
            <Route path="registerProcess" element={<RegisterProcess />} />
          </Routes>
        </Content>
      </Container>
    </>
  );
}

export default App;
