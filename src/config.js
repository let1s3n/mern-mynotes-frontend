let HOME_URL;
if (process.env.NODE_ENV === 'production') {

  HOME_URL = process.env.HOME_URL;
} else {
  HOME_URL = process.env.REACT_APP_HOME_URL;
}

export default HOME_URL;