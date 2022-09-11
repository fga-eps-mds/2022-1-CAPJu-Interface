import PropTypes from 'prop-types';
import React from 'react';
import { User } from './styles';

function Account(props) {
  return <User onClick={props.onClick} />;
}

Account.propTypes = {
  onClick: PropTypes.func
};

export default Account;
