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

  async function editPassword(_id) {
    const userPassword = JSON.parse(localStorage.getItem('user'));
    const pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{6,}$/;
    console.log(newPassword, pass.test(newPassword));
    if (oldPassword != userPassword) {
      toast.error('Senha invalida');
      return;
    }
    if (!pass.test(newPassword)) {
      toast.error('Senha não cumpre os criterios');
      return;
    }
    if (newPassword != newPassword2) {
      toast.error('Senha invalida');
      return;
    }
    try {
      const response = await user.put(`/updateUser/${_id}`, {
        password: newPassword
      });
      response.status == 200;
      toast.success('Senha atualizado com  sucesso');
      setNewPassword('');
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
      <Button onClick={editPassword}>Salvar</Button>
    </Container>
  );
}

export default EditAccountPassword;
