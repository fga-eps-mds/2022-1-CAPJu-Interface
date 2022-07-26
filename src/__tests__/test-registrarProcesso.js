import { render, waitFor, screen, fireEvent, getByPlaceholderText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegistrarProcesso from '../pages/RegistrarProcesso';
import TextInput from '../components/TextInput';
import { Container } from '../pages/RegistrarProcesso/styles';
import nock from 'nock';
import { useNavigate } from 'react-router-dom';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {

    return {
        ...jest.requireActual('react-router-dom'),
        useNavigate: () => mockNavigate
    }
});


test('testando TextInput', () => {
    let registro = '';
    const setRegistro = jest.fn((novoRegistro) => {
        registro = novoRegistro;
    });

    const { getByText, getByDisplayValue } = render(<TextInput value={registro} set={setRegistro} />);

    const inputElement = getByDisplayValue('');

    fireEvent.change(inputElement, { target: { value: 'anything' } });

    expect(setRegistro).toHaveBeenCalledTimes(1);
});

test.skip('Testando resgistrar processo', () => {


    const { getByText, getByDisplayValue, getByPlaceholderText, debug } = render(<RegistrarProcesso />);
    const scope = nock('http://localhost:3333')
        .post('/novoProcesso', { registro: '0000', apelido: 'apelidoExemplo' })
        .reply(200, {});

    const inputRegistro = screen.getByPlaceholderText('registro');
    const inputApelido = screen.getByPlaceholderText('apelido');


    fireEvent.change(inputRegistro, { target: { value: '0000' } });
    fireEvent.change(inputApelido, { target: { value: 'apelidoExemplo' } });

    debug()
    fireEvent.click(screen.getByTestId('registrarProcesso'));
    debug()
    expect(scope.isDone()).toBe(true);

});