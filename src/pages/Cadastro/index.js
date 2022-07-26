import { useState } from 'react';
import { Container } from './styles';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  async function register() {
    try {
      const response = await axios.post('http://localhost:3333/newUser', {
        nome,
        email,
        senha
      });

      console.log('response', response);

      toast.success('Usuário Registrado com Sucesso', { duration: 4000 });

      navigate('/');
    } catch (error) {
      toast.error(
        'Erro ao Registrar Usuário \n ' + error.response.data.message,
        { duration: 3000 }
      );
    }
  }

  return (
    <Container>
      <a>
        Nome:{' '}
        <TextInput value={nome} set={setNome} placeholder={'nome'}></TextInput>
      </a>
      <a>
        Email:{' '}
        <TextInput
          value={email}
          set={setEmail}
          placeholder={'email'}
        ></TextInput>
      </a>
      <a>
        Senha:{' '}
        <TextInput
          type="password"
          value={senha}
          set={setSenha}
          placeholder={'senha'}
        ></TextInput>
      </a>
      <Button
        onClick={() => {
          register();
        }}
      >
        Cadastrar
      </Button>
    </Container>
  );
}

export default Cadastro;
