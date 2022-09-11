import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Table } from './styles';
import api from '../../services/user';
import authConfig from 'services/config';
import { Delete } from '@styled-icons/typicons/Delete';
import { Check } from '@styled-icons/entypo/Check';
import Tooltip from '@mui/material/Tooltip';
import toast from 'react-hot-toast';

function SolicitacoesCadastro() {
  const [users, setUsers] = useState([]);
  const authHeader = authConfig().headers;
  console.log(authHeader);
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

  async function acceptRequest(userId) {
    try {
      const response = await api.post(`/acceptRequest/${userId}`, {
        headers: authHeader
      });
      if (response.status == 200) {
        toast.success('Solicitação aceita com sucesso!', { duration: 3000 });
      } else {
        toast.error('Erro ao aceitar solicitação!', { duration: 3000 });
      }
    } catch (error) {
      console.log(error);
      toast.error('Erro ao aceitar solicitação!', { duration: 3000 });
    }
  }

  return (
    <Container>
      <h1>Solicitações de Cadastro</h1>
      <div>
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Ação</th>
            </tr>
          </thead>
          {users.map((users, index) => {
            return (
              <tr key={index}>
                <td>{users.name}</td>
                <td className="actionButtons">
                  <Tooltip title="Aceitar solicitação">
                    <Check
                      className="check-icon"
                      size={30}
                      onClick={async () => {
                        await acceptRequest(users._id);
                        await updateSolicitacoes();
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="Recusar solicitação">
                    <Delete
                      className="delete-icon"
                      size={30}
                      onClick={() => {}}
                    />
                  </Tooltip>
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
