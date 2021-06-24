import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { uiCloseModal } from '../../actions/ui';
import { userClearActiveUser, userStartAddNew, userStartUpdate } from '../../actions/users';

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        position              : 'fixed'
      }
  };

Modal.setAppElement('#root');

const initUser = {
    id: '',
    name: '',
    username: '',
    password: '',
    password2: '',
    email: '',
    roles: []
}

export const RegisterUserModal = () => {

    const {modalOpen} = useSelector( state => state.ui );
    const { activeUser } = useSelector( state => state.user );
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState(initUser);

    const { id, name, username, password, password2, email, roles } = formValues;

    useEffect(() => {
        if (activeUser) {
            setFormValues(activeUser);
        } else {
            setFormValues(initUser);
        }
    }, [activeUser, setFormValues]);

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const closeModal = () => {
        dispatch( uiCloseModal() );
        dispatch( userClearActiveUser() );
        setFormValues( initUser );
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        
        if (!activeUser && password !== password2) {
            return Swal.fire('Error', 'Las contraseñas deben coincidir', 'error');
        }

        if ( activeUser ) {
            dispatch( userStartUpdate(formValues));
        }  else {
            dispatch( userStartAddNew( formValues ));
        }

        closeModal();
    }

    const perfilOptions = [
        { value: 'user', label: 'Usuario' },
        { value: 'admin', label: 'Administrador' },
        { value: 'leader', label: 'Jefe Area'}
    ]

    const [, setRole] = useState();

    const handleSelectRoleChange = (e) => {

        const profiles = [
            e.value
          ];

        setRole(profiles);

        setFormValues({
            ...formValues,
            roles: profiles
        });
      }  

    return (
        
        <Modal
            isOpen={ modalOpen }
            onRequestClose={ closeModal }
            style={ customStyles }
            closeTimeoutMS={ 200 }
            className="modal"
            overlayClassName="modal-fondo"
        >
            <h1>{(activeUser) ? 'Editar usuario' : 'Nuevo Usuario'}</h1>
            <hr />
            <form
                className="container"
                onSubmit={ handleSubmitForm }
            >
                <div className="form-group">
                    <input 
                            type="text" 
                            className="form-control"
                            placeholder="Id del usuario"
                            name="id"
                            autoComplete="off"
                            value={ id }
                            onChange={ handleInputChange }
                            hidden
                    />
                </div>
                <div className="form-group">
                    <label>Nombre</label>
                        <input 
                            type="text" 
                            className="form-control"
                            placeholder="Nombre"
                            name="name"
                            autoComplete="off"
                            value={ name }
                            onChange={ handleInputChange }
                        />
                </div>
                <div className="form-group">
                    <label>Usuario</label>
                        <input 
                            type="text" 
                            className="form-control"
                            placeholder="Usuario"
                            name="username"
                            autoComplete="off"
                            value={ username }
                            onChange={ handleInputChange }
                        />
                </div>
                <div className="form-group">
                    <label>Email</label>
                        <input 
                            type="text" 
                            className="form-control"
                            placeholder="Email"
                            name="email"
                            autoComplete="off"
                            value={ email }
                            onChange={ handleInputChange }
                        />
                </div>
            {!activeUser &&
                <div className="form-group">
                <label>Contraseña</label>
                    <input 
                        type="password" 
                        className="form-control"
                        placeholder="Contraseña"
                        name="password"
                        autoComplete="off"
                        value={ password }
                        onChange={ handleInputChange }
                    />
            </div>
            }
            {!activeUser &&
            <div className="form-group">
                <label>Repetir contraseña</label>
                    <input 
                        type="password" 
                        className="form-control"
                        placeholder="Repetir contraseña"
                        name="password2"
                        autoComplete="off"
                        value={ password2 }
                        onChange={ handleInputChange }
                    />
            </div>
            }
                <div className="form-group">
                        <label>Perfil</label>
                    <Select
                        defaultValue={{ label: (roles === 'user' ? 'Usuario' : (roles === 'admin') ? 'Administrador' : (roles === 'leader') ? 'Jefe Area' : 'Seleccionar'), value: roles }}
                        options={perfilOptions}
                        onChange={handleSelectRoleChange}
                        name="roles"
                    />
                </div>
                <button
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                    >
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>
            </form>
        </Modal>
    )
 }