/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';
import { render, screen, fireEvent, waitFor, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom';
import nock from 'nock';
import axios from 'axios';
import { userURL } from '../services/user.js';
import SolicitacoesCadastro from '../pages/SolicitacoesCadastro';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { flowsResponse, stagesResponse } from '../testConstants';
import Login from '../pages/Login';
import Stages from '../pages/Stages';
import authConfig from '../services/config.js';

const user = {
  user: [
    {
      _id: '3049304932093',
      name: 'Cleber',
      email: 'cleber@gmail.com',
      password: 'ijj2pei9ue39ej3d9dj30',
      accepted: false,
      createdAt: '2022-08-24T14:17:42.934Z',
      updatedAt: '2022-09-14T15:27:59.428Z',
      __v: 0,
      recoveryDate: '2022-09-01T16:42:00.913Z',
      recoveryHash:
        '0f85ff4b6ad7c46055f49c010fb90389b31977a1833e0f43cfeb09b45684ec7f'
    }
  ]
};

const scopeRequest = nock(userURL)
  .defaultReplyHeaders({
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true'
  })
  .persist()
  .get('/allUser?accepted=false')
  .reply(200, user);
test('Testando aceitar solicitação', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<SolicitacoesCadastro />} />
      </Routes>
    </MemoryRouter>
  );
  await waitFor(() => expect(scopeRequest.isDone()).toBe(true), {
    timeout: 1000
  });

  screen.getByText('Solicitações de Cadastro');

  //Aceitando Solicitação
  const scopeAccept = nock(userURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .post(`/acceptRequest/${user.user[0]._id}`)
    .reply(200, null);
  const acceptButton = screen.getByLabelText('Aceitar solicitação');
  fireEvent.click(acceptButton);
  const acceptConfirmButton = screen.getByText('Confirmar');
  fireEvent.click(acceptConfirmButton);
  await waitFor(() => expect(scopeAccept.isDone()).toBe(true));

  // //Deletando solicitação
  const scopeDelete = nock(userURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .options(`/deleteRequest/${user.user[0]._id}`)
    .reply(200, null)
    .delete(`/deleteRequest/${user.user[0]._id}`)
    .reply(200, null);
  const deleteButton = screen.getByLabelText('Recusar solicitação');
  fireEvent.click(deleteButton);
  const deleteConfirmButton = screen.getByText('Confirmar');
  fireEvent.click(deleteConfirmButton);
  await waitFor(() => expect(scopeDelete.isDone()).toBe(true));
});
afterAll(() => nock.restore());
