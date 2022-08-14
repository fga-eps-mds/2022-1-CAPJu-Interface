import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import Stages from '../pages/Stages';
import TextInput from '../components/TextInput';
import nock from 'nock';
import axios from 'axios';
import React from 'react';

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

test('Testando resgistrar etapa', async () => {
  render(
    <div>
      <Stages />
    </div>
  );
  const scope = nock('http://localhost:3000/stages')
    .post('/stages')
    .reply(200, {});

  const button = screen.getByText('+ Adicionar Etapa');
  const inputName = screen.getByPlaceholderText('Nome da etapa');
  const inputTime = screen.getByPlaceholderText('Duração (dias)');
  const button1 = screen.getByText('Salvar');

  fireEvent.click(button);
  fireEvent.change(inputName, { target: { value: 'teste' } });
  fireEvent.change(inputTime, { target: { value: '10' } });
  fireEvent.click(button1);

  await waitFor(() => expect(scope.isDone()).toBe(true));
});

afterAll(() => nock.restore());
