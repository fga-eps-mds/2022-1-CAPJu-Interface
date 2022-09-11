import Button from 'components/Button';
import React from 'react';
import { Container, MenuItem } from './styles';
import { Flow } from '@styled-icons/fluentui-system-regular';
import { FlowCascade } from '@styled-icons/entypo';
import { ClipboardTaskListLtr } from '@styled-icons/fluentui-system-regular/ClipboardTaskListLtr';
import { Profile } from '@styled-icons/icomoon';
import { useNavigate } from 'react-router-dom';
function SideBar() {
  const navigate = useNavigate();
  return (
    <Container>
      <a href={'/'}>
        <img src={'./logo.png'} />
      </a>
      <MenuItem href={'/Login'}>
        <Profile /> Login
      </MenuItem>
      <MenuItem href={'/stages'}>
        <Flow />
        1.Etapas
      </MenuItem>
      <MenuItem href={'/'}>
        <FlowCascade />
        2.Fluxos
      </MenuItem>
      <MenuItem
        href=""
        onClick={() =>
          navigate('/processes', { state: undefined, replace: false })
        }
      >
        <ClipboardTaskListLtr />
        3.Processos
      </MenuItem>
      <MenuItem href="" onClick={() => navigate('/editAccount')}>
        4.Editar Conta
      </MenuItem>
      <Button
        background="#DE5353"
        onClick={() => {
          localStorage.removeItem('user');
          navigate('Login');
        }}
      >
        Sair
      </Button>
    </Container>
  );
}

export default SideBar;
