import Button from 'components/Button';
import React from 'react';
import { Container, MenuItem } from './styles';
import { Flow } from '@styled-icons/fluentui-system-regular';
import { FlowCascade } from '@styled-icons/entypo';
import { ClipboardTaskListLtr } from '@styled-icons/fluentui-system-regular/ClipboardTaskListLtr';

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
      <MenuItem href={'/processes'}>
        <ClipboardTaskListLtr></ClipboardTaskListLtr>Processos
      </MenuItem>
      <Button background="#DE5353">Sair</Button>
    </Container>
  );
}

export default SideBar;
