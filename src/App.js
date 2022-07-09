import './styles.js';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import { Routes, Route } from 'react-router-dom';
import { Container, Content } from './styles';

function App() {
  return (
    <Container>
      <Header />
      <Content>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </Content>
    </Container>
  );
}

export default App;
