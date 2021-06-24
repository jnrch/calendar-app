import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { startLogout } from '../../actions/auth';

export const Navbar = () => {

    const dispatch = useDispatch();
    const {name, roles} = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(startLogout());
    }

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Agenda pagos
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                Inicio
              </Link>
            </li>
            {roles.includes('ROLE_ADMIN') &&
                <li className="nav-item">
                  <Link to={"/totalPerPayment"} className="nav-link">
                    Total por día
                  </Link>
                </li>
            }
            {roles.includes('ROLE_ADMIN') &&
                <li className="nav-item">
                    <Link to={"/user"} className="nav-link">
                      Usuarios
                    </Link>
                </li>
            }
            <li className="nav-item">
                <Link to={"/provider"} className="nav-link">
                  Proveedores
                </Link>
            </li>
          </div>
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {name}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={handleLogout}>
                  Salir
                </a>
              </li>
            </div>
 
        </nav>
        </div>
    )
}