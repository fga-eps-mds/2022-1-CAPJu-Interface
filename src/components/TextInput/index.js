import PropTypes from 'prop-types';
import React from 'react';
import { Input } from './styles';

function TextInput(props) {
  function handleUpdateElem(event) {
    props.set(event.target.value);
  }

  return (
    <Input
      placeholder={props.placeholder}
      onChange={handleUpdateElem}
      value={props.value}
    ></Input>
  );
}

TextInput.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  set: PropTypes.func
};

export default TextInput;
