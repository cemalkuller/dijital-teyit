import { userConstants } from '../_constants';



export function search(state = {}, action) {
  switch (action.type) {
    case userConstants.SEARCH_REQUEST:
      return {
        search_loading: true
      }; 
        case userConstants.SEARCH_SUCCESS:
          return  action.result
          ;
        case userConstants.SEARCH_FAILURE:
          return { 
            error: action.error
          };

          
    default:
      return state
  }
}
