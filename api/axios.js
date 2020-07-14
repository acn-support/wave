({
  access: 'public',
  method:  async (axiosParams) => {
    try {
      let response = await api.axios(axiosParams);
      return { result: 'success', data: response.data, headers: response.headers };
    }
    catch (error) {
      console.error(`Ошибка при запросе Axios: ${error}`);
      return { result: 'error', error: error.message, axiosParams };
    }
  }
});
