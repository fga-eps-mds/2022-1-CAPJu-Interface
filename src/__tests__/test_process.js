/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextInput from '../components/TextInput';
import nock from 'nock';
import axios from 'axios';
import { baseURL } from '../services/api';
import Processes from '../pages/Processes';
import ShowProcess from '../pages/ShowProcess';

import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ModalHeader from 'components/ModalHeader';

axios.defaults.adapter = require('axios/lib/adapters/http');

// gambiarra achada em https://github.com/ant-design/ant-design/issues/21096#issuecomment-578118486
// Object.defineProperty(window, 'matchMedia', {
//   writable: true,
//   value: jest.fn().mockImplementation((query) => ({
//     matches: false,
//     media: query,
//     onchange: null,
//     addEventListener: jest.fn(),
//     removeEventListener: jest.fn(),
//     dispatchEvent: jest.fn()
//   }))
// });

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

test('testando TextInput', () => {
  let registro = '';
  const setRegistro = jest.fn((novoRegistro) => {
    registro = novoRegistro;
  });

  const { getByDisplayValue } = render(
    <TextInput value={registro} set={setRegistro} />
  );

  const inputElement = getByDisplayValue('');

  fireEvent.change(inputElement, { target: { value: 'anything' } });

  expect(setRegistro).toHaveBeenCalledTimes(1);
});

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
const processResponse = {
  processes: [
    {
      _id: '62fd4b7f006730249d33b1ab',
      registro: '1111',
      apelido: 'sdlkfja',
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
const newProcess = {
  registro: '2222',
  apelido: 'novoReg',
  etapaAtual: flowsResponse.Flows[1].sequences[0].from,
  arquivado: false,
  fluxoId: flowsResponse.Flows[1]._id
};
test('teste processos', async () => {
  const scopeGet = nock(baseURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .persist()
    .get(/\/processes\/(.+)?/)
    .reply(200, processResponse)
    .get('/flows/')
    .reply(200, flowsResponse);

  const scopePost = nock(baseURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .post('/newProcess', newProcess)
    .reply(200, {
      ...newProcess,
      _id: 'meuIdAleatório',
      etapas: [],
      createdAt: '2022-08-17T20:11:43.499+00:00',
      updatedAt: '2022-08-17T20:11:43.499+00:00',
      __v: 0
    });

  render(
    <MemoryRouter initialEntries={['/processes']}>
      <Routes>
        <Route path="/processes" element={<Processes />} />
        <Route path="/processes/showProcess" element={<ShowProcess />} />
      </Routes>
    </MemoryRouter>
  );
  // mostrando conteúdo
  await waitFor(() => expect(scopeGet.isDone()).toBe(true));
  const r1111 = await waitFor(() => screen.queryByText('1111 - sdlkfja'));
  expect(r1111).toBeInTheDocument();

  // criando processo
  const createButton = screen.getByText('+ Adicionar Processo');
  fireEvent.click(createButton);
  let modalHeader = screen.queryByText('Criar Processo');
  expect(modalHeader).toBeInTheDocument();
  let fluxoInput = screen.getByTestId('react-select-mock');
  let registroInput = screen.getByPlaceholderText('registro');
  let apelidoInput = screen.getByPlaceholderText('apelido');
  let submit = screen.getByText('Confirmar');
  fireEvent.change(fluxoInput, { target: { value: newProcess.fluxoId } });
  fireEvent.change(registroInput, { target: { value: newProcess.registro } });
  fireEvent.change(apelidoInput, { target: { value: newProcess.apelido } });
  fireEvent.click(submit);
  await waitFor(() => expect(scopePost.isDone()).toBe(true));

  //editando processo
  const process = processResponse.processes[0];
  const putURL = `/updateProcess/${process._id}`;
  const scopeEdit = nock(baseURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .options(putURL)
    .reply(200, 'ok')
    .put(putURL, {
      fluxoId: /.*/,
      registro: /.*/,
      apelido: /.*/
    })
    .reply(200, { result: 'atualizado' });
  const editIcon = screen.getByTestId('EditIcon');
  fireEvent.click(editIcon);
  modalHeader = screen.queryByText('Editar Processo');
  expect(modalHeader).toBeInTheDocument();
  fluxoInput = screen.getByTestId('react-select-mock');
  expect(fluxoInput).toHaveValue(process.fluxoId);
  registroInput = screen.getByDisplayValue(process.registro);
  apelidoInput = screen.getByDisplayValue(process.apelido);
  fireEvent.change(apelidoInput, { target: { value: 'novoApelido' } });
  fireEvent.click(submit);
  await waitFor(() => expect(scopeEdit.isDone()).toBe(true));
});

afterAll(() => nock.restore());
