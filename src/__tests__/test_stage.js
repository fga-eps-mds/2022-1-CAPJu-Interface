import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Stages from '../pages/Stages';
import TextInput from '../components/TextInput';
import nock from 'nock';
import axios from 'axios';
import React from 'react';

axios.defaults.adapter = require('axios/lib/adapters/http');

const mockNavigate = jest.fn();
const servicesBackendURI = 'http://localhost:3333';

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
  };
});

test('Testando crair etapa no componente Stages', async () => {
  render(<Stages />);
  const url = 'http://localhost:3333';
  const stageData = { name: 'Perito', time: '15' };

  const scope = nock(url)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .persist()
    .get('/stages')
    .reply(200, {
      Stages: [
        { name: 'per', time: '18', _id: 'foo' },
        { name: 'natal', time: '16', _id: 'foo' },
        { name: 'ano novo', time: '17', _id: 'foo' }
      ]
    })
    .post('/newStage', stageData)
    .reply(200, { ...stageData, deleted: false });

  const button = screen.getByText('+ Adicionar Etapa');
  fireEvent.click(button);

  const modalName = screen.getByText('Nova Etapa');
  const inputName = screen.getByPlaceholderText('Nome da etapa');
  const inputTime = screen.getByPlaceholderText('Duração (dias)');
  const button1 = screen.getByText('Salvar');

  fireEvent.change(inputName, { target: { value: 'Perito' } });
  fireEvent.change(inputTime, { target: { value: '15' } });
  expect(modalName).toHaveTextContent('Nova Etapa');
  fireEvent.click(button1);
  screen.debug();
  await waitFor(() => expect(scope.isDone()).toBe(true));
  // await waitFor(() => expect(scopePost.isDone()).toBe(true));
  expect(screen.queryByText('Nova Etapa')).toBe(null);
});

afterAll(() => nock.restore());
