import styled from 'styled-components';

export const Container = styled.button`
  background-color: rgba(0, 0, 0, 0.8);
  border: solid #888 2px;
  padding: 15px;
  max-width: 200px;
  width: 100%;
  color: white;
  border-radius: 10px;
  margin: 10px;

  :hover {
    background-color: rgba(255, 255, 255, 0.8);
    color: black;
    transition: 0.4s;
    border: solid black 2px;
  }
`;
