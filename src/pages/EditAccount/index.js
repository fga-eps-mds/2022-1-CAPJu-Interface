import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, ContainerMenu, UserIcon, ContainerTitle } from './styles';
import Button from '../../components/Button';

function EditAccount() {
  const user = JSON.parse(localStorage.getItem('user'));

  const navigate = useNavigate();

  const rotaEmail = async () => {
    navigate('email'), { replace: true };
  };

  const rotaSenha = async () => {
    navigate('senha'), { replace: true };
  };

  return (
    <Container>
      <ContainerTitle>
        <UserIcon />
        <h1>Editar Conta</h1>
      </ContainerTitle>
      <h6>{user.name}</h6>
      <ContainerMenu>
        <Button onClick={rotaEmail}>
          <span>Email</span>
        </Button>
        <Button onClick={rotaSenha}>
          <span>Senha</span>
        </Button>
      </ContainerMenu>
    </Container>
  );
}

export default EditAccount;
