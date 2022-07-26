import './styles.js';
import Header from './components/Header';
import Home from './pages/Home';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import { Routes, Route } from 'react-router-dom';
import { Container, Content } from './styles';
import RegisterProcess from './pages/RegisterProcess/index.js';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Container>
      <Toaster position="top-right"></Toaster>
      <Header />
      <Content>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="cadastro" element={<Cadastro />} />
          <Route path="registerProcess" element={<RegisterProcess />} />
        </Routes>
      </Content>
    </Container>
  );
}

export default App;
