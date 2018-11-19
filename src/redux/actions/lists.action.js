import listsTypes from '../types/lists.types';
import Service from '../service';

export const getListsAction = (boardId) => (dispatch) => {
  dispatch({
    type: listsTypes.GET_LISTS_FETCHING
  })
  Service.getLists(boardId)
    .then(res => {
      dispatch({
        type: listsTypes.GET_LISTS_SUCCESS,
        payload: res.data,
        board: boardId
      })
    })
    .catch(err => {
      dispatch({
        type: listsTypes.GET_LISTS_FAILURE,
        payload: err.response.data.message || err
      })
    })
}


export const createListAction = (obj) => dispatch => {
  dispatch({
    type: listsTypes.CREATE_LIST_FETCHING
  })
  Service.createList(obj)
    .then(res => {
      dispatch({
        type:listsTypes.CREATE_LIST_SUCCESS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: listsTypes.CREATE_LIST_FAILURE,
        payload: err.response.data.message || err
      })
    })
}

export const updateListAction = (obj, i) => dispatch => {
  dispatch({
    type: listsTypes.UPDATE_LIST_FETCHING
  })
  Service.updateList(obj)
    .then(res => {
      dispatch({
        type: listsTypes.UPDATE_LIST_SUCCESS,
        i: i,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: listsTypes.UPDATE_LIST_FAILURE,
        payload: err.response.data.message || err
      })
    })
}

export const deleteListAction = (listId, i) => dispatch => {
  dispatch({
    type: listsTypes.DELETE_LIST_FETCHING
  })
  Service.deleteList(listId)
    .then(res => {
      dispatch({
        type: listsTypes.DELETE_LIST_SUCCESS,
        i: i,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: listsTypes.DELETE_LIST_FAILURE,
        payload: err.response.data.message || err
      })
    })
}

export const createCardAction = (obj, listIndex) => dispatch => {
  dispatch({
    type: listsTypes.CREATE_CARD_FETCHING
  })
  Service.createCard(obj)
    .then(res => {
      dispatch({
        type: listsTypes.CREATE_CARD_SUCCESS,
        payload: res.data,
        listInd: listIndex,
      })
    })
    .catch(err => {
      dispatch({
        type: listsTypes.CREATE_CARD_FAILURE,
        payload: err.response.data.message || err
      })
    })
}

export const updateCardAction = (obj, i, listIndex) => dispatch => {
  dispatch({
    type: listsTypes.UPDATE_CARD_FETCHING
  })
  Service.updateCard(obj)
    .then(res => {
      dispatch({
        type: listsTypes.UPDATE_CARD_SUCCESS,
        cardInd: i,
        listInd: listIndex,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: listsTypes.UPDATE_CARD_FAILURE,
        payload: err.response.data.message || err
      })
    })
}

export const deleteCardAction = (cardId, i, listIndex) => dispatch => {
  dispatch({
    type: listsTypes.DELETE_CARD_FETCHING
  })
  Service.deleteCard(cardId)
    .then(res => {
      dispatch({
        type: listsTypes.DELETE_CARD_SUCCESS,
        paylaod: res.data,
        cardInd: i,
        listInd: listIndex
      })
    })
    .catch(err => {
      dispatch({
        type: listsTypes.DELETE_CARD_FAILURE,
        paylaod: err.response.data.message || err
      })
    })
}
export const reorderListAction = (lists) => dispatch => {
  dispatch({
    type: 'REORDER_LISTS',
    payload: lists
  })
}
