import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";


export const providerStartAddNew = (provider) => {
    return async(dispatch) => {

        try {
            const resp = await fetchWithToken('providers', provider, 'POST');
            const body = await resp.json();

            if (resp.status === 200) {
                provider.id = body.id;
                provider.name = body.name;
                provider.businessName = body.businessName;
                provider.accountingArea = body.accountingArea;
                provider.documentNumber = body.documentNumber;
                provider.address = body.address;
                provider.email = body.email;
                provider.phone = body.phone;
                provider.cellPhone = body.cellPhone;
                provider.usualPayment = body.usualPayment;
                provider.usualPaymentTerm = body.usualPaymentTerm;
                provider.acceptThirdPartyCheck = body.acceptThirdPartyCheck;
                provider.files = body.files;
                provider.withholdingAndPerceptionExempt = body.withholdingAndPerceptionExempt;
                provider.salesContact = body.salesContact;
                provider.administrativeContact = body.administrativeContact;

                dispatch(providerAddNew(provider));
            }

        } catch (error) {
            
        }  
    }
}

const providerAddNew = (provider) => ({
    type: types.providerAddNew,
    payload: provider
});

export const providerSetActive = (provider) => ({
    type: types.providerSetActive,
    payload: provider
});

export const providerClearActiveProvider = () => ({ type: types.providerClearActiveProvider });

export const providerStartUpdate = (provider2, provider) => {
    return async(dispatch) => {
        try {
            const resp = await fetchWithToken(`providers/${ provider.id }`, provider2, 'PUT');
            const body = await resp.json();

            if (resp.status === 200) {
                provider.id = body.id;
                provider.name = body.name;
                provider.businessName = body.businessName;
                provider.accountingArea = body.accountingArea;
                provider.documentNumber = body.documentNumber;
                provider.address = body.address;
                provider.email = body.email;
                provider.phone = body.phone;
                provider.cellPhone = body.cellPhone;
                provider.usualPayment = body.usualPayment;
                provider.usualPaymentTerm = body.usualPaymentTerm;
                provider.acceptThirdPartyCheck = body.acceptThirdPartyCheck;
                provider.files = body.files;
                provider.withholdingAndPerceptionExempt = body.withholdingAndPerceptionExempt;
                if (body.salesContact === null) {
                    provider.salesContact = {
                        name: null,
                        email: null,
                        phone: null
                    } 
                } else {
                    provider.salesContact = body.salesContact;
                }
                if (body.administrativeContact === null) {
                    provider.administrativeContact = body.administrativeContact = {
                        name: null,
                        email: null,
                        phone: null
                    }
                } else {
                    provider.administrativeContact = body.administrativeContact;
                }
            

                dispatch(providerUpdated(provider));
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
            
        } catch (error) {
            console.log(error);
        }
    }
}

const providerUpdated = (provider) => ({
    type: types.providerUpdated,
    payload: provider
});

export const providerStartLoading = (provider) => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithToken('providers');
            const body = await resp.json();

            const providers = body;

            dispatch(providerLoaded(providers));

        } catch (error) {
            console.log(error);
        }
    }
}

const providerLoaded = (providers) => ({
    type: types.providerLoaded,
    payload: providers
});

export const providerDeleteFile = (fileName, provider) => {
    return async(dispatch) => {
        try {
            const resp = await fetchWithToken(`providers/file/${ fileName }/provider/${ provider.id }`, {}, 'DELETE');
            const body = await resp.json(); 

            if (resp.status === 200) {

                provider.id = body.id;
                provider.name = body.name;
                provider.businessName = body.businessName;
                provider.accountingArea = body.accountingArea;
                provider.documentNumber = body.documentNumber;
                provider.address = body.address;
                provider.email = body.email;
                provider.phone = body.phone;
                provider.cellPhone = body.cellPhone;
                provider.usualPayment = body.usualPayment;
                provider.usualPaymentTerm = body.usualPaymentTerm;
                provider.acceptThirdPartyCheck = body.acceptThirdPartyCheck;
                provider.files = body.files;
                provider.withholdingAndPerceptionExempt = body.withholdingAndPerceptionExempt;

                dispatch( providerFileDeleted() );
                Swal.fire('Eliminado!','Archivo eliminado!','success')
            }

        } catch (error) {
            console.log(error)
        }
    }
}

const providerFileDeleted = () => ({ type: types.eventFileDeleted });

export const providerLogout = () => ({ type: types.providerLogout });
