import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Table, InputSearch } from './sytles.js';
import api from '../../services/user';
import authConfig from 'services/config';
import toast from 'react-hot-toast';

function AccessProfile() {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState('');
  const [newRole, setNewRole] = useState({ role: [] });

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
  async function editRole(id) {
    try {
      let editedRole = { ...newRole };

      const response = await api.put('/updateRole', {
        headers: authHeader,
        _id: id,
        ...editedRole
      });

      setNewRole(editedRole);

      if (response.status == 200) {
        toast.success('Role alterada com sucesso');
      } else {
        toast.error('Erro ao alterar Role');
      }
    } catch (error) {
      console.log(error);
      toast.error('Erro ao tentar alterar Role');
    }
  }

  const filterUser = (arr) => {
    return arr.filter((users) => {
      if (searchUser == '') {
        return users /*&& users.status == true*/;
      } else if (
        users.name.toLowerCase().includes(searchUser) /*&&
        users.status == true */
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
                role = 'Diretor';
                break;
              case 2:
                role = 'Juiz';
                break;
              case 3:
                role = 'Servidor';
                break;
              case 4:
                role = 'Estagiário';
                break;
              default:
                role = 'Nulo';
                break;
            }
            switch (users.status) {
              case false:
                status = 'Pendente';
                break;
              case true:
                status = 'Aceito';
                break;
              default:
                status = 'Nulo';
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
