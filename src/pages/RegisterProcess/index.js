import { useContext, useEffect, useState } from 'react';
import authConfig from '../../services/config.js';
import { Container, Form, FormElement } from './styles';
import Button from '../../components/Button';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/api';
import { AuthContext } from 'context/AuthContext.js';
import React from 'react';

function RegisterProcess() {
  const [registro, setRegistro] = useState('');
  const [apelido, setApelido] = useState('');
  const location = useLocation();
  const flow = location.state;

  const { value: user } = useContext(AuthContext);

  const [periods, setPeriods] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    for (let i in flow.stages) {
      console.log(i);
      periods.push('');
    }
    // eslint-disable-next-line
  }, []);

  const handleFormChange = (event, index) => {
    /*let data = [...stages];
    data[index] = { etapa: data[index], duracao: event.target.value };
    setStages(data);*/

    let data = [...periods];
    data[index] = event.target.value;
    setPeriods(data);
  };

  async function register(e) {
    e.preventDefault();

    try {
      if (registro && flow) {
        let sequences = flow.sequences;
        let stagesAndPeriods = [];
        const config = authConfig();

        for (let i = 0; i < flow.stages.length; i++)
          stagesAndPeriods.push({ etapa: flow.stages[i], duracao: periods[i] });
        await api.post(
          '/newProcess',
          {
            registro,
            apelido,
            etapaAtual: sequences[0].from,
            arquivado: false,
            etapas: stagesAndPeriods,
            fluxoId: flow._id
          },
          config
        );
      } else {
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
      <Form onSubmit={register}>
        <FormElement>
          <label>Número de Registro</label>
          <input
            name="registro"
            value={registro}
            onChange={(event) => setRegistro(event.target.value)}
            placeholder={'registro'}
          />
        </FormElement>

        <FormElement>
          <label>Apelido (Opcional)</label>
          <input
            name="apelido"
            value={apelido}
            onChange={(event) => setApelido(event.target.value)}
            placeholder={'apelido'}
          />
        </FormElement>
        {flow.stages.map((stage, idx) => {
          return (
            <FormElement key={idx}>
              <label>Etapa {`${stage.etapa}`}</label>
              <input
                name="duracao"
                onChange={(event) => handleFormChange(event, idx)}
                placeholder={'duração (dias)'}
              />
            </FormElement>
          );
        })}
      </Form>

      <Button onClick={register} background="#1b9454">
        <span> Registrar Processo </span>
      </Button>
    </Container>
  );
}

export default RegisterProcess;
