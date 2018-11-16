export const BASE_URL = "http://localhost:4000";

/*
* User API
*/
export const LOGIN = "/users/authenticate";
export const REGISTER = "/users/register";
export const CURRENT_USER = "/users/current";
export const USER_BY_ID = "/users/";
export const UPDATE_USER = "/users/";
export const DELETE_USER = "/users/";

/*
* BOARDS API
*/
export const CREATE_BOARD = "/boards/create";
export const GET_BOARDS = "/boards";
export const UPDATE_BOARD = "/boards";
export const DELETE_BOARD = "/boards";

/*
* LISTS API
*/
export const CREATE_LIST = "/lists/create";
export const GET_LISTS = "/lists";
export const UPDATE_LIST = "/lists";
export const DELETE_LIST = "/lists";

/*
* CARDS API
*/
export const CREATE_CARD = "/cards/create";
export const GET_CARDS = "/cards";
export const UPDATE_CARD = "/cards";
export const DELETE_CARD = "/cards";


export default {
  BASE_URL,
  LOGIN,
  REGISTER,
  CURRENT_USER,
  USER_BY_ID,
  UPDATE_USER,
  DELETE_USER,
  CREATE_BOARD,
  GET_BOARDS,
  UPDATE_BOARD,
  DELETE_BOARD,
  CREATE_LIST,
  GET_LISTS,
  UPDATE_LIST,
  DELETE_LIST,
  CREATE_CARD,
  GET_CARDS,
  UPDATE_CARD,
  DELETE_CARD,
}
