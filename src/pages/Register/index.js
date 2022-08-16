import React from 'react';
import { Container } from './styles';
import { useState } from 'react';
import TextInput from 'components/TextInput';
import Button from 'components/Button';
import { Content } from './styles';
import toast from 'react-hot-toast';
import user from 'services/user';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [newName, setName] = useState('');
  const [newEmail, setEmail] = useState('');
  const [newPassword, setPassword] = useState('');
  const [newPassword2, setPassword2] = useState('');

  const navigate = useNavigate();

  async function register() {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(newEmail, re.test(newEmail));
    if (!re.test(newEmail)) {
      toast.error('E-mail Inválido');
      return;
    }
    if (newPassword != newPassword2) {
      toast.error('Password invalida');
      return;
    }

    const response = await user.post('/newUser', {
      name: newName,
      email: newEmail,
      password: newPassword,
      password2: newPassword2
    });

    if (response.status == 200) {
      toast.success('Usuário cadastrado com  sucesso');
      navigate('login');
    } else {
      toast.error('Erro no cadastro: ' + response.data?.message);
    }
  }

  return (
    <Container>
      <Content>
        <h1>Cadastre-se </h1>
        <TextInput
          set={setName}
          value={newName}
          placeholder="Nome completo"
        ></TextInput>
        <TextInput
          set={setEmail}
          value={newEmail}
          placeholder="Email"
        ></TextInput>
        <TextInput
          set={setPassword}
          value={newPassword}
          placeholder="Crie uma senha"
        ></TextInput>
        <TextInput
          set={setPassword2}
          value={newPassword2}
          placeholder="Confirme a senha"
        ></TextInput>
        <Button
          onClick={() => {
            register();
          }}
        >
          Cadastrar
        </Button>
      </Content>
    </Container>
  );
}

export default Register;
