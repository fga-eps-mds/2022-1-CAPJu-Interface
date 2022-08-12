import styled from 'styled-components';

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
  flex-direction: row;
  min-width: 100px;
  background-color: #1b9454;
  color: white;
  padding: 20px;
  font-size: 20px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;

  svg.see-processes {
    color: #f1f1f1;
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
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: row;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ContentDelete = styled.div`
  display: flex;
  background-color: #f1f1f1;
  min-width: 800px;
  height: 50vh;
  justify-content: center;
  align-items: center;
  margin-top: 210px;
  flex-direction: column;
  gap: 10px;
  font-size: 20px;
  border-radius: 10px;
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
  height: 10vh;
  width: 100%;
  h2 {
    color: #f1f1f1;
  }
`;
