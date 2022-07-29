import Button from 'components/Button';
import React from 'react';
import { Container } from './styles';

function SideBar() {
  return (
    <Container>
      <a href={'/'}>
        <img src={'./logo.png'} />
      </a>

      <a href={'/Login'}>Login</a>
      <Button background="#DE5353">Sair</Button>
    </Container>
  );
}

export default SideBar;
