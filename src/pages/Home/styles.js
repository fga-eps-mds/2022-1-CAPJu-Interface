import styled from 'styled-components';
import { PlusCircleFill } from '@styled-icons/bootstrap/PlusCircleFill';

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
