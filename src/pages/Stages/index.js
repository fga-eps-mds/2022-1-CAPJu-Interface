import api from '../../services/api';
import Button from 'components/Button';
import TextInput from 'components/TextInput';
import React from 'react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  Container,
  AddStageButton,
  StagesArea,
  StageItem,
  Modal,
  Content
} from './styles';
import { DeleteForever } from '@styled-icons/material';
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline';
import { CheckCircle } from '@styled-icons/material';
import AxiosError from 'axios/lib/core/AxiosError';

const closeBtn = {
  maxWidth: '40px'
};

function Stages() {
  const [stages, setStages] = useState([{ name: '', time: '' }]);
  const [stageName, setStageName] = useState('');
  const [stageTime, setStageTime] = useState('');
  const [currentStage, setCurrentStage] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalConfDelete, setModalConfDelete] = useState(false);

  useEffect(() => {
    updateStages();
  }, []);

  async function updateStages() {
    const response = await api.get('/stages');
    console.log(response.data.Stages);
    function compara(a, b) {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    }
    response.data.Stages.sort(compara);
    setStages(response.data.Stages);
  }

  async function addStage() {
    console.log(stageTime);
    try {
      const response = await api.post('/newStage', {
        name: stageName,
        time: stageTime
      });

      if (response.status == 200) {
        toast.success('Etapa Adicionada com sucesso');
        updateStages();
      } else {
        toast.error('Erro ao adicionar a etapa');
      }
    } catch (e) {
      if (e instanceof AxiosError) toast.error('Etapa já existe');
      else {
        console.log(e);
        toast.error('Erro ao adicionar a etapa');
      }
    }
  }

  async function deleteStage(id) {
    try {
      const response = await api.post('/deleteStage', {
        stageId: id
      });
      if (response.status == 200) {
        toast.success('Etapa Deletada com sucesso');
        updateStages();
      } else {
        toast.error('Erro ao deletar a etapa');
      }
    } catch (e) {
      console.log(e);
      toast.error('Erro ao remover a etapa');
    }
  }

  return (
    <>
      <Container>
        Etapas
        <StagesArea>
          {stages.map((stage, index) => {
            return (
              <StageItem key={index}>
                {'Nome da Etapa: '}
                {stage.name}
                <br></br>
                {'Duração em Dias: '}
                {stage.time} <br></br>
                <DeleteForever
                  size={30}
                  onClick={() => {
                    setModalConfDelete(true);
                    setCurrentStage(stage._id);
                  }}
                />
              </StageItem>
            );
          })}
        </StagesArea>
        <AddStageButton
          onClick={() => {
            setModalOpen(true);
          }}
        >
          + Adicionar Etapa
        </AddStageButton>
        <></>
      </Container>
      {isModalOpen && (
        <Modal>
          <Content>
            <CloseOutline
              style={closeBtn}
              onClick={() => {
                setModalOpen(false);
              }}
            ></CloseOutline>
            <h2>Nova Etapa</h2>
            <TextInput
              set={setStageName}
              value={stageName}
              placeholder="Nome da etapa"
            ></TextInput>
            <TextInput
              set={setStageTime}
              value={stageTime}
              placeholder="Duração (dias)"
            ></TextInput>
            <Button
              onClick={() => {
                addStage();
                setModalOpen(false);
              }}
            >
              Salvar
            </Button>
          </Content>
        </Modal>
      )}
      {isModalConfDelete && (
        <Modal>
          <Content>
            <h3>Deseja excluir esta etapa?</h3>
            <CheckCircle
              style={closeBtn}
              onClick={() => {
                deleteStage(currentStage);
                setModalConfDelete(false);
              }}
            ></CheckCircle>
            <CloseOutline
              style={closeBtn}
              onClick={() => {
                setModalConfDelete(false);
              }}
            ></CloseOutline>
          </Content>
        </Modal>
      )}
    </>
  );
}

export default Stages;
