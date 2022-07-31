import styled from 'styled-components';
import { PlusCircleFill } from '@styled-icons/bootstrap/PlusCircleFill';
import { Trash } from '@styled-icons/boxicons-solid/Trash';

export const Container = styled.div`
  width: 100%;
  color: black;
  display: flex;
  align-items: center;
  font-size: 20px;

  flex-direction: column;
  gap: 20px;
`;

export const AddCircle = styled(PlusCircleFill)`
  color: #304974;
  position: absolute;
  right: 20px;
  bottom: 20px;
  cursor: pointer;
`;

export const AddTrash = styled(Trash)`
  color: red;
  cursor: pointer;
`;
export const Processo = styled.div`
  background-color: #1b9454;
  color: white;
  border-radius: 25px;
  padding: 15px 35px;
  width: 925px;
  display: flex;
  justify-content: space-between;
  font-weight: 900;
`;
