import Button from 'components/Button';
import React from 'react';
import { Container, MenuItem } from './styles';
import { Flow } from '@styled-icons/fluentui-system-regular';
import { FlowCascade } from '@styled-icons/entypo';

function SideBar() {
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
      <Button
        background="#DE5353"
        onClick={() => {
          localStorage.removeItem('user');
        }}
      >
        Sair
      </Button>
    </Container>
  );
}

export default SideBar;
