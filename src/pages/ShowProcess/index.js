import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Container, FlowWrapper } from './styles';
import Button from '../../components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Modal from 'react-modal';
import toast from 'react-hot-toast';
import FlowViewer from 'components/FlowViewer';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0px'
  }
};

const flowStyle = {
  zIndex: '0'
};

const headerStyle = {
  backgroundColor: '#7A7B4F',
  color: '#f1f1f1',
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%'
};

const titleStyle = {
  marginRight: 'auto',
  marginLeft: 'auto'
};

const bodyStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px'
};

const textAreaStyle = {
  minHeight: '200px',
  minWidth: '400px'
};

const btnStyle = {
  color: '#f1f1f1',
  backgroundColor: '#304974',
  borderRadius: '20px',
  padding: '10px 15px',
  fontWeight: 'bold',
  marginTop: '20px'
};

const btnContainer = {
  display: 'flex',
  justifyContent: 'end'
};

const closeBtnStyle = {
  color: '#f1f1f1',
  backgroundColor: 'transparent',
  border: 'none',
  fontWeight: 'bold',
  fontSize: '1em',
  alignSelf: 'self-end'
};

function ShowProcess() {
  const [process, setProcesses] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [observation, setObservation] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [stages, setStages] = useState([]);
  const [flow, setFlow] = useState({ stages: [], sequences: [] });

  const proc = location.state;
  console.log(proc);

  useEffect(() => {
    fetchStages();
    fetchFlow();
  }, []);

  async function updateProcesses() {
    const response = await api.get('/showProcess');
    console.log(response);
    setProcesses(response.data.process);
  }

  function openModal() {
    setModalIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  async function fetchFlow() {
    let response = await api.get('/flows');
    let flows = response.data.Flows;

    let flowTarget = {};
    for (let idx in flows) {
      if (flows[idx]._id == proc.fluxoId) {
        flowTarget = flows[idx];
        break;
      }
    }
    setFlow(flowTarget);
  }

  async function fetchStages() {
    let response = await api.get('/stages');
    setStages(response.data.Stages);
  }

  async function nextStage() {
    try {
      let { etapas } = proc;

      for (let idx in etapas) {
        if (etapas[idx].etapa == proc.etapaAtual)
          etapas[idx]['observacoes'] = observation;
      }

      let response = await api.get('/flows');
      let flows = response.data.Flows;

      let flowSequences = [];
      for (let idx in flows) {
        if (flows[idx]._id == proc.fluxoId) {
          flowSequences = flows[idx].sequences;
          break;
        }
      }

      let stageTo = '';
      for (let idx in flowSequences) {
        if (flowSequences[idx].from == proc.etapaAtual) {
          stageTo = flowSequences[idx].to;
          break;
        }
      }

      console.log(flows);

      proc.etapaAtual = stageTo;
      proc.etapas = etapas;

      delete proc._id;
      delete proc.createdAt;
      delete proc.updatedAt;
      delete proc.__v;

      let data = await api.put(`/updateProcess/${proc._id}`, proc);

      console.log(proc);

      closeModal();

      toast.success('Etapa avançada!', { duration: 4000 });
    } catch (error) {
      toast.error('Erro ao avançar etapa \n ' + error.response.data.message, {
        duration: 3000
      });
    }
  }

  return (
    <>
      <Container>
        <div className="processInfo">
          <h1>
            {proc.apelido.length > 0
              ? proc.apelido
              : `Processo ${proc.registro}`}
          </h1>
          <div className="process">
            {proc.apelido.length > 0
              ? `${proc.registro} - ${proc.apelido}`
              : `${proc.registro}`}
          </div>
        </div>
        <FlowWrapper style={flowStyle}>
          <FlowViewer
            stages={stages}
            flow={flow}
            highlight={proc.etapaAtual}
          ></FlowViewer>
        </FlowWrapper>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal-header" style={headerStyle}>
            <strong id="modal-title" style={titleStyle}>
              Avançar etapa
            </strong>
            <button onClick={closeModal} style={closeBtnStyle}>
              X
            </button>
          </div>
          <div className="modal-body" style={bodyStyle}>
            <textarea
              className="observation-field"
              placeholder="Observações sobre a etapa atual..."
              style={textAreaStyle}
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
            ></textarea>
            <button style={btnStyle} onClick={nextStage}>
              Avançar
            </button>
          </div>
        </Modal>
        <Button onClick={(e) => openModal()}>
          <SkipNextIcon />
          <span>Avançar etapa</span>
        </Button>
      </Container>
    </>
  );
}

export default ShowProcess;
