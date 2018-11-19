import listsTypes from '../types/lists.types.js'

const initialState = {
  boardId: '',
  lists: [],

}


const listsReducer = (state = initialState, action = {}) => {
  switch(action.type) {

    /*
    * GET ALL LISTS
    */
    case listsTypes.GET_LISTS_FETCHING:
      return {...state, isFetching: true};
    case listsTypes.GET_LISTS_SUCCESS:
      return {...state, isFetching: false, boardId: action.board, lists: action.payload};
    case listsTypes.GET_LISTS_FAILURE:
      return {...state, isFetching: false, error: action.payload };


    /*
    * CREATE LIST
    */
    case listsTypes.CREATE_LIST_FETCHING:
      return {...state, isFetching: true}
    case listsTypes.CREATE_LIST_SUCCESS:
      return {...state, isFetching: false, lists: [...state.lists, action.payload]};
    case listsTypes.CREATE_LIST_FAILURE:
      return {...state, isFetching: false, error: action.paylaod};


    /*
    * UPDATE LIST
    */
    case listsTypes.UPDATE_LIST_FETCHING:
      return {...state, isFetching: true };
    case listsTypes.UPDATE_LIST_SUCCESS:
      let arr = [...state.lists];
      arr[action.i] = action.payload;
      return {...state, isFetching:false, lists: arr};
    case listsTypes.UPDATE_LIST_FAILURE:
      return {...state, isFetchingL: false, error: action.paylaod};


    /*
    * DELETE LIST
    */
    case listsTypes.DELETE_LIST_FETCHING:
      return {...state, isFetching: true};
    case listsTypes.DELETE_LIST_SUCCESS:
      let deleteArr = state.lists;
      deleteArr.splice(action.i, 1);
      return {...state, isFetching: false, lists: deleteArr};
    case listsTypes.DELETE_LIST_FAILURE:
      return {...state, isFetching: false, error: action.payload};

      /*
      * CREATE CARD
      */
      case listsTypes.CREATE_CARD_FETCHING:
        return {...state, isFetching: true}
      case listsTypes.CREATE_CARD_SUCCESS:
        let lists = state.lists;
        let list = lists[action.listInd];
        let cards = list.cards;
        let newCards = [...cards, action.payload];
        list.cards = newCards;
        lists[action.listInd] = list;
        return {...state, isFetching: false, i:action.i, lists: lists};
      case listsTypes.CREATE_CARD_FAILURE:
        return {...state, isFetching: false, error: action.paylaod};


        /*
        * UPDATE CARD
        */
        case listsTypes.UPDATE_CARD_FETCHING:
          return {...state, isFetching: true };
        case listsTypes.UPDATE_CARD_SUCCESS:
          let ulists = [...state.lists];
          let ulist = ulists[action.listInd];
          let ucards = [...ulist.cards];
          ucards[action.cardInd] = action.payload;
          ulist.cards = ucards;
          ulists[action.listInd] = ulist;
          return {...state, isFetching:false, lists: ulists};
        case listsTypes.UPDATE_CARD_FAILURE:
          return {...state, isFetchingL: false, error: action.paylaod};

          /*
          * Delete CARD
          */
          case listsTypes.DELETE_CARD_FETCHING:
            return {...state, isFetching: true };
          case listsTypes.DELETE_CARD_SUCCESS:
            let dlists = [...state.lists];
            let dlist = dlists[action.listInd];
            console.log(dlist);
            let dcards = [...dlist.cards];
            dcards.splice(action.cardInd, 1);
            dlist.cards = dcards;
            dlists[action.listInd] = dlist;
            return {...state, isFetching:false, lists: dlists};
          case listsTypes.DELETE_CARD_FAILURE:
            return {...state, isFetchingL: false, error: action.paylaod};

          /* Reorder Lists*/
        case 'REORDER_LISTS':
        console.log('lists---', action.payload)
          return {...state, lists: action.payload}

    default:  return state
  }
}

export default listsReducer;
