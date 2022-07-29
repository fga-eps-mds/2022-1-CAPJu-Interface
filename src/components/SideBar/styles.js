import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 300px;
  background-color: #f1f1f1;
  color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 40px;
  padding: 0 30px;
  box-sizing: border-box;

  flex-direction: column;

  a {
    text-decoration: none;
    color: black;
  }
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  flex-direction: column;

  a {
    text-decoration: none;
    color: black;
  }
`;
