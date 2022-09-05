// @ts-nocheck
import React from 'react';
import {
  Container,
  Menu,
  MenuElement,
  Modal,
  ForgotPassword,
  Criterios
} from './styles';
import { useState } from 'react';
import TextInput from 'components/TextInput';
import Button from 'components/Button';
import { Content } from 'pages/Stages/styles';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import user from 'services/user';
function Login() {
  const [isModalOpen, setModalOpen] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');

  const [selectedTab, setSelectedTab] = useState('login');

  const navigate = useNavigate();

  async function register() {
    const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{6,}$/;
    console.log(newEmail, re.test(newEmail));
    if (!re.test(newEmail)) {
      toast.error('E-mail Inválido');
      return;
    }
    console.log(newPassword, pass.test(newPassword));
    if (!pass.test(newPassword)) {
      toast.error('Senha não cumpre os criterios');
      return;
    }
    if (newPassword != newPassword2) {
      toast.error('Senha invalida');
      return;
    }

    try {
      const response = await user.post('/newUser', {
        name: newName,
        email: newEmail,
        password: newPassword
      });
      response.status == 200;
      toast.success('Usuário cadastrado com  sucesso');
      setNewName('');
      setNewPassword('');
      setNewEmail('');
      setNewPassword2('');
      setSelectedTab('login');
    } catch (error) {
      toast.error('Erro ao cadastrar \n' + error.response.data.message);
    }
  }

  async function login() {
    try {
      const response = await user.post('/login', {
        email: email,
        password: password
      });

      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      toast.success('Usuário logado com  sucesso');
      navigate('/Stages');
      window.location.reload();
    } catch (error) {
      toast.error('Erro no login: ' + error.response.data.message);
    }
  }

  async function requestNewPassword() {
    const response = await user.post('/requestRecovery', {
      email: email
    });
    if (response.status == 200) {
      toast.success('Solicitação enviada com sucesso');
    } else {
      toast.error('Erro ao solicitar email');
    }
  }

  return (
    <Container>
      <Content>
        <Menu>
          <MenuElement
            onClick={() => {
              setSelectedTab('login');
            }}
            selected={selectedTab == 'login'}
          >
            Login
          </MenuElement>
          <MenuElement
            onClick={() => {
              setSelectedTab('register');
            }}
            selected={selectedTab == 'register'}
          >
            Cadastro
          </MenuElement>
        </Menu>
        {selectedTab == 'login' ? (
          <>
            <h1>Login</h1>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                login();
              }}
            >
              <TextInput
                set={setEmail}
                value={email}
                placeholder="Email"
              ></TextInput>
              <br></br>
              <br></br>
              <TextInput
                set={setPassword}
                value={password}
                placeholder="Senha"
                type="password"
              ></TextInput>
              <ForgotPassword
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                Esqueceu a senha?
              </ForgotPassword>
              <Button type="submit">Entrar</Button>
            </form>
          </>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              register();
            }}
          >
            <h1>Cadastre-se </h1>
            <TextInput
              set={setNewName}
              value={newName}
              placeholder="Nome completo"
            ></TextInput>
            <br></br>
            <TextInput
              set={setNewEmail}
              value={newEmail}
              placeholder="Email"
            ></TextInput>
            <br></br>
            <TextInput
              set={setNewPassword}
              value={newPassword}
              placeholder="Crie uma senha"
              type="password"
            ></TextInput>
            <br></br>
            <TextInput
              set={setNewPassword2}
              value={newPassword2}
              placeholder="Confirme a senha"
              type="password"
            ></TextInput>
            <Criterios>
              <ul>
                <h6>
                  <strong>Critérios para aceitação de senha:</strong>
                  <li>Deve conter ao menos um dígito;</li>
                  <li>Deve conter ao menos uma letra maiúscula;</li>
                  <li>Deve conter ao menos 6 dos caracteres;</li>
                </h6>
              </ul>
            </Criterios>
            <Button type="submit">Cadastrar</Button>
          </form>
        )}
        {isModalOpen && (
          <Modal>
            <Content>
              <h3>Recuperação de senha</h3>
              <h5>
                Você receberá um link via e-mail para criar sua nova senha
              </h5>
              <TextInput
                set={setEmail}
                value={email}
                placeholder="Digite seu email"
              ></TextInput>
              <Button
                onClick={() => {
                  requestNewPassword();
                  setModalOpen(false);
                }}
              >
                Solicitar recuperação
              </Button>
              <Button
                onClick={() => {
                  setModalOpen(false);
                }}
                background="#de5353"
              >
                Cancelar
              </Button>
            </Content>
          </Modal>
        )}
      </Content>
    </Container>
  );
}
export default Login;
