import axios from 'axios';

export default {

    createPermit(permit) {
        return axios.post('/permit', permit)
    },
    
    listPermits(){
        return axios.get('/permit')
    },

    getPermitAndInspectionIds() {
        return axios.get('/permit/inspections')
    },

    // getPermitTypes() {
    //     return axios.get('/permit/types')
    // },

    listPermitsByCustomer(customerId) {
        return axios.get(`/permit/customer/${customerId}`);
    },

    createPermitInspection(inspection) {
        return axios.post('/inspection', inspection)
    },

    updatePermitStatus(permit) {
        return axios.put(`/permit/${permit.permitId}`, permit)
    },

    openClosePermit(permitId) {
        console.log(permitId)
        return axios.put(`/permit/active/${permitId}`)
    },
    getInactivePermitsWithInspections() {
        return axios.get(`/permit/archive`)
    },

    updatePermit(permit) {
        console.log("PermitID: ", permit.permitId)
        return axios.put(`permit/edit-permit/${permit.permitId}`, permit)
    },

    getPermitById(permitId) {
        console.log("Reached get permit by id service")
        return axios.get(`permit/${permitId}`)
    },

    getPermitBySearchFields(searchedFields) {
        console.log("Searched fields: ", searchedFields)
        return axios.post('/permit/filter', searchedFields)
    }

    
}