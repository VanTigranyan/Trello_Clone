import authTypes from '../types/authTypes';
import Service from '../service';

const setAccessKey = (accessToken) => {
  localStorage.setItem('accessToken', accessToken);
  Service.setAuthorizationToken(null, accessToken);
};

export const loginAction = ({email, password}) => (dispatch) => {

  dispatch({
    type: authTypes.LOGIN_REQUEST_FETCHING
  });

  Service.login({email, password})
  .then(res => {

    setAccessKey(res.data.token);

    dispatch({
      type: authTypes.LOGIN_REQUEST_SUCCESS
    })

    dispatch({
      type: authTypes.SET_LOGIN_STATE,
      payload: Service._getUserFromToken(res.data.token)
    })

  })
  .catch(err => {
    dispatch({
      type: authTypes.LOGIN_REQUEST_FAIL,
      payload: err.response.data.message || err
    })
  })
}

export const registerAction = (data) => (dispatch) => {

  dispatch({
    type: authTypes.REGISTER_REQUEST_FETCHING
  })
  Service.register(data)
    .then(res => {
      dispatch({
        type: authTypes.REGISTER_REQUEST_SUCCESS,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err.response.message)
      dispatch({
        type: authTypes.LOGIN_REQUEST_FAIL,
        payload: err.response.data.message || err
      })
    })
}


export const logOutAction = () => (dispatch) => {
  localStorage.removeItem('accessToken');
  dispatch({
    type: authTypes.LOGOUT
  })
}


export const clearStateAction = {
  type: 'GET_BACK_TO_INITSTATE'
}
