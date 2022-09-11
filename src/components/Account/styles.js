import styled from 'styled-components';
import { UserCircle } from '@styled-icons/boxicons-regular/UserCircle';

export const User = styled(UserCircle)`
  color: #304974;
  position: absolute;
  top: 1%;
  right: 5%;
  height: 10%;
  width: 10%;
  .hover {
    color: red;
  }
`;
