import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegistrarProcesso from '../pages/RegistrarProcesso';
import TextInput from '../components/TextInput';
import { Container } from '../pages/RegistrarProcesso/styles';


test('testando TextInput', () => {
    let registro = '';
    const setRegistro = jest.fn ((novoRegistro) => {
        registro = novoRegistro;
    });

    const { getByText, getByDisplayValue } = render(<TextInput value={registro} set={setRegistro}/>);

    const inputElement = getByDisplayValue('');

    fireEvent.change(inputElement, {target: {value: 'anything'}});

    expect(setRegistro).toHaveBeenCalledTimes(1);
});