import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../pages/Login';
import nock from 'nock';
import axios from 'axios';
import React from 'react';
import { userURL } from '../services/user';

axios.defaults.adapter = require('axios/lib/adapters/http');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
  };
});
// jest.setTimeout(8000);
test('Testando o cadastro', async () => {
  const registerData = {
    name: 'João',
    email: 'test@test.com',
    password: 'SenhaForte1'
  };

  const scopeCadastro = nock(userURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .persist()
    .post('/newUser', registerData)
    .reply(200, {
      _id: 'askljsf',
      name: registerData.name,
      email: registerData.email,
      token: 'Bearer sdlksadkçlfdjalo'
    });

  render(<Login />);

  const button = screen.getByText('Cadastro');
  fireEvent.click(button);

  const title = screen.getByRole('heading', { level: 1 });
  const inputName = screen.getByPlaceholderText('Nome completo');
  const inputEmail = screen.getByPlaceholderText('Email');
  const inputPassword = screen.getByPlaceholderText('Crie uma senha');
  const inputCheckPassword = screen.getByPlaceholderText('Confirme a senha');
  const button1 = screen.getByText('Cadastrar');

  fireEvent.change(inputName, { target: { value: 'João' } });
  fireEvent.change(inputEmail, { target: { value: 'test@test.com' } });
  fireEvent.change(inputPassword, { target: { value: 'SenhaForte1' } });
  fireEvent.change(inputCheckPassword, { target: { value: 'SenhaForte1' } });

  expect(title).toHaveTextContent('Cadastre-se');
  fireEvent.click(button1);
  await waitFor(() => expect(scopeCadastro.isDone()).toBe(true), {
    timeout: 1000
  });
  expect(screen.queryByText('Cadastre-se')).toBe(null);
});

afterAll(() => nock.restore());
