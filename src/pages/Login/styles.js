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
  gap: 20px;
`;

export const MenuElement = styled.div.attrs((props) => ({
  selected: props.selected
}))`
  margin: 10px;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;

  border-bottom: ${(props) =>
    props.selected ? '3px solid lightblue' : '1px solid black'};
`;

export const Modal = styled.div`
  position: absolute;
  backdrop-filter: blur(5px);
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ForgotPassword = styled.h6`
  cursor: pointer;
  text-decoration: underline;
`;
export const Criterios = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
`;
export const EditDrop = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px;
`;
