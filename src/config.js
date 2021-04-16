
if (process.env.NODE_ENV === 'production') {

  const API_URL = process.env.API_URL;
} else {
  const API_URL = process.env.REACT_APP_API_URL;
}

export default API_URL;