import React from 'react';
import { Container, ContainerMenu, UserIcon, ContainerTitle } from './styles';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import toast from 'react-hot-toast';
import { useState } from 'react';
import user from 'services/user';

function EditAccountPassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');

  async function editPassword() {
    try {
      const userPass = JSON.parse(localStorage.getItem('user'));
      const response = await user.post(`/updateUserPassword`, {
        oldPassword,
        newPassword
      });
      console.log('aqui', userPass);
      response.status == 200;
      toast.success('Senha atualizado com  sucesso');
    } catch (error) {
      toast.error('Erro ao editar \n' + error.response.data.message);
    }
  }
  return (
    <Container>
      <ContainerTitle>
        <UserIcon />
        <h1>Editar Senha</h1>
      </ContainerTitle>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editPassword();
        }}
      >
        <ContainerMenu>
          <TextInput
            set={setOldPassword}
            value={oldPassword}
            placeholder={'Senha Atual'}
            type="password"
          />
          <TextInput
            set={setNewPassword}
            value={newPassword}
            placeholder={'Nova Senha'}
            type="password"
          />
          <TextInput
            set={setNewPassword2}
            value={newPassword2}
            placeholder={'Confirmar Senha'}
            type="password"
          />
        </ContainerMenu>
        <Button type="submit">Salvar</Button>
      </form>
    </Container>
  );
}

export default EditAccountPassword;
