import React from 'react';
import { Container } from './styles';
import { useState } from 'react';
import TextInput from 'components/TextInput';
import Button from 'components/Button';
import { Content, Modal } from 'pages/Stages/styles';
import api from 'services/api';
import axios from 'axios';

function Login() {
  const [newEmail, setEmail] = useState('');
  const [newPassword, setPassword] = useState('');
  return (
    <Container>
      <Modal>
        <Content>
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
          ></TextInput>
          <Button
            onClick={async () => {
              const response = await axios.post('http://localhost:3334/login', {
                email: newEmail,
                password: newPassword
              });

              if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));
              }

              return response.data;
            }}
          >
            Entrar
          </Button>
        </Content>
      </Modal>
    </Container>
  );
}

export default Login;
