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
  FlowsButtons
} from './styles';
import Dropdown from 'react-dropdown';
import FlowViewer from 'components/FlowViewer';
import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { DeleteForever } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';

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
        <span>Fluxos</span>
        <FlowsArea>
          {flows.map((flow, index) => {
            return (
              <FlowItem key={index}>
                <span className="title-flow">{flow.name}</span>
                <FlowsButtons>
                  <Tooltip title="visualizar processos">
                    <Link to="/processes" state={flow}>
                      <DescriptionIcon className="see-processes" />
                    </Link>
                  </Tooltip>
                  <Tooltip title="editar fluxo">
                    <EditIcon
                      className="see-edit"
                      onClick={() => {
                        setShowFlow(index);
                        setNewFlow(flows[index]);
                      }}
                    ></EditIcon>
                  </Tooltip>
                  <Tooltip title="deletar fluxo">
                    <DeleteForever
                      className="see-delete"
                      onClick={() => {
                        setDeleteModal(true);
                        setShowFlow(-1);
                      }}
                    ></DeleteForever>
                  </Tooltip>
                </FlowsButtons>
              </FlowItem>
            );
          })}
        </FlowsArea>
        <AddFlowButton
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <span>+ Adicionar Fluxo</span>
        </AddFlowButton>
        {/* {Modal para confirmar exclusão do fluxo} */}
        {deleteModal && (
          <>
            {flows.map((flow, index) => {
              return (
                <ModalDelete key={index}>
                  <ContentDelete>
                    <div className="closeModal">
                      <CloseModalDelete
                        onClick={() => {
                          setDeleteModal(false);
                        }}
                      ></CloseModalDelete>
                    </div>
                    <span>Deseja realmente excluir este Fluxo?</span>
                    <div className="buttonDelete">
                      <Button
                        onClick={() => {
                          deleteFlow(flow._id);
                          setDeleteModal(false);
                        }}
                        background="#de5353"
                      >
                        <span>Excluir</span>
                      </Button>
                    </div>
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
                  <h3>Editar fluxo</h3>
                </ContentHeader>
                <span>Nome</span>
                <TextInput set={updateFlowName} value={newFlow.name} />
                <label>
                  <span>Etapas</span>
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
                  <span>Salvar</span>
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
                  <span>Cancelar</span>
                </Button>
              </Content>
            </Modal>
          </>
        )}
      </Container>
      {isModalOpen && (
        <Modal>
          <Content>
            <ContentHeader>
              <h3>Novo Fluxo</h3>
            </ContentHeader>
            <TextInput
              placeholder={'Nome do fluxo'}
              set={updateFlowName}
              value={newFlow.name}
            ></TextInput>
            <span>Etapas</span>
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
                    <span>Adicionar</span>
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
              <span>Salvar</span>
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
              <span>Cancelar</span>
            </Button>
          </Content>
        </Modal>
      )}
    </>
  );
}

export default Flows;
