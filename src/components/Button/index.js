import PropTypes from 'prop-types';
import { Container } from './styles';

function Button(props) {
  return <Container onClick={props.onClick}>{props.children}</Container>;
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.element
};

export default Button;
