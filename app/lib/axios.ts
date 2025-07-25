import axios from 'axios'

axios.defaults.baseURL =
  process.env.NODE_ENV === 'development'
    ? process.env.LOCAL_BACKEND_URL
    : process.env.PROD_BACKEND_URL
axios.defaults.withCredentials = true

axios.interceptors.request.use(
  function (config) {
    console.log(
      'Sending request to backend: ',
      config.baseURL! + config.url!,
      'RequestData:',
      JSON.stringify(config.data)
    )
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    console.log(
      'Sending request to backend: ',
      response.config.baseURL! + response.config.url!,
      'RespnseData:',
      JSON.stringify(response.data)
    )
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)
