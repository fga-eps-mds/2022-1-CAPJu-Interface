import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import Stages from '../pages/Stages';
import TextInput from '../components/TextInput';
import nock from 'nock';
import axios from 'axios';
import React from 'react';
import api from '../services/api';

axios.defaults.adapter = require('axios/lib/adapters/http');

const mockNavigate = jest.fn();
const servicesBackendURI = 'http://localhost:3333';

jest.mock("../services/api", () => {
  return {
    get: (url) => {
      data: { Stages: [{ name: 'Perito', time: '15' }, { name: 'Local', time: '10' }] }
    },
    post: (url, data) => { return { status: 200 } }
  }
});

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
  };
});

test('Testando resgistrar etapa', async () => {
  render(
    <Stages />
  );

  const stageData = { name: 'Perito', time: '15' };

  const button = screen.getByText('+ Adicionar Etapa');
  fireEvent.click(button);

  const modalName = screen.getByText('Nova Etapa');
  const inputName = screen.getByPlaceholderText('Nome da etapa');
  const inputTime = screen.getByPlaceholderText('Duração (dias)');
  const button1 = screen.getByText('Salvar');

  fireEvent.change(inputName, { target: { value: 'Perito' } });
  fireEvent.change(inputTime, { target: { value: '15' } });
  fireEvent.click(button1);

  expect(modalName).toBe(null);
});

afterAll(() => nock.restore());
