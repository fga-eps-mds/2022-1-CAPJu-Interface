import './styles.js';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import { Routes, Route } from 'react-router-dom';
import { Container, Content } from './styles';
import RegistrarProcesso from './pages/RegistrarProcesso/index.js';
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
          <Route path="registrarProcesso" element={<RegistrarProcesso />} />
        </Routes>
      </Content>
    </Container>
  );
}

export default App;
