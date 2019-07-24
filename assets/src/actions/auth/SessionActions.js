import Instance from '../../util/AxiosUtil';

export const LOGIN_STARTED = 'LOGIN_STARTED';
export const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const SIGN_UP_STARTED = 'SIGN_UP_STARTED';
export const SIGN_UP_SUCCEEDED = 'SIGN_UP_SUCCEEDED';
export const SIGN_UP_FAILED = 'SIGN_UP_FAILED';

export const LOGOUT_STARTED = 'LOGOUT_STARTED';
export const LOGOUT_SUCCEEDED = 'LOGOUT_SUCCEEDED';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const GET_SESSION_DATA_STARTED = 'GET_SESSION_DATA_STARTED';
export const GET_SESSION_DATA_SUCCEEDED = 'GET_SESSION_DATA_SUCCEEDED';
export const GET_SESSION_DATA_FAILED = 'GET_SESSION_DATA_FAILED';

const authUrl = '/auth';
const userUrl = '/users';

const onLoginStarted = () => ({
  type: LOGIN_STARTED,
});

const onLoginSucceeded = response => ({
  type: LOGIN_SUCCEEDED,
  response,
});

const onLoginFailed = error => ({
  type: LOGIN_FAILED,
  error,
});

const onSignUpStarted = () => ({
  type: SIGN_UP_STARTED,
});

const onSignUpSucceeded = response => ({
  type: SIGN_UP_SUCCEEDED,
  response,
});

const onSignUpFailed = error => ({
  type: SIGN_UP_FAILED,
  error,
});

const onLogoutStarted = () => ({
  type: LOGOUT_STARTED,
});

const onLogoutSucceeded = response => {
  return {
    type: LOGOUT_SUCCEEDED,
    response,
  };
};

const onLogoutFailed = error => {
  return {
    type: LOGOUT_FAILED,
    error,
  };
};

const onGetSessionDataStarted = () => ({
  type: GET_SESSION_DATA_STARTED,
});

const onGetSessionDataSucceeded = response => ({
  type: GET_SESSION_DATA_SUCCEEDED,
  response,
});

const onGetSessionDataFailed = error => ({
  type: GET_SESSION_DATA_FAILED,
  error,
});

const storeData = response => {
  const { data } = response;
  const { token } = data;
  sessionStorage.setItem('token', token);
};

export const getSessionData = () => dispatch => {
  dispatch(onGetSessionDataStarted());
  const getUrl = `${authUrl}/session`;
  return Instance.axiosInstance()
    .get(getUrl)
    .then(response => {
      dispatch(onGetSessionDataSucceeded(response));
      return response.data;
    })
    .catch(error => {
      const { response } = error;
      dispatch(onGetSessionDataFailed(response));
    });
};

export const login = params => dispatch => {
  dispatch(onLoginStarted());
  const sessionUrl = `${authUrl}/login`;
  return Instance.axiosInstance()
    .post(sessionUrl, params)
    .then(response => {
      storeData(response);
      dispatch(onLoginSucceeded(response));
      dispatch(onGetSessionDataSucceeded(response));
    })
    .catch(error => {
      const { response } = error;
      dispatch(onLoginFailed(response));
      throw error;
    });
};

export const signUp = params => dispatch => {
  dispatch(onSignUpStarted());
  const sessionUrl = `${userUrl}/register`;
  return Instance.axiosInstance()
    .post(sessionUrl, params)
    .then(response => {
      storeData(response);
      dispatch(onSignUpSucceeded(response));
      dispatch(onGetSessionDataSucceeded(response));
    })
    .catch(error => {
      const { response } = error;
      dispatch(onSignUpFailed(response));
      throw error;
    });
};

export const logout = () => dispatch => {
  dispatch(onLogoutStarted());
  const sessionUrl = `${authUrl}/logout`;
  sessionStorage.clear();
  return Instance.axiosInstance()
    .delete(sessionUrl)
    .then(response => {
      dispatch(onLogoutSucceeded(response));
    })
    .catch(error => {
      const { response } = error;
      dispatch(onLogoutFailed(response));
      throw response;
    });
};
