import api from '../../services/api';
import Button from 'components/Button';
import TextInput from 'components/TextInput';
import { StagesInFlow } from 'components/StagesInFlow';
import { AddStageInFlow } from 'components/AddStageInFlow';
import React from 'react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  Container,
  AddFlowButton,
  FlowsArea,
  FlowItem,
  Modal,
  Content,
  SelectorWrapper,
  StageName,
  SequencesWrapper,
  SequenceItem,
  ContentHeader,
  ModalDelete,
  ContentDelete,
  CloseModalDelete,
  DeleteButton
} from './styles';
import Dropdown from 'react-dropdown';
import FlowViewer from 'components/FlowViewer';
import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

function Flows() {
  const [flows, setFlows] = useState([]);
  const [selectedStage, setSelectedStage] = useState('1');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [stages, setStages] = useState([]);
  const [newFlow, setNewFlow] = useState({
    name: '',
    stages: [],
    sequences: []
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [showFlow, setShowFlow] = useState(-1);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    updateStages();
    updateFlows();
  }, []);

  async function updateFlows() {
    const response = await api.get('/flows');
    setFlows(response.data.Flows);
  }

  async function updateStages() {
    const response = await api.get('/stages');
    setStages(response.data.Stages);
    setSelectedStage(response.data.Stages[0]?._id);
  }

  function responseHandler(response, successMsg, errorMsg) {
    if (response.status == 200) {
      toast.success(successMsg);
      updateFlows();
    } else {
      toast.error(errorMsg);
    }
  }

  async function addFlow() {
    try {
      const response = await api.post('/newFlow', {
        ...newFlow
      });
      responseHandler(
        response,
        'Fluxo Adicionado com sucesso',
        'Erro ao adicionar fluxo'
      );
    } catch (e) {
      toast.error('Erro ao adicionar fluxo');
    }
  }

  async function deleteFlow(id) {
    try {
      const response = await api.post('/deleteFlow', {
        flowId: id
      });
      responseHandler(
        response,
        'Fluxo Deletada com sucesso',
        'Erro ao deletar fluxo'
      );
    } catch (e) {
      console.log(e);
      toast.error('Erro ao remover fluxo');
    }
  }

  async function editFlow(id) {
    try {
      let editedFlow = { ...newFlow };

      let newSequences = editedFlow.sequences.filter((sequence) => {
        if (
          editedFlow.stages.includes(sequence.from) &&
          editedFlow.stages.includes(sequence.to)
        ) {
          return true;
        }

        return false;
      });

      editedFlow.sequences = newSequences;
      delete editedFlow.createdAt;
      delete editedFlow.updatedAt;
      delete editedFlow.__v;

      console.log('edited', editedFlow);

      const response = await api.put('/editFlow', {
        _id: id,
        ...editedFlow
      });
      responseHandler(
        response,
        'Fluxo Editado com sucesso',
        'Erro ao Editar fluxo'
      );
    } catch (e) {
      console.log(e);
      toast.error('Erro ao Editar fluxo');
    }
  }

  function updateFlowName(newName) {
    let tmp = { ...newFlow };
    tmp.name = newName;
    setNewFlow(tmp);
  }

  function addStage(flow) {
    let tmp = { ...flow };
    tmp.stages.push(selectedStage);
    setNewFlow(tmp);
  }

  function addSequence() {
    let tmp = { ...newFlow };
    tmp.sequences.push({ from, to });
    setNewFlow(tmp);
  }

  const allOptions = stages.map((stage) => {
    return { label: <>{stage.name}</>, value: stage._id };
  });

  const selectedOptions = stages
    .filter((stage) => {
      return newFlow.stages.includes(stage._id);
    })
    .map((stage) => {
      return { label: <>{stage.name}</>, value: stage._id };
    });

  return (
    <>
      <Container>
        Fluxos
        <FlowsArea>
          {flows.map((flow, index) => {
            return (
              <FlowItem key={index}>
                {flow.name}{' '}
                <Link to="/processes" state={flow}>
                  <DescriptionIcon className="see-processes" />
                </Link>
                <EditIcon
                  onClick={() => {
                    setShowFlow(index);
                    setNewFlow(flows[index]);
                  }}
                ></EditIcon>
                <DeleteButton
                  size={30}
                  onClick={() => {
                    setDeleteModal(true);
                    setShowFlow(-1);
                    // deleteFlow(flow._id);
                  }}
                ></DeleteButton>
              </FlowItem>
            );
          })}
        </FlowsArea>
        {/* {Modal para confirmar exclusão do fluxo} */}
        {deleteModal && (
          <>
            {flows.map((flow, index) => {
              return (
                <ModalDelete key={index}>
                  <ContentDelete>
                    <CloseModalDelete
                      onClick={() => {
                        setDeleteModal(false);
                      }}
                    ></CloseModalDelete>
                    <strong>Deseja excluir o fluxo : {flow.name}</strong>
                    <Button
                      onClick={() => {
                        deleteFlow(flow._id);
                        setDeleteModal(false);
                      }}
                    >
                      Excluir
                    </Button>
                  </ContentDelete>
                </ModalDelete>
              );
            })}
          </>
        )}
        {/* Modal de editar fluxo */}
        {showFlow != -1 && (
          <>
            <Modal>
              <Content>
                <ContentHeader>
                  <h2>Editar fluxo</h2>
                </ContentHeader>
                Nome
                <TextInput set={updateFlowName} value={newFlow.name} />
                <label>
                  Etapas
                  <AddStageInFlow
                    selectedStage={selectedStage}
                    setSelectedStage={setSelectedStage}
                    options={allOptions}
                    onClick={addStage}
                    flow={newFlow}
                  />
                </label>
                <StagesInFlow
                  flow={newFlow}
                  stages={stages}
                  setNewFlow={() => {
                    setNewFlow(newFlow);
                    updateFlows();
                  }}
                />
                <FlowViewer flow={newFlow} stages={stages || []}></FlowViewer>
                <Button
                  onClick={() => {
                    editFlow(showFlow);
                    setShowFlow(-1);
                  }}
                >
                  Salvar
                </Button>
                <Button
                  onClick={() => {
                    setShowFlow(-1);
                    setNewFlow({
                      name: '',
                      stages: [],
                      sequences: []
                    });
                  }}
                  background="#de5353"
                >
                  Cancelar
                </Button>
              </Content>
            </Modal>
          </>
        )}
        <AddFlowButton
          onClick={() => {
            setModalOpen(true);
          }}
        >
          + Adicionar Fluxo
        </AddFlowButton>
        <></>
      </Container>
      {isModalOpen && (
        <Modal>
          <Content>
            <h2>Novo Fluxo</h2>
            <TextInput
              placeholder={'Nome do fluxo'}
              set={updateFlowName}
              value={newFlow.name}
            ></TextInput>
            Etapas
            <AddStageInFlow
              selectedStage={selectedStage}
              setSelectedStage={setSelectedStage}
              options={allOptions}
              onClick={addStage}
              flow={newFlow}
            />
            <StagesInFlow
              flow={newFlow}
              stages={stages}
              setNewFlow={() => {
                setNewFlow(newFlow);
                updateFlows();
              }}
            />
            {newFlow.stages.length > 0 && (
              <>
                <>Sequências</>
                <SelectorWrapper>
                  <Dropdown
                    options={selectedOptions}
                    onChange={(e) => {
                      setFrom(e.value);
                    }}
                    value={from}
                    placeholder="Selecione a etapa"
                    className="dropdown"
                    controlClassName="dropdown-control"
                    placeholderClassName="dropdown-placeholder"
                    menuClassName="dropdown-menu"
                    arrowClassName="dropdown-arrow"
                  />
                  {'->'}
                  <Dropdown
                    options={selectedOptions}
                    onChange={(e) => {
                      setTo(e.value);
                    }}
                    value={to}
                    placeholder="Selecione a etapa"
                    className="dropdown"
                    controlClassName="dropdown-control"
                    placeholderClassName="dropdown-placeholder"
                    menuClassName="dropdown-menu"
                    arrowClassName="dropdown-arrow"
                  />
                  <div
                    onClick={() => {
                      addSequence();
                    }}
                  >
                    Adicionar
                  </div>
                </SelectorWrapper>
                <SequencesWrapper>
                  {newFlow.sequences.map((sequence, idx) => {
                    return (
                      <SequenceItem key={idx}>
                        <StageName>
                          {
                            stages.find((stage) => {
                              return sequence.from == stage._id;
                            }).name
                          }
                        </StageName>
                        {'->'}
                        <StageName>
                          {
                            stages.find((stage) => {
                              return sequence.to == stage._id;
                            }).name
                          }
                        </StageName>
                      </SequenceItem>
                    );
                  })}
                </SequencesWrapper>
              </>
            )}
            <Button
              onClick={() => {
                addFlow();
                setModalOpen(false);
              }}
            >
              Salvar
            </Button>
            <Button
              onClick={() => {
                setNewFlow({
                  name: '',
                  stages: [],
                  sequences: []
                });
                setModalOpen(false);
              }}
              background="#de5353"
            >
              Cancelar
            </Button>
          </Content>
        </Modal>
      )}
    </>
  );
}

export default Flows;
