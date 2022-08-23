// @ts-nocheck
import React from 'react';
import {
  Container,
  Menu,
  MenuElement,
  Modal,
  ForgotPassword,
  ContentHeader
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
      password: newPassword
    });

    if (response.status == 200) {
      toast.success('Usuário cadastrado com  sucesso');
      navigate('/login');
    } else {
      toast.error('Erro no cadastro: ' + response.data?.message);
    }
  }

  async function login() {
    const response = await user.post('/login', {
      email: email,
      password: password
    });
    if (response.status == 200) {
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      toast.success('Usuário logado com  sucesso');
      navigate('/Stages');
    } else {
      toast.error('Erro no login: ' + response.data?.message);
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
            <div>
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
              <Button
                onClick={async () => {
                  login();
                }}
              >
                Entrar
              </Button>
            </div>
          </>
        ) : (
          <>
            <h1>Cadastre-se </h1>
            <TextInput
              set={setNewName}
              value={newName}
              placeholder="Nome completo"
            ></TextInput>
            <TextInput
              set={setNewEmail}
              value={newEmail}
              placeholder="Email"
            ></TextInput>
            <TextInput
              set={setNewPassword}
              value={newPassword}
              placeholder="Crie uma senha"
              type="password"
            ></TextInput>
            <TextInput
              set={setNewPassword2}
              value={newPassword2}
              placeholder="Confirme a senha"
              type="password"
            ></TextInput>
            <Button
              onClick={() => {
                register();
              }}
            >
              Cadastrar
            </Button>
          </>
        )}
        {isModalOpen && (
          <Modal>
            <Content>
              <h2>Alteração de senha</h2>
              <TextInput set={setEmail} value={email} />

              <Button
                onClick={() => {
                  requestNewPassword();
                  setModalOpen(false);
                }}
              >
                Solicitar E-mail
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
