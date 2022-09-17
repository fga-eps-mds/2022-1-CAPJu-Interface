import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import nock from 'nock';
import axios from 'axios';
import { userURL } from '../services/user';
import EditAccountEmail from '../pages/EditAccountEmail';

axios.defaults.adapter = require('axios/lib/adapters/http');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
  };
});

test('Testando edição de email', async () => {
  const editEmailData = {
    email: 'test@test.com'
  };

  const scopeEditEmail = nock(userURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .put('/updateUser/:id', editEmailData)
    .reply(200, {
      _id: 'askljsf',
      email: editEmailData.email
    });

  render(<EditAccountEmail />);
  //
  const emailAtualTextInput = screen.getByPlaceholderText('Email Atual');
  const emailNovoTextInput = screen.getByPlaceholderText('Email Novo');
  const salvarButton = screen.getByText('Salvar');

  fireEvent.change(emailAtualTextInput, {
    target: { value: 'test@test.com' }
  });
  fireEvent.change(emailNovoTextInput, { target: { value: 'test1@test.com' } });
  screen.debug();
  fireEvent.click(salvarButton);
  await waitFor(() => expect(scopeEditEmail.isDone()).toBe(true));
});

afterAll(() => nock.restore());
