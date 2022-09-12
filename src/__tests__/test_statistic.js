import Statistics from 'pages/Statistics';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import nock from 'nock';
import axios from 'axios';
import { baseURL } from '../services/api';
import React from 'react';
import {
  flowsResponse,
  processResponse,
  stagesResponse
} from '../testConstants';

axios.defaults.adapter = require('axios/lib/adapters/http');

const mockFlowsResponse = flowsResponse;

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useLocation: () => {
      return { state: mockFlowsResponse.Flows[1] };
    }
  };
});

test('Testando Acessar a página de estatística', async () => {
  nock(baseURL)
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

  render(<Statistics />);

  await waitFor(() =>
    expect(screen.getByText('Estatística de fluxo')).toBeInTheDocument()
  );
});
afterAll(() => nock.restore());

// test('Testando renderizar componentes em Estatística de fluxo', async () => {
//   nock(baseURL)
//     .defaultReplyHeaders({
//       'access-control-allow-origin': '*',
//       'access-control-allow-credentials': 'true'
//     })
//     .persist()
//     .get(/\/processes\/(.+)?/)
//     .reply(200, processResponse)
//     .get('/flows/')
//     .reply(200, flowsResponse)
//     .get('/stages')
//     .reply(200, stagesResponse);

//   render(<Statistics />);
//   expect(screen.getByText(' processos na etapa')).toBeInTheDocument();
//   // await waitFor(() => expect(scope.isDone()).toBe(true));
// });
// afterAll(() => nock.restore());
