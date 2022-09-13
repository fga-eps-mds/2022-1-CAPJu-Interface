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
        users.name.toLowerCase().includes(searchUser) ||
        users.role.toLowerCase().includes(searchUser)
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
            return (
              <tr key={idx}>
                <td>{users.name}</td>
                <td>{users.role}</td>
                <td>{users.status}</td>
              </tr>
            );
          })}
        </Table>
      </div>
    </Container>
  );
}
export default AccessProfile;
