import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import RegistrarProcesso from '../pages/RegistrarProcesso';
import TextInput from '../components/TextInput';
import nock from 'nock';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

axios.defaults.adapter = require('axios/lib/adapters/http');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
  };
});

// gambiarra achada em https://github.com/ant-design/ant-design/issues/21096#issuecomment-578118486
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});

test('testando TextInput', () => {
  let registro = '';
  const setRegistro = jest.fn((novoRegistro) => {
    registro = novoRegistro;
  });

  const { getByDisplayValue } = render(
    <TextInput value={registro} set={setRegistro} />
  );

  const inputElement = getByDisplayValue('');

  fireEvent.change(inputElement, { target: { value: 'anything' } });

  expect(setRegistro).toHaveBeenCalledTimes(1);
});

test('Testando resgistrar processo', async () => {
  render(
    <div>
      <Toaster />
      <RegistrarProcesso />
    </div>
  );
  const scope = nock('http://localhost:3333')
    .post('/novoProcesso', { registro: '0000', apelido: 'apelidoExemplo' })
    .reply(200, {});

  const inputRegistro = screen.getByPlaceholderText('registro');
  const inputApelido = screen.getByPlaceholderText('apelido');
  const button = screen.getByText('Registrar Processo');

  fireEvent.change(inputRegistro, { target: { value: '0000' } });
  fireEvent.change(inputApelido, { target: { value: 'apelidoExemplo' } });

  fireEvent.click(button);
  await waitFor(() => expect(scope.isDone()).toBe(true));
  expect(screen.getByText('Processo Registrado com Sucesso')).not.toBe(null);
});

test('Testa resgistrar processo com registro vazio', async () => {
  render(
    <div>
      <Toaster />
      <RegistrarProcesso />
    </div>
  );

  const inputApelido = screen.getByPlaceholderText('apelido');
  const button = screen.getByText('Registrar Processo');

  fireEvent.change(inputApelido, { target: { value: 'apelidoExemplo' } });

  fireEvent.click(button);
  expect(screen.getByText('Registro vazio')).not.toBe(null);
});

test('Testand resgistrar processo ao receber um erro do servidor', async () => {
  render(
    <div>
      <Toaster />
      <RegistrarProcesso />
    </div>
  );
  const scope = nock('http://localhost:3333')
    .post('/novoProcesso', { registro: '0000', apelido: '' })
    .replyWithError({ response: { data: { message: 'registro duplicado' } } });

  const inputRegistro = screen.getByPlaceholderText('registro');
  const button = screen.getByText('Registrar Processo');

  fireEvent.change(inputRegistro, { target: { value: '0000' } });

  fireEvent.click(button);
  await waitFor(() => expect(scope.isDone()).toBe(true));
  expect(
    screen.getByText('Erro ao registrar processo registro duplicado')
  ).not.toBe(null);
});

afterAll(() => nock.restore());
