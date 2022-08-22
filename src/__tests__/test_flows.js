import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import nock from 'nock';
import axios from 'axios';
import { baseURL } from '../services/api';
import Flows from '../pages/Flows';

axios.defaults.adapter = require('axios/lib/adapters/http');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
  };
});

test('Testando criar fluxo no componente Flows', async () => {
  render(<Flows />);
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
    .reply(200, {
      name: 'pericia',
      stages: [],
      sequences: [],
      deleted: false
    })
    .post('/newFlow', flowData)
    .reply(200, { ...flowData, deleted: false });

  const buttonFlow = screen.getByText('+ Adicionar Fluxo');
  fireEvent.click(buttonFlow);

  const modalName = screen.getByText('Novo Fluxo');
  const inputFlow = screen.getByPlaceholderText('Nome do fluxo');
  const button = screen.getByText('Salvar');

  fireEvent.change(inputFlow, { target: { value: 'perito' } });
  expect(modalName).toHaveTextContent('Novo Fluxo');
  fireEvent.click(button);
});

afterAll(() => nock.restore());
