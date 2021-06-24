import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { uiOpenModal, uiOpenModalSecond } from "../../actions/ui";
import { userSetActive, userStartLoading } from "../../actions/users";
import { AddNewfab } from "../ui/AddNewFab";
import { Navbar } from "../ui/Navbar";
import { RegisterUserChangePasswordModal } from "./RegisterUserChangePasswordModal";
import { RegisterUserModal } from "./RegisterUserModal";

import $ from 'jquery'; 

const initUser = {
    username: '',
    password: '',
    password2: '',
    email: '',
    name: '',
    roles: []
}

export const RegisterUser = () => {

    const dispatch = useDispatch();
    const {users} = useSelector( state => state.user );
          
    $('#example2').DataTable();

    const [, setUserSelected] = useState(initUser);

    useEffect(() => {
        dispatch(userStartLoading());
    }, [dispatch]);

    const onClick = (e) => {
        dispatch(uiOpenModal());
    }

    const onClickSecond = (e) => {
        dispatch(uiOpenModalSecond());
    }

    const selectUser = (e) => {
        setUserSelected(e);
        dispatch(userSetActive(e));
    }

return (
    <div>
        <Navbar />
            <h2>Usuarios</h2>
            <table id="example2" className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Usuario</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td><button className="btn btn-primary"
                                onClick={() => {
                                    selectUser(user);
                                    onClick();
                                }}
                            >Editar</button> {" "}
                            <button className="btn btn-danger"
                                onClick={() => {
                                    selectUser(user);
                                    onClickSecond();
                                }}
                            >Cambiar contraseña</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        <AddNewfab />
        <RegisterUserModal />
        <RegisterUserChangePasswordModal />
    </div>
  );
}