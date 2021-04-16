const API_URL = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.API_URL;
  }
  return process.env.REACT_APP_API_URL;
}

export default API_URL;
