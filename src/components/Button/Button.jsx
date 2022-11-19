import PropTypes from 'prop-types';
import React from 'react';
import { Container } from './styles';

function Button(props) {
  return (
    <Container background={props.background} onClick={props.onClick}>
      {props.children}
    </Container>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  background: PropTypes.string,
  children: PropTypes.any
};

export default Button;
