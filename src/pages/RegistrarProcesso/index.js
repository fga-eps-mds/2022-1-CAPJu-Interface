import { useState } from 'react';
import { Container } from './styles';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegistrarProcesso() {
  const [registro, setRegistro] = useState('');
  const [apelido, setApelido] = useState('');
  const navigate = useNavigate();

  async function registrar() {
    try {
      const response = await axios.post('http://localhost:3333/novoProcesso', {
        registro,
        apelido
      });

      console.log('response', response);

      toast.success('Processo Registrado com Sucesso', { duration: 4000 });

      navigate('/');
    } catch (error) {
      toast.error(
        'Erro ao registrar processo \n ' + error.response.data.message,
        { duration: 3000 }
      );
    }
  }

  return (
    <Container>
      <label>Nº de Registro</label>
      <TextInput
        value={registro}
        set={setRegistro}
        placeholder={'registro'}
      ></TextInput>
      <label>Apelido (Opcional)</label>
      <TextInput
        value={apelido}
        set={setApelido}
        placeholder={'apelido'}
      ></TextInput>
      <Button
        onClick={() => {
          registrar();
        }}
      >
        Registrar Processo
      </Button>
    </Container>
  );
}

export default RegistrarProcesso;
