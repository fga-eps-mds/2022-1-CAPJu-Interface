import api from '../../services/api';
import React from 'react';
import { useEffect, useState } from 'react';
import { Container, StagesArea, StageItem } from './styles';
import { useLocation } from 'react-router-dom';

function Statistics() {
  const [stages, setStages] = useState([{ name: '', time: '', _id: '' }]);
  const [processes, setProcesses] = useState([]);
  const location = useLocation();
  const stagesFlow = location.state;

  useEffect(() => {
    updateStats();
  }, []);

  async function updateStats() {
    console.log(stagesFlow);
    const response = await api.get('/stages');
    // for (let i = 0; i < Object.keys(stagesFlow).length; i++) {
    //   const currentStage = await response.data.Stages.find(stagesFlow[i]);
    // }
    const flowprocess = await api.get(
      `/processes/${stagesFlow ? stagesFlow._id : ''}`
    );
    console.log(flowprocess.data.processes);

    setProcesses(flowprocess.data.processes);
    setStages(response.data.Stages);
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
