import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import nock from 'nock';
import axios from 'axios';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { userURL } from '../services/user';
import EditAccountEmail from '../pages/EditAccountEmail';

axios.defaults.adapter = require('axios/lib/adapters/http');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
  };
});

const setLocalStorage = (user, data) => {
  window.localStorage.setItem(user, JSON.stringify(data));
};

beforeAll(() => {
  setLocalStorage('user', {
    _id: '0001',
    name: 'nomeUser',
    email: 'teste@email.com',
    token: '2asdasd454'
  });
});

test('Testando edição de Email do componente editAccountEmail', async () => {
  const userEmaiResponse = {
    user: [
      {
        _id: '0001',
        name: 'nomeUser',
        email: 'teste@email.com',
        password: 'Test123',
        createdAt: '2022-09-15T01:07:51.907Z',
        updatedAt: '2022-09-16T03:42:15.785Z',
        __v: 0
      }
    ]
  };

  const scopeEditEmail = nock(userURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .persist()
    .options(`/updateUser/${userEmaiResponse.user[0]._id}`)
    .reply(200, 'ok')
    .put(`/updateUser/${userEmaiResponse.user[0]._id}`)
    .reply(200, {
      _id: '0001',
      name: 'nomeUser',
      email: 'editTest@email.com',
      password: 'Test123',
      createdAt: '2022-09-15T01:07:51.907Z',
      updatedAt: '2022-09-16T03:42:15.785Z',
      __v: 0
    });

  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<EditAccountEmail />} />
      </Routes>
    </MemoryRouter>
  );

  screen.getByText('Editar Email');

  const emailAtualTextInput = screen.getByPlaceholderText('Email Atual');
  const emailNovoTextInput = screen.getByPlaceholderText('Email Novo');
  const salvarButton = screen.getByText('Salvar');

  fireEvent.change(emailAtualTextInput, {
    target: { value: 'teste@email.com' }
  });
  fireEvent.change(emailNovoTextInput, {
    target: { value: 'editTest@email.com' }
  });
  fireEvent.click(salvarButton);

  await waitFor(() => expect(scopeEditEmail.isDone()).toBe(true));
});

afterAll(() => nock.restore());
