import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import nock from 'nock';
import axios from 'axios';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { userURL } from '../services/user';
import EditAccountPassword from '../pages/EditAccountPassword';

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

test('Testando edição de senha do componente editAccountPassword', async () => {
  const userPasswordResponse = {
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

  const scopeEditPassword = nock(userURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .post(`/updateUser/${userPasswordResponse.user[0]._id}`)
    .reply(200, {
      _id: '0001',
      name: 'nomeUser',
      email: 'teste@email.com',
      password: '123Teste',
      createdAt: '2022-09-15T01:07:51.907Z',
      updatedAt: '2022-09-16T03:42:15.785Z',
      __v: 0
    });

  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<EditAccountPassword />} />
      </Routes>
    </MemoryRouter>
  );
  screen.debug();
  screen.getByText('Editar Senha');

  const senhaAtualTextInput = screen.getByPlaceholderText('Senha Atual');
  const senhaNovoTextInput = screen.getByPlaceholderText('Nova Senha');
  const senha2TextInput = screen.getByPlaceholderText('Confirmar Senha');
  const salvarButton = screen.getByText('Salvar');

  fireEvent.change(senhaAtualTextInput, {
    target: { value: 'Test123' }
  });
  fireEvent.change(senhaNovoTextInput, {
    target: { value: '123Teste' }
  });
  fireEvent.change(senha2TextInput, {
    target: { value: '123Teste' }
  });
  fireEvent.click(salvarButton);

  await waitFor(() => expect(scopeEditPassword.isDone()).toBe(true));
});

afterAll(() => nock.restore());
