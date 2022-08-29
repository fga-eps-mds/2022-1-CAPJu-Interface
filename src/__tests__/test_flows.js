/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import nock from 'nock';
import axios from 'axios';
import { baseURL } from '../services/api';
import Flows from '../pages/Flows';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Target } from 'styled-icons/fluentui-system-regular';

axios.defaults.adapter = require('axios/lib/adapters/http');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
  };
});
jest.mock('react-dropdown', () => ({ options, value, onChange }) => {
  return (
    <select
      data-testid="react-select-mock"
      value={value}
      onChange={(e) => onChange(e.target)}
    >
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
});
jest.mock('react-flow-renderer');

const flowBody = {
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
        }
      ],
      stages: [
        '62fd4ac0006730249d33b185',
        '62fd4ac5006730249d33b188',
        '62fd4acb006730249d33b18b'
      ],
      updatedAt: '2022-08-17T20:09:58.530Z'
    }
  ]
};
const stageBody = {
  Stages: [
    {
      _id: '62fd4ac0006730249d33b185',
      name: 'etpa c1',
      time: '10',
      deleted: false,
      createdAt: '2022-08-17T20:08:32.382+00:00',
      updatedAt: '2022-08-17T20:08:32.382+00:00',
      __v: 0
    },
    {
      _id: '62fd4ac5006730249d33b188',
      name: 'etpa c2',
      time: '15',
      deleted: false,
      createdAt: '2022-08-17T20:08:32.382+00:00',
      updatedAt: '2022-08-17T20:08:32.382+00:00',
      __v: 0
    },
    {
      _id: '62fd4acb006730249d33b18b',
      name: 'etpa c3',
      time: '15',
      deleted: false,
      createdAt: '2022-08-17T20:08:32.382+00:00',
      updatedAt: '2022-08-17T20:08:32.382+00:00',
      __v: 0
    },
    {
      _id: '62fd4acb006730249d33b18c',
      name: 'etpa c4',
      time: '12',
      deleted: false,
      createdAt: '2022-08-17T20:08:32.382+00:00',
      updatedAt: '2022-08-17T20:08:32.382+00:00',
      __v: 0
    }
  ]
};

test.skip('Testando criar fluxo no componente Flows', async () => {
  const scope = nock(baseURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .persist()
    .get('/flows')
    .reply(200, flowBody)
    .get('/stages')
    .reply(200, stageBody)
    .post('/newFlow')
    .reply(200, {
      _id: 'meuIdAleatório',
      name: 'perito',
      stages: ['etpa c', 'etpa c2'],
      sequences: [],
      createdAt: '2022-08-17T20:11:43.499+00:00',
      updatedAt: '2022-08-17T20:11:43.499+00:00',
      __v: 0
    });

  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<Flows />} />
      </Routes>
    </MemoryRouter>
  );

  const buttonFlow = screen.getByText('+ Adicionar Fluxo');
  fireEvent.click(buttonFlow);

  const modalName = screen.getByText('Novo Fluxo');
  const inputFlow = screen.getByPlaceholderText('Nome do fluxo');
  const button = screen.getByText('Salvar');
  const close = screen.getByTestId('close');
  fireEvent.change(inputFlow, { target: { value: 'perito' } });
  fireEvent.click(button);
  fireEvent.click(close);
  expect(modalName).toHaveTextContent('Novo Fluxo');
  await waitFor(() => expect(scope.isDone()).toBe(true));
});

test('Testando editar fluxo no componente Flows', async () => {
  const scopeGet = nock(baseURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .persist()
    .get('/flows')
    .reply(200, flowBody)
    .get('/stages')
    .reply(200, stageBody);

  const scopeEditar = nock(baseURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .persist()
    .options('/editFlow')
    .reply(200, 'ok')
    .put('/editFlow')
    .reply(200, {
      __v: 0,
      _id: '62fd4b16006730249d33b19d',
      createdAt: '2022-08-17T20:09:58.530Z',
      deleted: false,
      name: 'flow4',
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
          to: '62fd4acb006730249d33b18c'
        }
      ],
      stages: [
        '62fd4ac0006730249d33b185',
        '62fd4ac5006730249d33b188',
        '62fd4acb006730249d33b18b',
        '62fd4acb006730249d33b18c'
      ],
      updatedAt: '2022-08-17T20:09:58.530Z'
    });

  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<Flows />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => expect(scopeGet.isDone()).toBe(true));
  const flow = await waitFor(() => screen.queryByText('fluxo 1'));
  expect(flow).toBeInTheDocument();

  const editIcon = screen.getByTestId('EditIcon');
  fireEvent.click(editIcon);
  const editModal = screen.getByText('Editar fluxo');
  const input = screen.getByDisplayValue('fluxo 1');
  const button = screen.getByText('Salvar');
  const dropdown = screen.queryAllByTestId('react-select-mock');
  const add = screen.queryAllByText('Adicionar');
  fireEvent.change(input, { target: { value: 'flow4' } });
  fireEvent.change(dropdown[0], {
    target: { value: '62fd4acb006730249d33b18c' }
  });
  fireEvent.click(add[0]);
  const stage = screen.getAllByText('etpa c4');
  screen.debug();
  expect(stage[1]).toHaveTextContent('etpa c4');
  fireEvent.change(dropdown[1], {
    target: { value: '62fd4acb006730249d33b18b' }
  });
  fireEvent.change(dropdown[2], {
    target: { value: '62fd4acb006730249d33b18b' }
  });
  fireEvent.click(add[1]);
  expect(editModal).toHaveTextContent('Editar fluxo');
  fireEvent.click(button);
  await waitFor(() => expect(scopeEditar.isDone()).toBe(true));
});

afterAll(() => nock.restore());
