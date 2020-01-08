import store from "../store";

export const fetchUser = () => {
  return {
    type: "FETCH_USER"
  };
};

export const fetchUserSuccess = user => {
  return {
    type: "FETCH_USER_SUCCESS",
    data: user
  };
};

export const fetchUserError = () => {
  return {
    type: "FETCH_USER_ERROR"
  };
};

export const thunkActionCreator = username => {
  const user = username.replace(/\s/g, "");
  store.dispatch(fetchUser());
  return function(dispatch, getState) {
    return fetch(`https://api.github.com/users/${user}`)
      .then(data => data.json())
      .then(data => {
        if (data.message === "Not Found") {
          throw new Error("No such user found!!");
        } else dispatch(fetchUserSuccess(data));
      })
      .catch(err => dispatch(fetchUserError()));
  };
};
