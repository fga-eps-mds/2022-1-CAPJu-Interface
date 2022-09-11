import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Table } from './styles';
import api from '../../services/user';
import authConfig from 'services/config';
import { Delete } from '@styled-icons/typicons/Delete';
import { Check } from '@styled-icons/entypo/Check';

function SolicitacoesCadastro() {
  const [users, setUsers] = useState([]);
  const authHeader = authConfig().headers;
  useEffect(() => {
    updateSolicitacoes();
    // eslint-disable-next-line
  }, []);

  async function updateSolicitacoes() {
    const response = await api.get(`/allUser?accepted=false`, {
      headers: authHeader
    });
    setUsers(response.data.user);
  }

  return (
    <Container>
      <h1>Solicitações de Cadastro</h1>
      <div>
        <Table>
          <tr>
            <th>Nome</th>
            <th>Ação</th>
          </tr>
          {users.map((users, index) => {
            return (
              <tr key={index}>
                <td>{users.name}</td>
                <td className="actionButtons">
                  <Check size={30} onClick={() => {}} />
                  <Delete size={30} onClick={() => {}} />
                </td>
              </tr>
            );
          })}
        </Table>
      </div>
    </Container>
  );
}

export default SolicitacoesCadastro;
