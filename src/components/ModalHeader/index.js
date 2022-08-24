import { Container, Xbutton, Title } from './styles.js';
import PropTypes from 'prop-types';
import React from 'react';

function ModalHeader(props) {
  return (
    <Container className="modal-header">
      <Title id="modal-title">{props.children}</Title>
      <Xbutton onClick={props.close}>X</Xbutton>
    </Container>
  );
}

ModalHeader.propTypes = {
  children: PropTypes.string,
  close: PropTypes.func
};

export default ModalHeader;
