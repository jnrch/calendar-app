import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { providerSetActive, providerStartLoading } from "../../actions/providers";
import { uiOpenModal } from "../../actions/ui";
import { AddNewfab } from "../ui/AddNewFab";
import { Navbar } from "../ui/Navbar";
import { ProviderModal } from "./ProviderModal";

import $ from 'jquery'; 

export const Provider = () => {

    $('#example').DataTable();

    const dispatch = useDispatch();
    const {providers} = useSelector( state => state.provider );

    const [, setProviderSelected] = useState({ 
        id: '',
        name: '',
        businessName: ''
    });

    useEffect(() => {
        dispatch(providerStartLoading());
    }, [dispatch]);

    const onClick = (e) => {
        dispatch(uiOpenModal());
    }

    const onSelectProvider=(elemento, caso)=>{
        setProviderSelected(elemento);
        dispatch(providerSetActive(elemento));
    }

return (
<div>
      <Navbar />
          <h2>Proveedores</h2>
          <table id="example" className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Razón Social</th>
                <th>Cuit</th>
                <th>Telefono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {providers.map(elemento=>(
                <tr key={elemento.id}> 
                  <td>{elemento.id}</td>
                  <td>{elemento.name}</td>
                  <td>{elemento.businessName}</td>
                  <td>{elemento.documentNumber}</td>
                  <td>{elemento.phone}</td>
                  <td><button className="btn btn-primary" onClick={() =>  { 
                                onSelectProvider(elemento, 'Editar');
                                onClick();
                    }}>Editar</button> {"   "} 
                  <button className="btn btn-danger" onClick={()=>onSelectProvider(elemento, 'Eliminar')}>Eliminar</button></td>
                </tr>
              ))
              }
            </tbody>
          </table>
          <AddNewfab/>
          <ProviderModal />
    </div>
    
);

}