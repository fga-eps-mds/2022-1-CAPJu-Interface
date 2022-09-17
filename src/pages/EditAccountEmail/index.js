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

  async function editEmail() {
    const userEmail = JSON.parse(localStorage.getItem('user'));
    try {
      if (oldEmail == userEmail.email && newEmail !== userEmail.email) {
        const response = await user.put(`/updateUser/${userEmail._id}`, {
          email: newEmail
        });
        response.status == 200;
        toast.success('Email atualizado com  sucesso');
        setNewEmail('');
        setOldEmail('');
      } else {
        toast.error('Erro ao atualizar email');
      }
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editEmail();
        }}
      >
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
        <Button type="submit">Salvar</Button>
      </form>
    </Container>
  );
}

export default EditAccountEmail;
