import React from 'react';
import api from '../../services/api';
import Button from 'components/Button';
import ModalHeader from 'components/ModalHeader';
import ModalBody from 'components/ModalBody';
import TextInput from 'components/TextInput';
import Dropdown from 'react-dropdown';
import { useState } from 'react';

function AccessProfile(){
    const [user, setUser] = useState([]);
    const [searchUser, setSearchUser] = useState('');



    const handleChange = (event) => {
        setSearchUser(event.target.value);
      };

    return();
}export default AccessProfile;