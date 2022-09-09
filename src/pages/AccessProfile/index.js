import React from 'react';
import api from '../../services/api';
import Dropdown from 'react-dropdown';
import { useState } from 'react';
import { Container, Table, InputSearch } from './sytles.js';

function AccessProfile() {
  const [user, setUser] = useState([]);
  const [searchUser, setSearchUser] = useState('');

  const handleChange = (event) => {
    setSearchUser(event.target.value);
  };

  const filterUser = (arr) => {
    return arr.filter((user) => {
      if (searchUser == '') {
        return user;
      } else if (
        user.name.toLowerCase().includes(searchUser) ||
        user.role.toLowerCase().includes(searchUser)
      ) {
        return user;
      }
    });
  };

  return (
    <Container>
      <h3>Perfil de Acesso</h3>
      <InputSearch
        value={searchUser}
        onChange={handleChange}
        placeholder={'Buscar Usuário'}
      />
      <Table>
        <tr>
          <th>Nome</th>
          <th>Perfil</th>
          <th>Status</th>
        </tr>
      </Table>
    </Container>
  );
}
export default AccessProfile;
