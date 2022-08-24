import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import nock from 'nock';
import axios from 'axios';
import { baseURL } from '../services/api';
import Flows from '../pages/Flows';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

axios.defaults.adapter = require('axios/lib/adapters/http');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
  };
});

const flowBody = {
  Flows: [
    {
      _id: '62faedcebe0beca8440690d2',
      name: 'flow1',
      stages: [
        '62faedcebe0beca8440690c9',
        '62faedcebe0beca8440690cb',
        '62faedcebe0beca8440690cd'
      ],
      sequences: [
        {
          from: '62faedcebe0beca8440690c9',
          to: '62faedcebe0beca8440690cb'
        },
        {
          from: '62faedcebe0beca8440690cb',
          to: '62faedcebe0beca8440690cd'
        }
      ],
      deleted: false,
      createdAt: '2022-08-16T01:07:26.705Z',
      updatedAt: '2022-08-16T01:07:26.705Z',
      __v: 0
    }
  ]
};
const stageBody = {
  Stages: [
    {
      _id: '62faedcebe0beca8440690c9',
      name: 'STAGE1',
      deleted: false,
      createdAt: '2022-08-16T01:07:26.457Z',
      updatedAt: '2022-08-16T01:07:26.457Z',
      __v: 0
    }
  ]
};
test('Testando criar fluxo no componente Flows', async () => {
  const flowData = {
    name: 'pericia',
    stage: ['perito', 'quesito', 'pagamento'],
    sequences: ['perito', 'quesito']
  };

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
      ...flowData,
      _id: '1',
      name: 'pericia',
      stages: [],
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
  fireEvent.change(inputFlow, { target: { value: 'perito' } });
  expect(modalName).toHaveTextContent('Novo Fluxo');
  fireEvent.click(button);

  await waitFor(() => expect(scope.isDone()).toBe(true));
});

test('Testando editar fluxo no componente Flows', async () => {
  const flowData = {
    name: 'pericia',
    stage: ['perito', 'quesito', 'pagamento'],
    sequences: ['perito', 'quesito']
  };

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
    .put('/editFlow')
    .reply(200, {
      ...flowData,
      _id: '1',
      name: 'pericia',
      stages: [],
      sequences: [],
      createdAt: '2022-08-17T20:11:43.499+00:00',
      updatedAt: '2022-08-17T20:11:43.499+00:00',
      __v: 0
    });

  const modalName2 = screen.getByText('Editar Fluxo');
  const inputFlow2 = screen.getByTestId('ChangeName');
  const buttonSave = screen.getByText('Salvar');
  fireEvent.change(inputFlow2, { target: { value: 'perito' } });
  expect(modalName2).toHaveTextContent('Editar fluxo');
  fireEvent.click(buttonSave);

  await waitFor(() => expect(scope.isDone()).toBe(true));
});

afterAll(() => nock.restore());
