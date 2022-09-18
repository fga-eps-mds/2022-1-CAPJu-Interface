import React from 'react';
import { Link } from 'react-router-dom';
import { Container, ContainerMenu, UserIcon, ContainerTitle } from './styles';
import Button from '../../components/Button';

function EditAccount() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Container>
      <ContainerTitle>
        <UserIcon />
        <h1>Editar Conta</h1>
      </ContainerTitle>
      <h6>{user.name}</h6>
      <ContainerMenu>
        <Link to="email">
          <Button>
            <span>Email</span>
          </Button>
        </Link>
        <Link to="senha">
          <Button>
            <span>Senha</span>
          </Button>
        </Link>
      </ContainerMenu>
    </Container>
  );
}

export default EditAccount;
