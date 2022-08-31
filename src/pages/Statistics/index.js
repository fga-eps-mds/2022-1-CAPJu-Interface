import api from '../../services/api';
import React from 'react';
import { useEffect, useState } from 'react';
import { Container, StagesArea, StageItem } from './styles';
import { useLocation } from 'react-router-dom';
import Stages from 'pages/Stages';

function Statistics() {
  const [stages, setStages] = useState([]);
  const [processes, setProcesses] = useState([]);
  const location = useLocation();
  const flow = location.state;

  useEffect(() => {
    updateStats();
  }, []);

  async function updateStats() {
    console.log(flow);
    const stagesFlow = flow.stages;

    const response = await api.get('/stages');
    const flowprocess = await api.get(`/processes/${flow ? flow._id : ''}`);
    setProcesses(flowprocess.data.processes);
    console.log(flowprocess);
    const stagesResponse = response.data.Stages;
    const targetStages = [];
    for (let stage of stagesResponse) {
      delete stage.createdAt;
      delete stage.__v;
      delete stage.updatedAt;
      delete stage.deleted;
      for (let stageFlow of stagesFlow) {
        if (stage._id === stageFlow) {
          targetStages.push(stage);
          continue;
        }
      }
    }
    setStages(targetStages);
  }
  return (
    <>
      <Container>
        Estatística de fluxo
        <StagesArea>
          {stages.map((stage, index) => {
            return (
              <StageItem key={index}>
                {'Nome da Etapa: '}
                {stage.name}
                <br></br>
              </StageItem>
            );
          })}
        </StagesArea>
      </Container>
    </>
  );
}

export default Statistics;
