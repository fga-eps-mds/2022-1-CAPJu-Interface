import Button from 'components/Button';
import React from 'react';
import { Container, MenuItem } from './styles';
import { Flow } from '@styled-icons/fluentui-system-regular';

function SideBar() {
  return (
    <Container>
      <a href={'/'}>
        <img src={'./logo.png'} />
      </a>
      <MenuItem>
        <Flow></Flow>Etapas
      </MenuItem>
      <a href={'/Login'}>Login</a>
      <Button background="#DE5353">Sair</Button>
    </Container>
  );
}

export default SideBar;
