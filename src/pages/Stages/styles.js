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

export const AddStageButton = styled.button`
  bottom: 30px;
  left: 30px;
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

export const StagesArea = styled.div`
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

export const StageItem = styled.div`
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

export const Content = styled.div`
  display: flex;
  background-color: white;
  width: 400px;
  height: 400px;
  justify-content: center;
  align-items: center;
  padding: 20px;
  flex-direction: column;
  gap: 25px;
  font-size: 20px;
  border-radius: 10px;
`;
