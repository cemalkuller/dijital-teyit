import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    homepage,
    getAll,
    search,
    delete: _delete
};

function login(username, password) {

    return dispatch => {
        dispatch(alertActions.clear());
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    console.log("action" , user);
                    if(!user)
                    {
                        dispatch(failure("Lütfen Kullanıcı adı ve şifrenizi kontrol ediniz"));
                        dispatch(alertActions.error("Lütfen Kullanıcı adı ve şifrenizi kontrol ediniz"));
                    }
                    else
                    if(user.success)
                    {
                        dispatch(success(user));
                        history.push('/');
                    }
                    else 
                    {
                        dispatch(failure(user.message));
                        dispatch(alertActions.error(user.message));
                    }

                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(data) {
    return dispatch => {
        dispatch(request());

        userService.register(data)
            .then( searchs => dispatch(success(searchs)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.REGISTER_REQUEST } }
    function success(result) { return { type: userConstants.REGISTER_SUCCESS, result } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function search(data , type) {
    return dispatch => {
        dispatch(request());

        userService.search(data , type)
            .then( searchs => dispatch(success(searchs)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.SEARCH_REQUEST } }
    function success(result) { return { type: userConstants.SEARCH_SUCCESS, result } }
    function failure(error) { return { type: userConstants.SEARCH_FAILURE, error } }
}

function homepage(data) {
    return dispatch => {
        dispatch(request());

        userService.homepage(data)
            .then( homepages => dispatch(success(homepages)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.HOMEPAGE_REQUEST } }
    function success(result) { return { type: userConstants.HOMEPAGE_SUCCESS, result } }
    function failure(error) { return { type: userConstants.HOMEPAGE_FAILURE, error } }
}


function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then( users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}