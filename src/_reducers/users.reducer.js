import { userConstants } from '../_constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      console.log("action",action.users);
      return {
        user: action.users.data
      };
    case userConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };


        case userConstants.HOMEPAGE_REQUEST:
          return {
            bekle: true
          };
        case userConstants.HOMEPAGE_SUCCESS:
          return {
            homepage: action.result
          };
        case userConstants.HOMEPAGE_FAILURE:
          return { 
            error: action.error
          };


          
        case userConstants.REGISTER_REQUEST:
          return {
            search_loading: true
          };
        case userConstants.REGISTER_SUCCESS:
          return {
            search: action.result
          };
        case userConstants.REGISTER_FAILURE:
          return { 
            error: action.error
          };

          



    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };
    default:
      return state
  }
}


export function search(state = {}, action) {
  switch (action.type) {
    case userConstants.SEARCH_REQUEST:
      return {
        search_loading: true
      }; 
        case userConstants.SEARCH_SUCCESS:
          return {
            search: action.result
          };
        case userConstants.SEARCH_FAILURE:
          return { 
            error: action.error
          };

          
    default:
      return state
  }
}
