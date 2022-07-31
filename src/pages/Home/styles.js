import styled from 'styled-components';
import { Pencil } from '@styled-icons/boxicons-solid/Pencil';

export const Container = styled.div`
  width: 100%;
  color: black;
  display: flex;
  align-items: center;
  font-size: 20px;

  flex-direction: column;
  gap: 20px;
`;

export const ProcessBar = styled.div`
  width: 965px;
  height: 62px;
  background: #1b9454;
  border-radius: 25px;
  color: #f1f1f1;
`;

export const PencilButton = styled(Pencil)`
  color: #fbe304;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;
