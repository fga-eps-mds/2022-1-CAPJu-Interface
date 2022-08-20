// @ts-nocheck
import React from 'react';
import { Container, Menu, Modal } from './styles';
import { useState } from 'react';
import TextInput from 'components/TextInput';
import Button from 'components/Button';
import { Content } from 'pages/Stages/styles';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import user from 'services/user';
function Login() {
  const [newEmail, setEmail] = useState('');
  const [newPassword, setPassword] = useState('');

  const navigate = useNavigate();

  async function login() {
    const response = await user.post('/login', {
      email: newEmail,
      password: newPassword
    });
    if (response.status == 200) {
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      toast.success('Usuário logado com  sucesso');
      navigate('stages');
    } else {
      toast.error('Erro no login: ' + response.data?.message);
    }
  }

  return (
    <Container>
      <Content>
        <Modal>
          <Menu>
            <h2>Login</h2>
            <h2>Cadastro</h2>
          </Menu>
          <h1>Login</h1>
          <TextInput
            set={setEmail}
            value={newEmail}
            placeholder="Email"
          ></TextInput>
          <TextInput
            set={setPassword}
            value={newPassword}
            placeholder="Senha"
            type="password"
          ></TextInput>
          <Button
            onClick={async () => {
              login();
            }}
          >
            Entrar
          </Button>
        </Modal>
      </Content>
    </Container>
  );
}
export default Login;
