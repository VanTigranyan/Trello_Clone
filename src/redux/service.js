import api from "./api";
import axios from "axios";
import authTypes from './types/authTypes';
import jwt from "jsonwebtoken";

function isLoggedIn() {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return false;
  }
  const decoded = jwt.decode(accessToken);
  const dateNow = new Date();
  return !(!decoded || (decoded && decoded.exp < dateNow.getTime() / 1000));
}

function _getUserFromToken(token) {
  const decoded = jwt.decode(token);
  if (decoded) {
    return {
      email: decoded.email,
      name: decoded.name,
      surname: decoded.surname,
      userId: decoded.user
    };
  }
  return false;
}

function setAuthorizationToken(store, accessToken) {
  axios.defaults.baseURL = api.BASE_URL;
  if(!isLoggedIn()) {
    return;
  }
  const token = accessToken ? accessToken : localStorage.getItem('accessToken');

  if (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  }
  if (store) {
    const user = _getUserFromToken(token);
    if (user) {
      if (store) {
        store.dispatch({
          type: authTypes.SET_LOGIN_STATE, isLoggedIn: true,
          payload: user
        });
      }
    } else {
      // delete axios.defaults.headers.common['Authorization'];
      // store.dispatch({type: authTypes.SET_LOGIN_STATE, loggedIn: false});
    }
  }
}

/*
* USER API CALLS
*/
function login(data) {
  return axios({
    method: "post",
    url: api.LOGIN,
    data: data
  });
}

function register(data) {
  return axios({
    method: 'post',
    url: api.REGISTER,
    data: data
  })
}

function updateUser(data) {
  return axios({
    method: 'put',
    url: api.UPDATE_USER,
    data: data
  })
}

function getUserById(id) {
  return axios({
    method: 'get',
    url: api.USER_BY_ID + "/" + id
  })
}

function getCurrentUser() {
  return axios.get(api.CURRENT_USER)
}

function deleteUser(id) {
  return axios({
    method: 'get',
    url: api.DELETE_USER + "/" + id
  })
}

function createBoard(data) {
  return axios({
    method: 'post',
    url: api.CREATE_BOARD,
    data: data
  })
}

function getBoards() {
  return axios.get(api.GET_BOARDS);
}

function updateBoard(data) {
  return axios({
    method: 'put',
    url: api.UPDATE_BOARD,
    data: data
  })
}

function deleteBoard(id) {
  return axios.delete(api.DELETE_BOARD + '/' + id)
}

function createList(obj) {
  return axios({
    method: 'post',
    url: api.CREATE_LIST,
    data: obj
  })
}

function getLists(boardId) {
  return axios.get(api.GET_LISTS + '/' + boardId)
}

function updateList(obj) {
  return axios({
    method: 'put',
    url: api.UPDATE_LIST,
    data: obj,
  })
}

function deleteList(listId) {
  return axios.delete(api.DELETE_LIST + "/" + listId);
}

function createCard(obj) {
  return axios({
    method: 'post',
    url: api.CREATE_CARD,
    data: obj,
  })
}

function getCards(listId) {
  return axios.get(api.GET_CARDS + "/" + listId);
}

function updateCard(obj) {
  return axios({
    method: 'put',
    url: api.UPDATE_CARD,
    data: obj,
  })
}

function deleteCard(cardId) {
  return axios.delete(api.DELETE_CARD + "/" + cardId);
}


export default {
  isLoggedIn,
  setAuthorizationToken,
  _getUserFromToken,
  login,
  register,
  updateUser,
  getUserById,
  getCurrentUser,
  deleteUser,
  createBoard,
  getBoards,
  updateBoard,
  deleteBoard,
  createList,
  getLists,
  updateList,
  deleteList,
  createCard,
  getCards,
  updateCard,
  deleteCard,
};
