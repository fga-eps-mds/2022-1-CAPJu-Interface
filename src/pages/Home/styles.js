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
  justify-content: space-between;

  div.processes {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  
  div.process {
    background-color: #1b9454;
    border-radius: 10px;
    padding: 5px;
    color: #f1f1f1;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  div.process > :first-child {
    margin-left: 0.5em;
  }

  svg.see-process {
    color: #304974;
  }

  svg.edit-process {
    color: #FBE304;
  }

  svg.delete-process {
    color: #DE5353;
  }

  button {
    padding: 0px;
    min-width: 20px;
    border-radius: 50%;
    align-self: end;
    margin-right: 2em;
  }
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
export const AddProcesso = styled.div`
  background-color: #1b9454;
  color: white;
  border-radius: 25px;
  padding: 15px 35px;
  width: 925px;
  display: flex;
  justify-content: space-between;
  font-weight: 900;
`;
