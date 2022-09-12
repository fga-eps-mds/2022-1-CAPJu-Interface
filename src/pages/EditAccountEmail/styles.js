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

export const ContainerMenu = styled.div`
  display: flex;
  flex-direction: row;
  gap: 100px;
`;

export const UserIcon = styled(UserCircle)`
  color: #304974;
`;
