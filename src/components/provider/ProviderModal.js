import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from "react-redux"
import { providerClearActiveProvider, providerDeleteFile, providerStartAddNew, providerStartUpdate } from '../../actions/providers';
import { uiCloseModal } from '../../actions/ui';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { eventStartFileLoading } from '../../actions/events';

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

const initProvider = {
    id: '',
    name: '',
    businessName: '',
    accountingArea: '',
    documentNumber: '',
    address: '',
    email: '',
    phone: 0,
    cellPhone: 0,
    usualPayment: '',
    acceptThirdPartyCheck: '',
    usualPaymentTerm: 0,
    withholdingAndPerceptionExempt: '',
    files: [],
    salesContact: {
        name: '',
        email: '',
        phone: 0
    },
    administrativeContact: {
        name: '',
        email: '',
        phone: 0
    } 
}

export const ProviderModal = () => {

    const {modalOpen} = useSelector( state => state.ui );
    const { activeProvider } = useSelector( state => state.provider );
    const dispatch = useDispatch();
    const [, setUsualPayment] = useState();
    const [, setAccountingArea] = useState();
    const [, setAcceptThirdPartyCheck] = useState();
    const [, setWithholdingAndPerceptionExempt] = useState();
    const [, setFileSelected] = useState();

    const [formValues, setFormValues] = useState(initProvider);

    const { id, name, businessName, accountingArea,
            documentNumber, address, email, phone,cellPhone,
            usualPayment, files, acceptThirdPartyCheck, usualPaymentTerm,
            withholdingAndPerceptionExempt, salesContact, administrativeContact,
            salesContactName = salesContact.name,
            salesContactEmail = salesContact.email,
            salesContactPhone = salesContact.phone,
            administrativeContactName = administrativeContact.name,
            administrativeContactEmail = administrativeContact.email,
            administrativeContactPhone = administrativeContact.phone} = formValues;

    useEffect(() => {
        if (activeProvider) {
            setFormValues(activeProvider);
        } else {
            setFormValues(initProvider);
        }
    }, [activeProvider, setFormValues]);

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const closeModal = () => {
        dispatch( uiCloseModal() );
        dispatch( providerClearActiveProvider() );
        setFormValues( initProvider );
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        let formProviderData = new FormData();
        const imagedata = document.querySelector('input[type="file"]').files;

        formProviderData.set('name', name);
        formProviderData.set('businessName', businessName);
        formProviderData.set('accountingArea', accountingArea);
        formProviderData.set('documentNumber', documentNumber);
        formProviderData.set('address', address);
        formProviderData.set('email', email);
        formProviderData.set('phone', phone);
        formProviderData.set('cellPhone', cellPhone);
        formProviderData.set('usualPayment', usualPayment);
        for (let i = 0; i < imagedata.length; i++) {
            formProviderData.append("file", imagedata[i]);
        }
        formProviderData.set('acceptThirdPartyCheck', acceptThirdPartyCheck);
        formProviderData.set('usualPaymentTerm', usualPaymentTerm);
        formProviderData.set('withholdingAndPerceptionExempt', withholdingAndPerceptionExempt);
        if (salesContactName !== '') {
            formProviderData.set('salesContact.name', salesContactName);  
        }
        if (salesContactEmail !== '') {
            formProviderData.set('salesContact.email', salesContactEmail);
        }
        if (salesContactPhone !== 0) {
            formProviderData.set('salesContact.phone', salesContactPhone);
        }
        if (administrativeContactName !== '') {
            formProviderData.set('administrativeContact.name', administrativeContactName);
        }
        if (administrativeContactEmail !== '') {
            formProviderData.set('administrativeContact.email', administrativeContactEmail);
        }
        if (administrativeContactPhone !== 0) {
            formProviderData.set('administrativeContact.phone', administrativeContactPhone);
        }
        

        if (name === '' || name === undefined) {
            return Swal.fire('Error', 'Debe ingresar un nombre corto para el proveedor', 'error');
        }

        if (accountingArea === '' || accountingArea === undefined) {
            return Swal.fire('Error', 'Debe seleccionar una zona contable', 'error');
        }

        if (usualPayment === '' || usualPayment === undefined) {
            return Swal.fire('Error', 'Debe seleccionar una forma de pago habitual', 'error');
        }

        if ( activeProvider ) {
            dispatch( providerStartUpdate( formProviderData, formValues) );
        } else {
            dispatch( providerStartAddNew( formProviderData ));
        }

        closeModal();
    }

    const usualPaymentOptions = [
        { value: 'CHECK', label: 'Cheque' },
        { value: 'THIRD_PARTY_CHECK', label: 'Cheque de terceros' },
        { value: 'TRANSFER', label: 'Transferencia' },
        { value: 'EFVO', label: 'EFVO'}
      ]

    const handleSelectUsualPaymentChange = (e) => {
        setUsualPayment(e.value);

        setFormValues({
            ...formValues,
            usualPayment: e.value
        });
      }

    const accountingAreaOptions = [
        { value: 'A', label: 'A'},
        { value: 'B', label: 'B'}
      ]

    const handleSelectAccountingAreaChange = (e) => {
        setAccountingArea(e.value);

        setFormValues({
            ...formValues,
            accountingArea: e.value
        });
      }

    const handleSelectAcceptThirdPartyCheckChange = (e) => {
        setAcceptThirdPartyCheck(e.value);

        setFormValues({
            ...formValues,
            acceptThirdPartyCheck: e.value
        });
      }  
      
    const handleSelectiWithholdingAndPerceptionExemptChange = (e) => {
        setWithholdingAndPerceptionExempt(e.value);

        setFormValues({
            ...formValues,
            withholdingAndPerceptionExempt: e.value
        });
      }  

    const acceptThirdPartyCheckOptions = [
        { value: false, label: 'NO'},
        { value: true, label: 'SI'}
      ]
    
    const selectFile=(elemento)=>{
        setFileSelected(elemento);
        dispatch(eventStartFileLoading(elemento));
    }

    const deleteFile = (elemento, provider) => {
        setFileSelected(elemento);
        dispatch(providerDeleteFile(elemento, provider));
        closeModal();
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
            <h1> {(activeProvider) ? 'Editar Proveedor' : 'Nuevo Proveedor'}</h1>
            <hr />
            <form
                className="container"
                onSubmit={ handleSubmitForm }
            >
                <div className="form-group">
                    <input 
                            type="text" 
                            className="form-control"
                            placeholder="Id del proveedor"
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
                            placeholder="Nombre corto del proveedor"
                            name="name"
                            autoComplete="off"
                            value={ name || ''}
                            onChange={ handleInputChange }
                        />
                </div>
                <div className="form-group">
                    <label>Razón social</label>
                    <input 
                            type="text" 
                            className="form-control"
                            placeholder="Razón social"
                            name="businessName"
                            autoComplete="off"
                            value={ businessName || ''}
                            onChange={ handleInputChange }
                        />
                </div>
                <div className="form-group">
                    <label>Cuit</label>
                    <input 
                            type="text" 
                            className="form-control"
                            placeholder="Cuit"
                            name="documentNumber"
                            autoComplete="off"
                            value={ documentNumber || ''}
                            onChange={ handleInputChange }
                        />
                </div>
                <div className="form-group">
                    <label>Dirección</label>
                    <input 
                            type="text" 
                            className="form-control"
                            placeholder="Dirección"
                            name="address"
                            autoComplete="off"
                            value={ address || ''}
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
                            value={ email || ''}
                            onChange={ handleInputChange }
                        />
                </div>
                <div className="form-group">
                    <label>Telefono</label>
                    <input 
                            type="number" 
                            className="form-control"
                            placeholder="Telefono"
                            name="phone"
                            autoComplete="off"
                            value={ phone }
                            onChange={ handleInputChange }
                        />
                </div>
                <div className="form-group">
                        <label>Pago Habitual</label>
                    <Select
                        defaultValue={{ label: (usualPayment === 'CHECK' ? 'Cheque' : (usualPayment === 'THIRD_PARTY_CHECK') ? 'Pago de terceros' : (usualPayment === 'TRANSFER') ? 'Transferencia' : 'Seleccionar'), value: usualPayment }}
                        options={usualPaymentOptions}
                        onChange={handleSelectUsualPaymentChange}
                        name="usualPayment"
                    />
                </div>
                <div className="form-group">
                        <label>Zona Contable</label>
                    <Select
                        defaultValue={{ label: (accountingArea === 'A' ? 'A' : (accountingArea === 'B') ? 'B' : 'Seleccionar'), value: accountingArea }}
                        options={accountingAreaOptions}
                        onChange={handleSelectAccountingAreaChange}
                        name="accountingArea"
                    />
                </div>
                <div className="form-group">
                        <label>Pago de terceros?</label>
                    <Select
                        defaultValue={{ label: (acceptThirdPartyCheck === false ? 'NO' : (acceptThirdPartyCheck === true) ? 'SI' : 'Seleccionar'), value: acceptThirdPartyCheck }}
                        options={acceptThirdPartyCheckOptions}
                        onChange={handleSelectAcceptThirdPartyCheckChange}
                        name="accountingArea"
                    />
                </div>
                <div className="form-group">
                    <label>Plazo de pago habitual(Días)</label>
                    <input 
                            type="number" 
                            className="form-control"
                            placeholder="Plazo de pago"
                            name="usualPaymentTerm"
                            autoComplete="off"
                            value={ usualPaymentTerm || 0 }
                            onChange={ handleInputChange }
                        />
                </div>
                <div className="form-group">
                        <label>Exento de retenciones o percepciones?</label>
                    <Select
                        defaultValue={{ label: (withholdingAndPerceptionExempt === false ? 'NO' : (withholdingAndPerceptionExempt === true) ? 'SI' : 'Seleccionar'), value: withholdingAndPerceptionExempt }}
                        options={acceptThirdPartyCheckOptions}
                        onChange={handleSelectiWithholdingAndPerceptionExemptChange}
                        name="accountingArea"
                    />
                </div>
                <h3>Contacto de venta</h3>
                <div className="form-group">
                    <label>Nombre</label>
                    <input 
                            type="text" 
                            className="form-control"
                            placeholder="Nombre"
                            name="salesContactName"
                            autoComplete="off"
                            onChange={ handleInputChange }
                            value={ salesContactName || ''}
                        />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input 
                            type="text" 
                            className="form-control"
                            placeholder="Email"
                            name="salesContactEmail"
                            autoComplete="off"
                            value={ salesContactEmail || ''}
                            onChange={ handleInputChange }
                        />
                </div>
                <div className="form-group">
                    <label>Teléfono</label>
                    <input 
                            type="number" 
                            className="form-control"
                            placeholder="Teléfono"
                            name="salesContactPhone"
                            autoComplete="off"
                            value={ salesContactPhone}
                            onChange={ handleInputChange }
                        />
                </div>
                <h3>Contacto administrativo</h3>
                <div className="form-group">
                    <label>Nombre</label>
                    <input 
                            type="text" 
                            className="form-control"
                            placeholder="Nombre"
                            name="administrativeContactName"
                            autoComplete="off"
                            value={ administrativeContactName || ''}
                            onChange={ handleInputChange }
                        />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input 
                            type="text" 
                            className="form-control"
                            placeholder="Email"
                            name="administrativeContactEmail"
                            autoComplete="off"
                            value={ administrativeContactEmail || ''}
                            onChange={ handleInputChange }
                        />
                </div>
                <div className="form-group">
                    <label>Teléfono</label>
                    <input 
                            type="number" 
                            className="form-control"
                            placeholder="Teléfono"
                            name="administrativeContactPhone"
                            autoComplete="off"
                            value={ administrativeContactPhone }
                            onChange={ handleInputChange }
                        />
                </div>
                <div className="form-group">
                        <label>Subir archivos</label>
                        <input 
                            type="file" 
                            className="form-control"
                            placeholder="file"
                            name="file"
                            id="fileId"
                            autoComplete="off"
                            multiple
                        />
                </div>
                {files.map(elemento=> (
                        <ul key={elemento}>
                            <li>{elemento} 
                               <button
                                    type="button" 
                                    className="btn btn-primary btn-sm" 
                                    onClick={() =>  { 
                                        selectFile(elemento);
                                }}> 
                                Descargar
                                </button>
                                <button
                                    type="button" 
                                    className="btn btn-danger btn-sm" 
                                    onClick={() =>  { 
                                        deleteFile(elemento, formValues);
                                }}> 
                                Eliminar
                                </button>
                            </li>     
                        </ul>
                        ))
                    }
                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                    >
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>
            </form>

        </Modal>
    );

}