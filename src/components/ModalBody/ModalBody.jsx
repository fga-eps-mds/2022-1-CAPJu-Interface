import { Container } from './styles.js';
import PropTypes from 'prop-types';
import React from 'react';

function ModalBody(props) {
  return <Container>{props.children}</Container>;
}

ModalBody.propTypes = {
  children: PropTypes.any
};

export default ModalBody;
