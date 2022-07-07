import styled from 'styled-components';

export const Container = styled.div`
  height: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  width: 100%;
  color: #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  padding: 0 30px;
  box-sizing: border-box;

  flex-direction: row;

  a {
    text-decoration: none;
    color: #eee;
  }
`;
