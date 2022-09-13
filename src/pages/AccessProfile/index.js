import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Table, InputSearch } from './sytles.js';
import api from '../../services/user';
import authConfig from 'services/config';

function AccessProfile() {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState('');

  const handleChange = (event) => {
    setSearchUser(event.target.value);
  };
  const authHeader = authConfig().headers;

  useEffect(() => {
    updateUser();
    // eslint-disable-next-line
  }, []);

  async function updateUser() {
    const response = await api.get('/allUser', {
      headers: authHeader
    });
    setUsers(response.data.user);
  }

  const filterUser = (arr) => {
    return arr.filter((users) => {
      if (searchUser == '') {
        return users;
      } else if (
        users.name.toLowerCase().includes(searchUser) &&
        users.status == 1
      ) {
        return users;
      }
    });
  };

  return (
    <Container>
      <div className="userstyle ">
        <span>Perfil de Acesso</span>
        <div className="search">
          <InputSearch
            value={searchUser}
            onChange={handleChange}
            placeholder={'Buscar Usuário'}
          />
        </div>
        <Table>
          <tr>
            <th>Nome</th>
            <th>Perfil</th>
            <th>Status</th>
          </tr>
          {filterUser(users).map((users, idx) => {
            let role;
            let status;
            switch (users.role) {
              case 1:
                role = 'DIRETOR';
                break;
              case 2:
                role = 'JUÍZ';
                break;
              case 3:
                role = 'SERVIDOR';
                break;
              case 4:
                role = 'ESTAGIÁRIO';
                break;
              default:
                role = 'NULO';
                break;
            }
            switch (users.status) {
              case false:
                status = 'PENDENTE';
                break;
              case true:
                status = 'ACEITO';
                break;
              default:
                status = 'NULO';
                break;
            }

            return (
              <tr key={idx}>
                <td>{users.name}</td>
                <td>{role}</td>
                <td>{status}</td>
              </tr>
            );
          })}
        </Table>
      </div>
    </Container>
  );
}
export default AccessProfile;
