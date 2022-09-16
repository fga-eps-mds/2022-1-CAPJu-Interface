/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import nock from 'nock';
import axios from 'axios';
import { userURL } from '../services/user.js';
import SolicitacoesCadastro from '../pages/SolicitacoesCadastro';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { flowsResponse, stagesResponse } from '../testConstants';

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

const scope = nock(userURL)
  .defaultReplyHeaders({
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true'
  })
  .persist()
  .get('/allUser?accepted=false')
  .reply(200, user);

test.skip('Testando aceitar solicitação', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<SolicitacoesCadastro />} />
      </Routes>
    </MemoryRouter>
  );
  await waitFor(() => expect(scope.isDone()).toBe(true));
});
