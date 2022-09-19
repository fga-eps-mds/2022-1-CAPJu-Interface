import styled from 'styled-components';
import { UserCircle } from '@styled-icons/boxicons-regular/';

export const Container = styled.div`
  width: 100%;
  color: black;
  display: flex;
  align-items: center;
  font-size: 64px;

  flex-direction: column;
  margin: 0px 100px;
`;

export const ContainerTitle = styled.div`
  display: flex;
  flex-direction: row;
  gap: 25px;
  font-size: 20px;
  align-items: center;
  width: 100%;
  justify-content: center;
`;

export const ContainerMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  font-size: 20px;
  align-items: center;
  width: 100%;
  justify-content: center;
  margin: 100px 0px;
`;

export const UserIcon = styled(UserCircle)`
  color: #304974;
  width: 5%;
`;
export const Criterios = styled.div`
  position: relative;
  font-size: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: center;
`;
