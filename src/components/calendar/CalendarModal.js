import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Modal from 'react-modal';
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';
import { uiCloseModal } from '../../actions/ui';
import { eventStartAddNew, eventClearActiveEvent, eventStartUpdate, eventStartFileLoading, eventDeleteFile } from '../../actions/events';
import Select from 'react-select';
import { providerStartLoading } from '../../actions/providers';

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

const now = moment().minutes(1).seconds(0).add(1,'hours');
const nowPlus1 = now.clone().add(1, 'hours');

const initEvent = {
    provider: '',
    observation: '',
    amount: 0,
    start: now.toDate(),
    end: nowPlus1.toDate(),
    paymentMethod: '',
    status: '',
    file: [],
    processed: false
}

export const CalendarModal = () => {
    
   const {modalOpen} = useSelector( state => state.ui );
   const { activeEvent } = useSelector( state => state.calendar );
   const { providers } = useSelector( state => state.provider );
   const {roles} = useSelector(state => state.auth);

   const dispatch = useDispatch();


    const [, setDateEnd] = useState(nowPlus1.toDate());
    const [, setStatus1] = useState();

    const [, setPaymentMenthod] = useState();
    const [, setProcessed] = useState();

    const [, setTitleValid] = useState(true);
    const [, setFileSelected] = useState();

    const [formValues, setformValues] = useState( initEvent );
    
    const { observation, amount, provider, end, paymentMethod, status, file, processed } = formValues;

    const [providerState, setProviderState] = useState();

    useEffect(() => {
        dispatch(providerStartLoading());
    }, [dispatch]);

    useEffect(() => {
        if (activeEvent) {
            const {provider} = activeEvent;
            const {id} = provider; 
            setformValues(activeEvent);
            setProviderState(id);
        } else {
            setformValues(initEvent);
        }
    }, [activeEvent, setformValues])

    const handleInputChange = ({ target }) => {
        setformValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const closeModal = () => {
        dispatch( uiCloseModal() );
        dispatch( eventClearActiveEvent() );
        setformValues( initEvent );
    }

    const handleEndDateChange = ( e ) => {
        setDateEnd( e );
        setformValues({
            ...formValues,
            end: e
        });
    }

    const statusOptions = [
        { value: 'TOPAY', label: 'A pagar' },
        { value: 'PAID', label: 'Pagado' },
        { value: 'ANNULLED', label: 'Anulado' }
      ]

    const paymentMethodOptions = [
        { value: 'CASH', label: 'Efectivo' },
        { value: 'CHECK', label: 'Cheque' },
        { value: 'CREDIT_CARD', label: 'Tarjeta de crédito' },
        { value: 'TRANSFER', label: 'Transferencia' }
      ]

    const processedOptions = [
        { value: true, label: 'Procesado' },
        { value: false, label: 'No procesado' }
      ]

    const providersOptions = 
        providers.map((provider) => {
            return { label: provider.name, value: provider.id };
          });

      const handleSelectChange = (e) => {
        setStatus1(e.value);

        setformValues({
            ...formValues,
            status: e.value,
        });
      }

      const handleSelectPaymentMethodChange = (e) => {
        setPaymentMenthod(e.value);

        setformValues({
            ...formValues,
            paymentMethod: e.value,
        });
      }

      const handleProcessedChange = (e) => {
        setProcessed(e.value);

        setformValues({
            ...formValues,
            processed: e.value,
        });
      }

      const handleSelectProviderChange = (e) => {
        setProviderState(e.value);

        setformValues({
            ...formValues,
            provider: e.value
        });
      }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        let formData = new FormData();
        const imagedata = document.querySelector('input[type="file"]').files;
        const endDate = new Date(end).toISOString();

        formData.set('provider', providerState);
        formData.set('start', endDate);
        formData.set('status', status);
        formData.set('end', endDate);
        formData.set('observation', observation);
        formData.set('amount', amount);
        formData.set('payment_method', paymentMethod);

        for (let i = 0 ; i < imagedata.length ; i++) {
            if (imagedata[i].size > 10000000) {
                return Swal.fire('Error', 'El tamaño del archivo debe ser menor a 10 mb', 'error');
            } else {
                formData.append("file", imagedata[i]);
            }
        }

        if (providerState === '' || providerState === undefined) {
            return Swal.fire('Error', 'Debe Seleccionar un proveedor', 'error');
        }

        if (paymentMethod === '' || paymentMethod === undefined) {
            return Swal.fire('Error', 'Debe seleccionar un medio de pago', 'error');
        }

        if ( activeEvent ) {
            dispatch( eventStartUpdate( formData, formValues ));
        } else {
            dispatch( eventStartAddNew( formData ));
        }

        setTitleValid(true);
        closeModal();
    }

    const selectFile=(elemento)=>{
        setFileSelected(elemento);
        dispatch(eventStartFileLoading(elemento));
    }

    const deleteFile = (elemento, event) => {
        setFileSelected(elemento);
        dispatch(eventDeleteFile(elemento, event));
        closeModal();
    }

    return (
       <Modal
         isOpen={ modalOpen }
         onRequestClose={ closeModal }
         style={ customStyles }
         closeTimeoutMS={ 200 }
         overlayClassName="modal-fondo"
         className="modal"
       >
           <h1> {(activeEvent) ? 'Editar pago': 'Nuevo evento' } </h1>
                <hr />
                <form 
                    className="container"
                    onSubmit={ handleSubmitForm }
                >
                    <div>
                        <label>Fecha de pago</label>
                        <DateTimePicker 
                            onChange={ handleEndDateChange }
                            value={ end }
                            className="form-control"
                            disabled={roles.includes('ROLE_USER')}
                        />
                    </div>
                    <hr />
                    <div className="form-group">
                    <label>Proveedor</label>
                    <Select
                        defaultValue={{ label: provider.name, value: provider.id }}
                        options={providersOptions}
                        onChange={handleSelectProviderChange}
                        name="provider"
                        required
                        isDisabled={roles.includes('ROLE_USER')}
                    />
                    </div> 
                    <div className="form-group">
                        <label>Monto</label>
                        <input 
                            type="number" 
                            className="form-control"
                            placeholder="Monto a pagar"
                            name="amount"
                            autoComplete="off"
                            value={ amount }
                            onChange={ handleInputChange }
                            disabled={roles.includes('ROLE_USER')}
                        />
                    </div>
                    <div className="form-group">
                        <textarea 
                            type="text" 
                            className="form-control"
                            placeholder="Observaciones"
                            rows="5"
                            name="observation"
                            value={ observation }
                            onChange={ handleInputChange }
                        ></textarea>
                        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                    </div>
                    <div className="form-group">
                        <label>Medio de pago</label>
                            <Select
                                defaultValue={{ label: (paymentMethod === 'CASH' ? 'Efectivo' : (paymentMethod === 'CHECK') ? 'Cheque' : (paymentMethod === 'TRANSFER') ? 'Transferencia' : (paymentMethod === 'CREDIT_CARD') ? 'Tarjeta de crédito' : 'Seleccionar'), value: paymentMethod }}
                                options={paymentMethodOptions}
                                onChange={handleSelectPaymentMethodChange}
                                name="paymentMethod"
                                required
                                isDisabled={roles.includes('ROLE_USER')}
                            />
                    </div>
                    {roles.includes('ROLE_USER') &&
                    <div className="form-group">
                        <label>Procesado?</label>
                            <Select
                                defaultValue={{ label: (processed === true ? 'Procesado' : (processed === false) ? 'No procesado' : 'Seleccionar'), value: processed }}
                                options={processedOptions}
                                onChange={handleProcessedChange}
                                name="processed"
                                required
                            />
                    </div>
                    }
                    {activeEvent &&
                    <div className="form-group">
                        <label>Status</label>
                            <Select
                                defaultValue={{ label: (status === 'ANNULLED' ? 'Anulado' : (status === 'TOPAY') ? 'A pagar' : (status === 'PAID') ? 'Pagado' : 'Selecionar..'), value: status }}
                                options={statusOptions}
                                onChange={handleSelectChange}
                                name="status1"
                                required
                                isDisabled={roles.includes('ROLE_USER')}
                            />
                    </div>
                    }
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
                            disabled={roles.includes('ROLE_USER')}
                        />
                    </div>
                    {file.map(elemento=> (
                        <ul key={elemento}>
                            <li>
                                {elemento} {formValues.id}
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
                                    Borrar
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
    )
}
