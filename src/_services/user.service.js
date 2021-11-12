import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    applogin,
    AdminLogin,
    logout,
    register,
    search,
    get_categorys,
    get_sale,
    getAll,
    homepage,
    getById,
    update,
    getStatusSale,
    get_filters, 
    get_products,
    gibsorgu,
    forgot_password,
    getResetInfo,
    reset_password,
    getStatus ,
    downloadfile ,
    getCustomerRemote,
    getCustomerAddress,
    getSingleProduct,
    delete: _delete,
    adresGet,
    partnerStatuses,
    update_sales_status,
    docTypes,
    uploadDoc,
    getuserCustomerDocs,
    removeDoc,
    getCustomerTickets,
    addTicket,
    reportStatus,
    dynamicService,
    deleteMember,
    getReports,
    getReportsStatus,
    addCustomer,
    addSale,
    addGonderim,
    updateMember,
    newMember,
    getMemberReportsStatus,
    getMemberReports,
    profile,
    send_sms_sale
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    return fetch(`${config.apiUrl}/login`, requestOptions)
        .then(handleResponseLogin)
        .then(user => {
                if(user.success)
                {
                localStorage.setItem('user', JSON.stringify(user));
                return user;
                }
        
        });
}

function downloadfile(url,data) {


    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/`+url+'?'+data, requestOptions)
        .then(handleResponse)
        .then(sonuc => {
               return sonuc;
        });


   
}

  function uploadDoc(formData) {
    const requestOptions = {
        method: 'POST',
        body: formData,
        headers: authHeader()
    }; 
    return fetch(`${config.apiUrl}/uploadDoc`, requestOptions)
        .then(handleResponse)
        .then(sonuc => {
               return sonuc;
        });
}



function removeDoc(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/removeDoc/`+id, requestOptions)
        .then(handleResponse)
        .then(sonuc => {
               return sonuc;
        });
}


function getStatus(data) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/getSales?`+data, requestOptions)
        .then(handleResponse)
        .then(sonuc => {
               return sonuc;
        });
}


function getReports(data) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/getReports?`+data, requestOptions)
        .then(handleResponse)
        .then(sonuc => {
               return sonuc;
        });
}

function getMemberReports(data) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/getMemberReports?`+data, requestOptions)
        .then(handleResponse)
        .then(sonuc => {
               return sonuc;
        });
}


function getReportsStatus(data) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/getReportsStatus?`+data, requestOptions)
        .then(handleResponse)
        .then(sonuc => {
               return sonuc;
        });
}

function getMemberReportsStatus(data) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/getMemberReportsStatus?`+data, requestOptions)
        .then(handleResponse)
        .then(sonuc => {
               return sonuc;
        });
}




function getuserCustomerDocs(data) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/getuserCustomerDocs/`+data, requestOptions)
        .then(handleResponse)
        .then(sonuc => {
               return sonuc;
        });
}


function partnerStatuses() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/partnerStatuses`, requestOptions)
        .then(handleResponse)
        .then(sonuc => {
               return sonuc;
        });
}
function profile() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/profile`, requestOptions)
        .then(handleResponse)
        .then(sonuc => {
               return sonuc;
        });
}

function docTypes() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/docTypes`, requestOptions)
        .then(handleResponse)
        .then(sonuc => {
               return sonuc;
        });
}



function deleteMember(type, data="") {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/deleteMember/${type}/${data}`, requestOptions)
        .then(handleResponse)
        .then(sonuc => {
               return sonuc;
        });
}


function adresGet(type, data="") {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/adresGet/${type}/${data}`, requestOptions)
        .then(handleResponse)
        .then(sonuc => {
               return sonuc;
        });
}


function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/getAll`, requestOptions).then(handleResponse);
}

function reportStatus() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/reportStatus`, requestOptions).then(handleResponse);
}

function dynamicService(url) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/`+url, requestOptions).then(handleResponse);
}

function applogin(url) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/`+url, requestOptions)
    .then(handleResponse)
    .then(user => {
        if(user.success)
        {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        }
        else 
        {
            window.location.href = "https://www.maya.abonesepeti.com/";
        }

       
    });
}



function AdminLogin(url) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/`+url, requestOptions)
    .then(handleResponse)
    .then(user => {
        if(user.success)
        {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        }
        else 
        {
            window.location.href = "/";
        }

       
    });
}








function logout() {

    localStorage.removeItem('user');
     
}

function homepage(states) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    var data = JSON.stringify(states) ;
    return fetch(`${config.apiUrl}/homePage?data=`+data, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}



function getCustomerRemote(tck) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/getCustomerRemote/`+tck, requestOptions).then(handleResponse);
}

function getSingleProduct(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/getSingleProduct/`+id, requestOptions).then(handleResponse);
}


function getCustomerAddress(tck) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/getCustomerAddress/`+tck, requestOptions).then(handleResponse);
}

function getCustomerTickets(token) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/getCustomerTickets/`+token, requestOptions).then(handleResponse);
}





function search(q , type) {
    console.log(q , type);
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/search_customer/`+q+'/'+type, requestOptions).then(handleResponse);
}



function get_categorys() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/categorys`, requestOptions).then(handleResponse);
}

function get_filters(filtre) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/filters/`+filtre, requestOptions).then(handleResponse);
}


function gibsorgu(data) {
    const head = authHeader() ;
  
    head['Content-Type'] = 'application/json';
    const requestOptions = {
        method: 'POST',
        headers: head,
        body: JSON.stringify(data)
    };
    return fetch(`${config.apiUrl}/gibsorgu`, requestOptions).then(handleResponse);
}


function forgot_password(data) {
    const head = authHeader() ;
  
    head['Content-Type'] = 'application/json';
    const requestOptions = {
        method: 'POST',
        headers: head,
        body: JSON.stringify(data)
    };
    return fetch(`${config.apiUrl}/forgot_password`, requestOptions).then(handleResponse);
}

function getResetInfo(data) {
    const head = authHeader() ;
  
    head['Content-Type'] = 'application/json';
    const requestOptions = {
        method: 'POST',
        headers: head,
        body: JSON.stringify(data)
    };
    return fetch(`${config.apiUrl}/getResetInfo`, requestOptions).then(handleResponse);
}

function reset_password(data) {
    const head = authHeader() ;
  
    head['Content-Type'] = 'application/json';
    const requestOptions = {
        method: 'POST',
        headers: head,
        body: JSON.stringify(data)
    };
    return fetch(`${config.apiUrl}/reset_password`, requestOptions).then(handleResponse);
}


function register(data) {
    const head = authHeader() ;

    head['Content-Type'] = 'application/json';
    const requestOptions = {
        method: 'POST',
        headers: head,
        body: JSON.stringify(data)
    };
    return fetch(`${config.apiUrl}/register`, requestOptions).then(handleResponse);
}

function get_products(data,get) {
    const head = authHeader() ;
  
    head['Content-Type'] = 'application/json';
    const requestOptions = {
        method: 'POST',
        headers: head,
        body: JSON.stringify(data)
    };
    return fetch(`${config.apiUrl}/get_products`+get, requestOptions).then(handleResponse);
}


function addGonderim(data) {
    const head = authHeader() ;
  
    head['Content-Type'] = 'application/json';
    const requestOptions = {
        method: 'POST',
        headers: head,
        body: JSON.stringify(data)
    };
    return fetch(`${config.apiUrl}/addGonderim`, requestOptions).then(handleResponse);
}



function update_sales_status(data,get) {
    const head = authHeader() ;
  
    head['Content-Type'] = 'application/json';
    const requestOptions = {
        method: 'POST',
        headers: head,
        body: JSON.stringify(data)
    };
    return fetch(`${config.apiUrl}/update_sales_status/`+get, requestOptions).then(handleResponse);
}



function send_sms_sale(get) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/bayi_kimlik_iptal/`+get, requestOptions).then(handleResponse);
}





function addTicket(data) {
    const head = authHeader() ;
  
    head['Content-Type'] = 'application/json';
    const requestOptions = {
        method: 'POST',
        headers: head,
        body: JSON.stringify(data)
    };
    return fetch(`${config.apiUrl}/addTicket`, requestOptions).then(handleResponse);
}



function addCustomer(data) {
    const head = authHeader() ;
  
    head['Content-Type'] = 'application/json';
    const requestOptions = {
        method: 'POST',
        headers: head,
        body: JSON.stringify(data)
    };
    return fetch(`${config.apiUrl}/addCustomer`, requestOptions).then(handleResponse);
}

function addSale(data) {
    const head = authHeader() ;
  
    head['Content-Type'] = 'application/json';
    const requestOptions = {
        method: 'POST',
        headers: head,
        body: JSON.stringify(data)
    };
    return fetch(`${config.apiUrl}/addSale`, requestOptions).then(handleResponse);
}


function updateMember(data) {
    const head = authHeader() ;
  
    head['Content-Type'] = 'application/json';
    const requestOptions = {
        method: 'POST',
        headers: head,
        body: JSON.stringify(data)
    };
    return fetch(`${config.apiUrl}/updateMember`, requestOptions).then(handleResponse);
}

function newMember(data) {
    const head = authHeader() ;
  
    head['Content-Type'] = 'application/json';
    const requestOptions = {
        method: 'POST',
        headers: head,
        body: JSON.stringify(data)
    };
    return fetch(`${config.apiUrl}/new_member`, requestOptions).then(handleResponse);
}



function get_sale(token) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/singleSale/`+token, requestOptions).then(handleResponse);
}


function getStatusSale() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/getStatusSale`, requestOptions).then(handleResponse);
}



function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}
function handleResponseLogin(response) {

    return response.text().then(text => {
        const data = text && JSON.parse(text);
        return data;
    });
}

function handleResponse(response) {
   
    console.log(response);
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log(data);
        if (!response.ok) {
            if (response.status === 401) {
               
                logout();
                
               location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}