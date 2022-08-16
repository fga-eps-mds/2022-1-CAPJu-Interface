import React from 'react';
import { Container } from './styles';
import { useState } from 'react';
import TextInput from 'components/TextInput';
import Button from 'components/Button';
import { Content, Modal } from 'pages/Stages/styles';

function Register() {
  const [newName, setName] = useState('');
  const [newEmail, setEmail] = useState('');
  const [newPassword, setPassword] = useState('');
  return (
    <Container>
      <Modal>
          <Content>
            <h1>Cadastro</h1>
            <TextInput set={setName} value={newName} placeholder='Nome completo'></TextInput>
            <TextInput set={setEmail} value={newEmail} placeholder='Email'></TextInput>
            <TextInput set={setPassword} value={newPassword} placeholder='Crie uma senha'></TextInput>
            <Button
              onClick={() => {
                
              }}
            >
              Cadastrar
            </Button>
          </Content>
        </Modal>
    </Container>
  );
}

export default Register;

