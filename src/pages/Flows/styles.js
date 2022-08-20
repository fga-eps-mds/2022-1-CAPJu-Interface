import styled from 'styled-components';
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline';

export const Container = styled.div`
  width: 100%;
  color: black;
  display: flex;
  align-items: center;
  font-size: 64px;

  flex-direction: column;
  margin: 0px 100px;
`;

export const AddFlowButton = styled.button`
  bottom: 30px;
  right: 30px;
  position: absolute;
  padding: 10px 15px;
  background-color: #304974;
  color: white;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  border: none;
  border-radius: 20px;
`;

export const FlowsArea = styled.div`
  padding: 100px;
  width: 100%;
  color: black;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 30px;
  flex-direction: row;
`;

export const FlowItem = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100px;
  max-height: 100px;
  background-color: #1b9454;
  color: white;
  padding: 20px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;

  svg.see-processes {
    color: #f1f1f1;
    font-size: 5vh;
    cursor: pointer;
    margin-bottom: 5px;
  }
  svg.see-edit {
    color: #f1f1f1;
    font-size: 5vh;
    cursor: pointer;
  }
  svg.see-delete {
    color: #f1f1f1;
    font-size: 5vh;
    cursor: pointer;
  }
  span.title-flow {
    font-size: 24px;
    font-weight: 900;
    margin-bottom: 5%;
  }
`;

export const Modal = styled.div`
  position: absolute;
  backdrop-filter: blur(5px);
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalDelete = styled.div`
  position: absolute;
  backdrop-filter: blur(5px);
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: row;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.1);
`;

export const ContentDelete = styled.div`
  display: flex;
  background-color: white;
  min-width: 600px;
  height: 28vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 24px;
  border-radius: 10px;
  gap: 25px;
  font-weight: bold;

  div.closeModal {
    display: flex;
    flex-direction: row-reverse;
    min-width: 600px;
    height: 28vh;
  }
  div.buttonDelete {
    margin-bottom: 5%;
  }
`;

export const Content = styled.div`
  display: flex;
  background-color: white;
  min-width: 800px;
  height: 90vh;
  justify-content: space-between;
  align-items: center;
  /* padding: 20px; */
  flex-direction: column;
  gap: 10px;
  font-size: 20px;
  border-radius: 10px;
  overflow-x: scroll;
`;

export const SelectorWrapper = styled.div`
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  flex-direction: row;
  gap: 10px;
  font-size: 20px;
  border-radius: 20px;
`;

export const StageName = styled.div`
  background-color: #fbe304;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  gap: 10px;
  font-size: 20px;
  border-radius: 20px;
`;

export const StagesWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  flex-direction: row;
  gap: 10px;
  font-size: 20px;
  border-radius: 20px;
`;

export const SequencesWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  flex-direction: column;
  gap: 10px;
  font-size: 20px;
  border-radius: 20px;
`;

export const SequenceItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  flex-direction: row;
  gap: 10px;
  font-size: 20px;
  border-radius: 20px;
`;

export const ContentHeader = styled.div`
  display: flex;
  background-color: #7a7b4f;
  min-width: 800px;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  font-size: 32px;
  height: 15vh;
  width: 100%;
  h3 {
    color: #f1f1f1;
  }
`;

export const CloseModalDelete = styled(CloseOutline)`
  color: #de5353;
  height: 5vh;
  width: 5vh;
  min-widht: 30px;
  min-height: 30px;
  cursor: pointer;
  margin-right: 1%;
  margin-top: 3%;
`;

export const CloseModalGeneral = styled(CloseOutline)`
  color: #de5353;
  height: 5vh;
  width: 5vh;
  cursor: pointer;
  margin-left: 93%;
  min-widht: 40px;
  min-height: 45px;
`;

export const FlowsButtons = styled.div`
  display: flex;
  flex-direction: rows;
  min-width: 100px;
  color: white;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
