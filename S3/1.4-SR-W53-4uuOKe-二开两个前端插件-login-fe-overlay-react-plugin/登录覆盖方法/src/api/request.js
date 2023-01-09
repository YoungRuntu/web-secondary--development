import axios from "axios";
import qs from "querystringify";

// if (process.env.NODE_ENV === "development") {
//   document.cookie =
//     "token=eyJhbGciOiJIUzI1NiJ9.eyJsb2dpblRpbWVzdGFtcCI6MTY3MjgyMEwMTc5NSwidXNlcklkIjoiMTIzNDU2Nzg5MCJ9.NCmOlFw_9_L-Kwz8tzywMehDrnMjYpcLO80CCGxjo5s";
//   document.cookie =
//     "refreshToken=eyJhbGciOiJIUzI1NiJ9.eyJsb2dpblRpbWVzdGFtcCI6MTY3MjgyMzEwMTg2Mn0.PsFHfnvjYpt8xId7YIN711pmybKBhLtGyRAZVFXJEBc";
//   document.cookie = "username=admin";
//   document.cookie = "windowOnline=true";
//   document.cookie = "XSRF-TOKEN=d21a54c9-dc36-4d31-9e5a-839f23babddf";
// }

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API}/sdata/rest`,
  timeout: 60000,
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },
  headers:
    (window.location.search && qs.parse(window.location.search).token) ||
      window.token
      ? { token: qs.parse(window.location.search).token || window.token }
      : {},
});

instance.defaults.headers.post["Content-Type"] = "application/json";

instance.interceptors.response.use(
  response => {
    let { data } = response;
    if (typeof data === "string") {
      data = JSON.parse(data);
    }
    if (data && data.status !== 200 && !(data instanceof Blob)) {
      return Promise.reject(response);
    }
    if (data instanceof Blob) {
      response.data = data;
      return response;
    }

    response.data = data && data.result;
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      return;
    }

    return Promise.reject(error.response);
  }
);

export default instance;
