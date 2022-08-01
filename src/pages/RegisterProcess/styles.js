import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  width: fit-content;
  padding: 50px;
  border-radius: 15px;

  flex-direction: column;
  gap: 20px;

  label {
    font-size: 18px;
  }
`;

export const Form = styled.form`
  display: flex;
  gap: 20px;
  flex-direction: column;
  color: #000;
`;

export const FormElement = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
`;
