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

test.skip('Testando criar Login no componente Login', async () => {
  const loginData = { email: 'test@test.com', password: '123456' };

  const scopeGet = nock(baseURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .persist()
    .get('/login')
    .reply(200, {
      Login: [
        { email: 'test1@gmail.com', password: '123' },
        { email: 'test2@hotmail.com', password: '321' },
        { email: 'test3@outlook.com', password: '456' }
      ]
    });
  const scopePost = nock(baseURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .post('/newLogin', loginData)
    .reply(200, { ...loginData, deleted: false });

  render(<Login />);

  const button = screen.getByText('Entrar');
  fireEvent.click(button);

  const modalName = screen.getByText('Login');
  const inputEmail = screen.getByPlaceholderText('Email');
  const inputPassword = screen.getByPlaceholderText('Senha');
  const button1 = screen.getByText('Entrar');

  fireEvent.change(inputEmail, { target: { value: 'test@test.com' } });
  fireEvent.change(inputPassword, { target: { value: '123456' } });
  expect(modalName).toHaveTextContent('Login');
  fireEvent.click(button1);
  await waitFor(() => expect(scopeGet.isDone()).toBe(true));
  await waitFor(() => expect(scopePost.isDone()).toBe(true));
  expect(screen.queryByText('Login')).toBe(null);
});

afterAll(() => nock.restore());
