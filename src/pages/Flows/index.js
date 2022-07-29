import axios from 'axios';
import Button from 'components/Button';
import TextInput from 'components/TextInput';
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
  StagesWrapper,
  SequencesWrapper,
  SequenceItem
} from './styles';
import { DeleteForever } from '@styled-icons/material';
import Dropdown from 'react-dropdown';

function Flows() {
  const [flows, setFlows] = useState([{ name: 'flow 1' }, { name: 'flow 2' }]);
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

  async function addFlow() {
    try {
      const response = await axios.post('http://localhost:3333/newFlow', {
        ...newFlow
      });
      if (response.status == 200) {
        toast.success('Fluxo Adicionado com sucesso');
        updateFlows();
      } else {
        toast.error('Erro ao adicionar fluxo');
      }
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
      if (response.status == 200) {
        toast.success('Fluxo Deletada com sucesso');
        updateFlows();
      } else {
        toast.error('Erro ao deletar fluxo');
      }
    } catch (e) {
      console.log(e);
      toast.error('Erro ao remover fluxo');
    }
  }

  function updateFlowName(newName) {
    let tmp = { ...newFlow };
    tmp.name = newName;
    setNewFlow(tmp);
  }

  function addStage() {
    let tmp = { ...newFlow };
    tmp.stages.push(selectedStage);
    setNewFlow(tmp);
  }

  function addSequence() {
    let tmp = { ...newFlow };
    tmp.sequences.push({ from, to });
    setNewFlow(tmp);
  }

  console.log('newFlow', newFlow);

  const allOptions = stages.map((stage, idx) => {
    return { label: <>{stage.name}</>, value: stage._id };
  });

  const selectedOptions = stages
    .filter((stage) => {
      return newFlow.stages.includes(stage._id);
    })
    .map((stage, idx) => {
      return { label: <>{stage.name}</>, value: stage._id };
    });

  return (
    <>
      <Container>
        Fluxos
        <FlowsArea>
          {flows.map((stage, index) => {
            return (
              <FlowItem key={index}>
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
            <SelectorWrapper>
              <Dropdown
                options={allOptions}
                onChange={(e) => {
                  setSelectedStage(e.value);
                }}
                value={selectedStage}
                placeholder="Selecione a etapa"
                className="dropdown"
                controlClassName="dropdown-control"
                placeholderClassName="dropdown-placeholder"
                menuClassName="dropdown-menu"
                arrowClassName="dropdown-arrow"
              />
              <div
                onClick={() => {
                  addStage();
                }}
              >
                Adicionar
              </div>
            </SelectorWrapper>
            <StagesWrapper>
              {newFlow.stages.map((flowStage) => {
                return (
                  <>
                    <StageName>
                      {
                        stages.find((stage) => {
                          console.log(
                            flowStage,
                            stage._id,
                            flowStage == stage._id
                          );
                          return flowStage == stage._id;
                        }).name
                      }
                    </StageName>
                  </>
                );
              })}
            </StagesWrapper>
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
