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
import { isLate } from 'components/IsLate/index.js';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import {
  flowsResponse,
  processResponse,
  stagesResponse
} from '../testConstants';

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

const process = processResponse.processes[0];
process.createdAt = parseInt(process.createdAt);
const flow = flowsResponse.Flows[0];
const newProcess = {
  registro: '2222',
  apelido: 'novoReg',
  etapaAtual: flowsResponse.Flows[1].sequences[0].from,
  arquivado: false,
  fluxoId: flowsResponse.Flows[1]._id
};

const stage = stagesResponse.Stages[0];
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
    .reply(200, flowsResponse)
    .get('/stages')
    .reply(200, stagesResponse);

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

  // entrando em detalhar processo
  const scopeStages = nock(baseURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .get(`/flows/${process.fluxoId}`)
    .reply(200, flowsResponse.Flows[0]);
  const visibilityIcon = screen.getByTestId('VisibilityIcon');
  fireEvent.click(visibilityIcon);
  await waitFor(() => expect(scopeStages.isDone()).toBe(true));
});

describe('testando função de atraso', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
  });

  test('testando isLate sem atraso', () => {
    const mockedDate = new Date(process.createdAt);
    jest.setSystemTime(mockedDate);

    const result = isLate(stage, process, flow);

    expect(result).toBe(false);
  });

  test('testando isLate com atraso', () => {
    const lateDate = new Date(process.createdAt);
    lateDate.setDate(lateDate.getDate() - parseInt(stage.time) - 1);
    jest.setSystemTime(lateDate);

    const result = isLate(stage, process, flow);

    expect(result).toBe(true);
  });
});
afterAll(() => nock.restore());
