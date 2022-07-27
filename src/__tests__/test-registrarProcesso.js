import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import RegistrarProcesso from '../pages/RegistrarProcesso';
import TextInput from '../components/TextInput';
import nock from 'nock';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
  };
});

test('testando TextInput', () => {
  let registro = '';
  const setRegistro = jest.fn((novoRegistro) => {
    registro = novoRegistro;
  });

  const { getByText, getByDisplayValue } = render(
    <TextInput value={registro} set={setRegistro} />
  );

  const inputElement = getByDisplayValue('');

  fireEvent.change(inputElement, { target: { value: 'anything' } });

  expect(setRegistro).toHaveBeenCalledTimes(1);
});

test('Testando resgistrar processo', () => {
  render(<RegistrarProcesso />);
  const scope = nock('http://localhost:3333')
    .post('/novoProcesso', { registro: '0000', apelido: 'apelidoExemplo' })
    .reply(200, {});

  const inputRegistro = screen.getByPlaceholderText('registro');
  const inputApelido = screen.getByPlaceholderText('apelido');
  const button = screen.getByText('Registrar Processo');

  fireEvent.change(inputRegistro, { target: { value: '0000' } });
  fireEvent.change(inputApelido, { target: { value: 'apelidoExemplo' } });

  fireEvent.click(button);
  waitFor(() => expect(scope.isDone()).toBe(true));
});
