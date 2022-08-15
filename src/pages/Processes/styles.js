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

  div.processSearch {
    padding: 30px;
    width: 100vh;
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
    color: #fbe304;
  }

  svg.delete-process {
    color: #de5353;
  }

  a.add-button {
    padding: 0px;
    min-width: 20px;
    border-radius: 50%;
    align-self: end;
    margin-right: 2em;
    background-color: #304974;
  }

  a.add-button svg {
    color: #f1f1f1;
  }
`;
export const InputSearch = styled.input`
  background-color: rgba(0, 0, 0, 0.1);
  border: solid #888 2px;
  padding: 15px;
  max-width: 80vh;
  width: 100%;
  color: black;
  border-radius: 10px;
  font-size: 15px;
  box-sizing: border-box;

  :focus {
    outline: none;
    background-color: rgba(0, 0, 0, 0);
  }
`;
