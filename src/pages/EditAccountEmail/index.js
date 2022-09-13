import React from 'react';
import { Container, ContainerMenu, UserIcon, ContainerTitle } from './styles';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import { useState } from 'react';
import toast from 'react-hot-toast';
import user from 'services/user';

function EditAccountEmail() {
  const [newEmail, setNewEmail] = useState('');
  const [oldEmail, setOldEmail] = useState('');

  async function editEmail(_id) {
    const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    console.log(newEmail, re.test(newEmail));
    const userEmail = JSON.parse(localStorage.getItem('user'));
    console.log(userEmail);
    if (oldEmail != userEmail.email) {
      toast.error('E-mail Inválido');
      return;
    }
    if (!re.test(newEmail)) {
      toast.error('E-mail Inválido');
      return;
    }
    try {
      const response = await user.put(`/updateUser/${_id}`, {
        email: newEmail
      });
      response.status == 200;
      toast.success('Usuário atualizado com  sucesso');
      setNewEmail('');
    } catch (error) {
      toast.error('Erro ao editar \n' + error.response.data.message);
    }
  }
  return (
    <Container>
      <ContainerTitle>
        <UserIcon />
        <h1>Editar Email</h1>
      </ContainerTitle>
      <ContainerMenu>
        <TextInput
          set={setOldEmail}
          value={oldEmail}
          placeholder="Email Atual"
        />
        <TextInput
          set={setNewEmail}
          value={newEmail}
          placeholder="Email Novo"
        />
      </ContainerMenu>
      <Button onClick={editEmail}>Salvar</Button>
    </Container>
  );
}

export default EditAccountEmail;
