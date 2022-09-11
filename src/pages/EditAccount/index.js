import React from 'react';
//import { useState } from 'react';
//import toast from 'react-hot-toast';
import { Container } from './styles';
import Account from '../../components/Account/index.js';
//import user from 'services/user';

function EditAccount() {
  //const [name, setName] = useState('');
  //const [email, setEmail] = useState('');
  //const [password, setPassword] = useState('');
  //const [password2, setPassword2] = useState('');

  //async function edit() {
  //  const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  //  const pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{6,}$/;
  //  console.log(email, re.test(email));
  //  if (!re.test(email)) {
  //    toast.error('E-mail Inválido');
  //    return;
  //  }
  //  console.log(password, pass.test(password));
  //  if (!pass.test(password)) {
  //    toast.error('Senha não cumpre os criterios');
  //    return;
  //  }
  //  if (password != password2) {
  //    toast.error('Senha invalida');
  //    return;
  //  }
  //  try {
  //    const response = await user.post('/user', {
  //      name: name,
  //      email: email,
  //      password: password
  //    });
  //    response.status == 200;
  //    toast.success('Usuário editado com  sucesso');
  //    setName('');
  //    setPassword('');
  //    setEmail('');
  //    setPassword2('');
  //  } catch (error) {
  //    toast.error('Erro ao editar \n' + error.response.data.message);
  //  }
  //}

  return (
    <>
      <Container>
        <Account />
        <span>Editar Conta</span>
      </Container>
    </>
  );
}

export default EditAccount;
