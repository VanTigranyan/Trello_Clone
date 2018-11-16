import dashTypes from '../types/dashboard.types';

const initState = {
  isFetching: false,
  boards: [],
  error: null,
}


export const boardsReducer = (state = initState, action = {}) => {
  switch(action.type) {

    case dashTypes.GET_BOARDS_FETCHING:
      return {...state, isFetching:true }
    case dashTypes.GET_BOARDS_SUCCESS:
      return {...state, isFetching: false, boards: action.payload }
    case dashTypes.GET_BOARDS_FAILURE:
      return {...state, isFetching: false, error: action.payload }

    case dashTypes.CREATE_BOARD_FETCHING:
      return {...state, isFetching:true}
    case dashTypes.CREATE_BOARD_SUCCESS:
      const oldBoards = state.boards;
      const boards = [...oldBoards, action.payload]
      return {...state, isFetching:false, boards}
    case dashTypes.CREATE_BOARD_FAILURE:
      return {...state, isFetching: false, error: action.payload}

    case dashTypes.DELETE_BOARD_FETCHING:
      return {...state, isFetching:true}
    case dashTypes.DELETE_BOARD_SUCCESS:
      let arr = state.boards;
      arr.splice(action.payload, 1);
      return {...state, isFetching: false, boards: arr};
    case dashTypes.DELETE_BOARD_FAILURE:
      return {...state, isFetching: false, error: action.payload};

    case dashTypes.UPDATE_BOARD_FETCHING:
      return {...state, isFetching: true};
    case dashTypes.UPDATE_BOARD_SUCCESS:
      let old = [...state.boards];
      old[action.index] = action.payload;
      return {...state, isFetching: false, boards: old};
    case dashTypes.UPDATE_BOARD_FAILURE:
      return {...state, isFetching: false, error: action.payload}


    default:
      return state;
  }
}


export default boardsReducer;
