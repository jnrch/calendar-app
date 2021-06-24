import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startRegister } from '../../actions/auth';
import { Navbar } from '../ui/Navbar';
import './register.css';
import Select from 'react-select';


const initEvent = {
  name: 'hk',
  email: 'hk@gmail.com',
  password: '123456',
  password2: '123456',
  roles: []
}

export const Register = () => {

    const dispatch = useDispatch();
    const [formValues, setformValues] = useState( initEvent );
    const {name, email, password, password2} = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        if (password !== password2) {
            return Swal.fire('Error', 'Passwords should match', 'error');
        }

        /*let roles = [];

        for (let i = 0; i < e.length; i++) {
          roles = e[i];
        }*/
         dispatch(startRegister(formValues));
         Swal.fire('Hecho', 'Usuario registrado', 'success');
        
    }
      // set value for default selection
    const [selectedValue, setSelectedValue] = useState([]);

    // handle onChange event of the dropdown
    const handleChange = (e) => {
      setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);
      
      setformValues({
        ...formValues,
        roles: Array.isArray(e) ? e.map(x => x.value) : []
      })
    }

    const perfilOptions = [
      { value: 'user', label: 'Usuario' },
      { value: 'admin', label: 'Administrador' }
    ]

    const handleRegisterInputChange = ({ target }) => {
      setformValues({
          ...formValues,
          [target.name]: target.value
      });
  }

    return (
    <div>
        <Navbar />
        <div className="col-md-4 mx-auto">
            
        <div className="card card-container">

          <h1>Registro de usuarios</h1>
  
          <form onSubmit={handleRegister}>
              <div>
                <div className="form-group">
                  <label htmlFor="username">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={handleRegisterInputChange}
                  />
                </div>
  
                <div className="form-group">
                    <label htmlFor="username">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Correo"
                            name="email"
                            value={email}
                            onChange={handleRegisterInputChange}
                        />
                </div>
  
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={handleRegisterInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Repita la contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password2"
                    value={password2}
                    onChange={handleRegisterInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Perfiles</label>
                    <Select
                      defaultValue={perfilOptions[0]}
                      isMulti
                      name="roles"
                      value={perfilOptions.filter(obj => selectedValue.includes(obj.value))}
                      options={perfilOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={handleChange}
                    />
                    </div>
  
                <div className="form-group">
                  <button className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
          </form>
        </div>
      </div>
    </div>
    );
}