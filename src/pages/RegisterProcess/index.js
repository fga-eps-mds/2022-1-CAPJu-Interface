import { useEffect, useState } from 'react';
import { Container } from './styles';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/api';

function RegisterProcess() {
  const [registro, setRegistro] = useState('');
  const [apelido, setApelido] = useState('');
  const location = useLocation();
  const flow = location.state;

  const [periods, setPeriods] = useState([]);
  
  const navigate = useNavigate();

  const handleFormChange = (event, index) => {
    /*let data = [...stages];
    data[index] = { etapa: data[index], duracao: event.target.value };
    setStages(data);*/

    let data = [...periods];
    data[index] = event.target.value;
    setPeriods(data);
  }

  async function register(e) {
    e.preventDefault();

    try {
      if (registro && flow) {
        let response;
        let sequences = flow.sequences;
        let stagesAndPeriods = [];

        for (let i = 0; i < flow.stages.length; i++)
          stagesAndPeriods.push({etapa: flow.stages[i], duracao: periods[i]});

        response = await api.post('/newProcess', {
          registro,
          apelido,
          etapaAtual: sequences[0].from,
          arquivado: false,
          etapas: stagesAndPeriods,
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
      <form onSubmit={register}>
        <div>
          <label>Número de Registro</label>
          <input
            name='registro'
            value={registro}
            onChange={event => setRegistro(event.target.value)}
            placeholder={'registro'}
          />
        </div>

        <div>
          <label>Apelido (Opcional)</label>
          <input
            name='apelido'
            value={apelido}
            onChange={event => setApelido(event.target.value)}
            placeholder={'apelido'}
          />
        </div>
        {
          flow.stages.map((stage, idx) => {
            return (
              <div key={idx}>
                <label>Etapa {`${stage.etapa}`}</label>
                <input
                  name='duracao'
                  value={periods[idx]}
                  onChange={event => handleFormChange(event, idx)}
                  placeholder={'duração (dias)'}/>
              </div>
            )
          })
        }
      </form>

      <button
        onClick={register}
      >
        <span> Registrar Processo </span>
      </button>
    </Container>
  );
}

export default RegisterProcess;