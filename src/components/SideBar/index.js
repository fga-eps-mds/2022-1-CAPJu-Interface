import Button from 'components/Button';
import React from 'react';
import { Container, MenuItem } from './styles';
import { Flow } from '@styled-icons/fluentui-system-regular';
import { FlowCascade } from '@styled-icons/entypo';
import { ClipboardTaskListLtr } from '@styled-icons/fluentui-system-regular/ClipboardTaskListLtr';
import { useNavigate } from 'react-router-dom';
function SideBar() {
  const navigate = useNavigate();
  return (
    <Container>
      <a href={'/'}>
        <img src={'./logo.png'} />
      </a>
      <MenuItem href={'/stages'}>
        <Flow></Flow>Etapas
      </MenuItem>
      <MenuItem href={'/'}>
        <FlowCascade></FlowCascade>Fluxos
      </MenuItem>
      <MenuItem
        href=""
        onClick={() =>
          navigate('/processes', { state: undefined, replace: false })
        }
      >
        <ClipboardTaskListLtr></ClipboardTaskListLtr>Processos
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
