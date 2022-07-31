import axios from 'axios';
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
  ContentHeader
} from './styles';
import { DeleteForever } from '@styled-icons/material';
import Dropdown from 'react-dropdown';
import FlowViewer from 'components/FlowViewer';

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

  useEffect(() => {
    updateStages();
    updateFlows();
  }, []);

  async function updateFlows() {
    const response = await axios.get('http://localhost:3333/flows');
    console.log(response);
    setFlows(response.data.Flows);
  }

  async function updateStages() {
    const response = await axios.get('http://localhost:3333/stages');
    console.log(response);
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
      const response = await axios.post('http://localhost:3333/newFlow', {
        ...newFlow
      });
      responseHandler(
        response,
        'Fluxo Adicionado com sucesso',
        'Erro ao adicionar fluxo'
      );
    } catch (e) {
      console.log(e);
      toast.error('Erro ao adicionar fluxo');
    }
  }

  async function deleteFlow(id) {
    try {
      const response = await axios.post('http://localhost:3333/deleteFlow', {
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
      delete newFlow.createdAt;
      delete newFlow.__v;

      const response = await axios.put('http://localhost:3333/editFlow', {
        _id: id,
        ...newFlow
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
          {flows.map((stage, index) => {
            return (
              <FlowItem
                key={index}
                onClick={() => {
                  setShowFlow(index);
                  setNewFlow(flows[index]);
                }}
              >
                {stage.name}{' '}
                <DeleteForever
                  size={30}
                  onClick={() => {
                    deleteFlow(stage._id);
                  }}
                />
              </FlowItem>
            );
          })}
        </FlowsArea>
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
