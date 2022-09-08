import React from 'react';
import api from '../../services/api';
import Dropdown from 'react-dropdown';
import { useState } from 'react';
import { Container, Table } from './sytles.js';

function AccessProfile() {
  const [user, setUser] = useState([]);
  const [searchUser, setSearchUser] = useState('');

  const handleChange = (event) => {
    setSearchUser(event.target.value);
  };

  return (
    <Container>
      <h3>Perfil de Acesso</h3>

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
