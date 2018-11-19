import dashTypes from '../types/dashboard.types';
import Service from '../service';



export const getBoardsAction = () => (dispatch) => {
  console.log('action ----- get boards')
  dispatch({type: dashTypes.GET_BOARDS_FETCHING});


  Service.getBoards()
    .then(res => {

      dispatch({
        type: dashTypes.GET_BOARDS_SUCCESS,
        payload: res.data
      })

    })
    .catch(err => {

      dispatch({
        type: dashTypes.GET_BOARDS_FAILURE,
        payload: ''
      })

    })
}

export const createBoardAction = (obj) => dispatch => {
  dispatch({
    type: dashTypes.CREATE_BOARD_FETCHING
  })
  Service.createBoard(obj)
    .then(res => {

      dispatch({
        type: dashTypes.CREATE_BOARD_SUCCESS,
        payload: res.data
      })

    })
    .catch(err => {
      dispatch({
        type: dashTypes.CREATE_BOARD_FAILURE,
        payload: err.response.data.message || err
      })
    })
}

export const deleteBoardAction = (id, index) => dispatch => {
  dispatch({
    type: dashTypes.DELETE_BOARD_FETCHING
  })

  Service.deleteBoard(id)
    .then(res => {

      dispatch({
        type: dashTypes.DELETE_BOARD_SUCCESS,
        payload: index
      })
    })
    .catch(err => {
      dispatch({
        type: dashTypes.DELETE_BOARD_FAILURE,
        payload: err.response.data.message || err
      })
    })
}


export const updateBoardAction = (obj,index) => (dispatch) => {
  dispatch({
    type: dashTypes.UPDATE_BOARD_FETCHING
  })
  
  Service.updateBoard(obj)
    .then(res => {
      dispatch({
        type:dashTypes.UPDATE_BOARD_SUCCESS,
        index: index,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: dashTypes.UPDATE_BOARD_FAILURE,
        payload: err.response.data.message || err
      })
    })
}
