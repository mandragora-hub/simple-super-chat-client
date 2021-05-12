// eslint-disable-next-line no-undef
const RestApiURL = process.env.REACT_APP_REST_API_URL;

async function client(
  endpoint,
  { data, token, method, headers: customHeaders, ...customConfig } = {}
) {
  const config = {
    method: method ? method : data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    credentials: 'include',
    headers: {
      // Authorization: token ? `Bearer ${token}` : undefined,
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders
    },
    ...customConfig
  };

  return window.fetch(`${RestApiURL}/${endpoint}`, config).then(async response => {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}

export { client };
