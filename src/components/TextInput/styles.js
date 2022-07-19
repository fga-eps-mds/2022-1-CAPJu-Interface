import styled from 'styled-components';

export const Input = styled.input`
  background-color: rgba(0, 0, 0, 0.5);
  border: solid #888 2px;
  padding: 15px;
  max-width: 200px;
  width: 100%;
  color: white;
  border-radius: 10px;
  font-size: 15px;
  box-sizing: border-box;

  :focus {
    outline: none;
    background-color: rgba(0, 0, 0, 0.8);
  }
`;
