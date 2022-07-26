import { Container } from './styles';

function Header() {
  return (
    <Container>
      <a href={'/'}>CAPJu</a>
      <b>
        <a href={'/Cadastro'}>Cadastrar</a>
        <a href={'/Login'}>Login</a>
      </b>
    </Container>
  );
}

export default Header;
