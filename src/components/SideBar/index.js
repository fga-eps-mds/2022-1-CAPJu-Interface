import Button from 'components/Button';
import React from 'react';
import { Container, MenuItem, Menu, LogoutButton } from './styles';
import { Flow } from '@styled-icons/fluentui-system-regular';
import { FlowCascade } from '@styled-icons/entypo';
import { ClipboardTaskListLtr } from '@styled-icons/fluentui-system-regular/ClipboardTaskListLtr';
import { useNavigate } from 'react-router-dom';
import { UserCircle } from '@styled-icons/boxicons-regular/';
import { Profile } from '@styled-icons/icomoon';

function SideBar() {
  const navigate = useNavigate();
  return (
    <Container>
      <a href={'/'}>
        <img src={'./logo.png'} />
      </a>
      <Menu>
        <hr />
        <MenuItem href={'/Login'}>
          <Profile size={35} />
          Login
        </MenuItem>
        <hr />

        <MenuItem href={'/stages'}>
          <Flow size={35} />
          Etapas
        </MenuItem>
        <hr />

        <MenuItem href={'/'}>
          <FlowCascade size={35} />
          Fluxos
        </MenuItem>
        <hr />

        <MenuItem
          href=""
          onClick={() =>
            navigate('/processes', { state: undefined, replace: false })
          }
        >
          <ClipboardTaskListLtr size={35} />
          Processos
        </MenuItem>
        <hr />
        <MenuItem
          href=""
          onClick={() =>
            navigate('/editAccount', { state: undefined, replace: false })
          }
        >
          <UserCircle size={35} />
          Editar Conta
        </MenuItem>
        <hr />
      </Menu>
      <LogoutButton>
        <Button
          background="#DE5353"
          onClick={() => {
            localStorage.removeItem('user');
            navigate('Login');
          }}
        >
          Sair
        </Button>
      </LogoutButton>
    </Container>
  );
}

export default SideBar;
