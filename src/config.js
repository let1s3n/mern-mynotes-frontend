
if (process.env.NODE_ENV === 'production') {

  export const API_URL = process.env.API_URL;
} else {
  export const API_URL = process.env.REACT_APP_API_URL;
}
