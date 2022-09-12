import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../pages/Login';
import Stages from '../pages/Stages';
import nock from 'nock';
import axios from 'axios';
import React from 'react';
import { userURL } from '../services/user';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

axios.defaults.adapter = require('axios/lib/adapters/http');

// mock window.location.reload()
delete window.location;
window.location = { reload: jest.fn() };

test('Testando criar Login no componente Login', async () => {
  const loginData = { email: 'test@test.com', password: '123456' };

  const scopeLogin = nock(userURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .persist()
    .post('/login', loginData)
    .reply(200, {
      _id: 'askljsf',
      name: 'test',
      email: loginData.email,
      token: 'Bearer sdlksadkçlfdjalo'
    });

  render(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Stages" element={<Stages />} />
      </Routes>
    </MemoryRouter>
  );

  const title = screen.getByRole('heading', { level: 1 });
  const inputEmail = screen.getByPlaceholderText('Email');
  const inputPassword = screen.getByPlaceholderText('Senha');
  const button1 = screen.getByText('Entrar');

  fireEvent.change(inputEmail, { target: { value: 'test@test.com' } });
  fireEvent.change(inputPassword, { target: { value: '123456' } });
  expect(title).toHaveTextContent('Login');
  fireEvent.click(button1);
  await waitFor(() => expect(scopeLogin.isDone()).toBe(true));
  expect(screen.queryByText('Login')).toBe(null);
});

afterAll(() => nock.restore());
