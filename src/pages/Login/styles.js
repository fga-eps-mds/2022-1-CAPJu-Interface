import styled from 'styled-components';

export const Container = styled.div`
  padding-top: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 20px;

  flex-direction: column;
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: row;
  h2 {
    width: 100px;
    margin: 10px;
    text-align: center;
  }
`;
export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 100%;
  height: 300%;
  border: solid 1px;
  border-radius: 20px;
`;
