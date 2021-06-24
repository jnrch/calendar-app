import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { uiCloseModalSecond } from '../../actions/ui';
import { userClearActiveUser, userStartChangePasswordUpdate } from '../../actions/users';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root');

const initUser = {
    password: '',
    password2: '',
    email: ''
}

export const RegisterUserChangePasswordModal = () => {

    const { modalOpenSecond } = useSelector( state => state.ui );
    const { activeUser } = useSelector( state => state.user );
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState(initUser);

    const { password, password2, email } = formValues;

    const passwordObject = {
        password: password
    }

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
        dispatch( uiCloseModalSecond() );
        dispatch( userClearActiveUser() );
        setFormValues( initUser );
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        
        if (password === '' || password === undefined) {
            return Swal.fire('Error', 'Debe ingresar una contraseña', 'error');
        }

        if (password !== password2) {
            return Swal.fire('Error', 'Las contraseñas deben coincidir', 'error');
        }

        if ( activeUser ) {
            dispatch( userStartChangePasswordUpdate(formValues, passwordObject));
        }  

        closeModal();
    }

    return (
        
        <Modal
            isOpen={ modalOpenSecond }
            onRequestClose={ closeModal }
            style={ customStyles }
            closeTimeoutMS={ 200 }
            className="modal"
            overlayClassName="modal-fondo"
        >
            <h1>Cambiar contraseña</h1>
            <hr />
            <form
                className="container"
                onSubmit={ handleSubmitForm }
            >
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
                            disabled
                        />
                </div>
                <div className="form-group">
                    <label>Contraseña</label>
                        <input 
                            type="password" 
                            className="form-control"
                            placeholder="Contraseña"
                            name="password"
                            autoComplete="off"
                            //value={}
                            onChange={ handleInputChange }
                        />
                </div>
                <div className="form-group">
                    <label>Repetir contraseña</label>
                        <input 
                            type="password" 
                            className="form-control"
                            placeholder="Repetir contraseña"
                            name="password2"
                            autoComplete="off"
                            value={ password2 || ''}
                            onChange={ handleInputChange }
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