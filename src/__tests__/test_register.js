import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../pages/Login';
import nock from 'nock';
import axios from 'axios';
import React from 'react';
import { baseURL } from '../services/api';

axios.defaults.adapter = require('axios/lib/adapters/http');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
  };
});

test.skip('Testando o cadastro', async () => {
  const registerData = {
    name: 'João',
    email: 'test@test.com',
    password: '123456'
  };

  const scopeGet = nock(baseURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .persist()
    .get('/register')
    .reply(200, {
      Register: [
        { name: 'João', email: 'test1@gmail.com', password: '123' },
        { name: 'Maria', email: 'test2@hotmail.com', password: '321' },
        { name: 'José', email: 'test3@outlook.com', password: '456' }
      ]
    });
  const scopePost = nock(baseURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .post('/newUser', registerData)
    .reply(200, { ...registerData, deleted: false });

  render(<Login />);

  const button = screen.getByText('Cadastrar');
  fireEvent.click(button);

  const modalName = screen.getByText('Cadastro');
  const inputName = screen.getByPlaceholderText('Nome Completo');
  const inputEmail = screen.getByPlaceholderText('Email');
  const inputPassword = screen.getByPlaceholderText('Crie uma senha');
  const button1 = screen.getByText('Cadastrar');

  fireEvent.change(inputName, { target: { value: 'João' } });
  fireEvent.change(inputEmail, { target: { value: 'test@test.com' } });
  fireEvent.change(inputPassword, { target: { value: '123456' } });
  expect(modalName).toHaveTextContent('Cadastro');
  fireEvent.click(button1);
  await waitFor(() => expect(scopeGet.isDone()).toBe(true));
  await waitFor(() => expect(scopePost.isDone()).toBe(true));
  expect(screen.queryByText('Cadastro')).toBe(null);
});

afterAll(() => nock.restore());
