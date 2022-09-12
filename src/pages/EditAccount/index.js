import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, ContainerMenu, UserIcon, ContainerTitle } from './styles';
import Button from '../../components/Button';

function EditAccount() {
  const navigate = useNavigate();

  const rotaEmail = async () => {
    navigate('email'), { replace: true };
  };

  return (
    <>
      <Container>
        <ContainerTitle>
          <UserIcon />
          <h1>Editar Conta</h1>
        </ContainerTitle>
        <ContainerMenu>
          <Button onClick={rotaEmail}>
            <span>Email</span>
          </Button>
          <Button>
            <span>Senha</span>
          </Button>
        </ContainerMenu>
      </Container>
    </>
  );
}

export default EditAccount;
