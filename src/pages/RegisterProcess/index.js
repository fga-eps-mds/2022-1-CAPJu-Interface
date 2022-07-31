import { useState } from 'react';
import { Container } from './styles';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/api';

function RegisterProcess() {
  const [registro, setRegistro] = useState('');
  const [apelido, setApelido] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const flow = location.state;

  async function register() {
    try {
      let response;
      if (registro && flow) {
        let stages = flow.stages;
        let sequences = flow.sequences;

        response = await api.post('/newProcess', {
          registro,
          apelido,
          etapaAtual: sequences[0].from,
          arquivado: false,
          etapas: stages,
          fluxoId: flow._id
        });
      }
      else {
        toast.error('Registro vazio', { duration: 3000 });
        return;
      }

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
      <label>Número de Registro</label>
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
          register();
        }}
      >
        <span> Registrar Processo </span>
      </Button>
    </Container>
  );
}

export default RegisterProcess;