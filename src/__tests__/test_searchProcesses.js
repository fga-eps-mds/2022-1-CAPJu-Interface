import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import nock from 'nock';
import axios from 'axios';
import { baseURL } from '../services/api';
import Processes from '../pages/Processes';
import Flows from '../pages/Flows';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

axios.defaults.adapter = require('axios/lib/adapters/http');

const mockNavigate = jest.fn();

const processResponse = {
  processes: [
    {
      _id: '62fd4b7f006730249d33b1ab',
      registro: '1111',
      apelido: '2222',
      etapas: [],
      arquivado: false,
      etapaAtual: '62fd4ac0006730249d33b185',
      fluxoId: '62fd4b16006730249d33b19d',
      createdAt: '1660767103499',
      updatedAt: '1660767103499',
      __v: 0
    }
  ]
};

const flowsResponse = {
  Flows: [
    {
      __v: 0,
      _id: '62fd4b16006730249d33b19d',
      createdAt: '2022-08-17T20:09:58.530Z',
      deleted: false,
      name: 'fluxo 1',
      sequences: [
        {
          from: '62fd4ac0006730249d33b185',
          to: '62fd4ac5006730249d33b188'
        },
        {
          from: '62fd4ac5006730249d33b188',
          to: '62fd4acb006730249d33b18b'
        },
        {
          from: '62fd4acb006730249d33b18b',
          to: '62fd4ace006730249d33b18e'
        }
      ],
      stages: [
        '62fd4ac0006730249d33b185',
        '62fd4ac5006730249d33b188',
        '62fd4acb006730249d33b18b',
        '62fd4ace006730249d33b18e',
        '62fd4ad2006730249d33b191'
      ],
      updatedAt: '2022-08-17T20:09:58.530Z'
    },
    {
      __v: 0,
      _id: '62fff77dd588ebd8c101a12a',
      createdAt: '2022-08-19T20:50:05.831Z',
      deleted: false,
      name: 'outro Fluxo',
      sequences: [
        {
          from: '62fd4ac0006730249d33b185',
          to: '62fd4ac5006730249d33b188'
        },
        {
          from: '62fd4ac5006730249d33b188',
          to: '62fd4acb006730249d33b18b'
        }
      ],
      stages: [
        '62fd4ac0006730249d33b185',
        '62fd4ac5006730249d33b188',
        '62fd4acb006730249d33b18b'
      ],
      updatedAt: '2022-08-19T20:50:05.831Z'
    }
  ]
};

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useLocation: () => {
      return { state: flowsResponse.Flows[0] };
    }
  };
});

test('Testando busca por registro ou apelido', async () => {
  const scope = nock(baseURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .persist()
    .get(/\/processes\/(.+)?/)
    .reply(200, processResponse)
    .get('/flows/')
    .reply(200, flowsResponse);

  render(
    <MemoryRouter initialEntries={['/processes']}>
      <Routes>
        <Route path="/processes" element={<Processes />} />
      </Routes>
    </MemoryRouter>
  );

  const inputName = screen.getByPlaceholderText('Buscar Processo');
  fireEvent.change(inputName, { target: { value: '1111' } });
  await waitFor(() => expect(scope.isDone()).toBe(true));
});

afterAll(() => nock.restore());
