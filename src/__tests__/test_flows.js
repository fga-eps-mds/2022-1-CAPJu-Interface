import React from 'react';
import { render } from '@testing-library/react';
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
});

afterAll(() => nock.restore());
