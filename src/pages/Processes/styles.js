import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  color: black;
  display: flex;
  align-items: center;
  font-size: 20px;
  flex-direction: column;
  gap: 20px;
  justify-content: space-between;
  overflow-y: scroll;

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
    cursor: pointer;
  }

  svg.edit-process {
    color: #fbe304;
    cursor: pointer;
  }

  svg.delete-process {
    color: #de5353;
    cursor: pointer;
  }

  a.add-button {
    position: absolute;
    left: 20px;
    bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background-color: #304974;
    cursor: pointer;
  }

  a.add-button svg {
    color: #f1f1f1;
  }
`;
