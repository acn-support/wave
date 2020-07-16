'use strict';

// API Builder

const socket = new WebSocket('wss://' + location.host);

const buildAPI = (methods, socket = null) => {
  const api = {};
  for (const method of methods) {
    api[method] = (args = {}) => new Promise((resolve, reject) => {
      if (socket) {
        socket.send(JSON.stringify({ method, args }));
        socket.onmessage = event => {
          const obj = JSON.parse(event.data);
          if (obj.result !== 'error') resolve(obj);
          else reject(new Error(`Status Code: ${obj.reason}`));
        };
      } else {
        fetch(`/api/${method}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(args),
        }).then(res => {
          const { status } = res;
          if (status === 200) resolve(res.json());
          else reject(new Error(`Status Code: ${status}`));
        });
      }
    });
  }
  return api;
};

let api = buildAPI(['status', 'signIn', 'introspection'], socket);

const signIn = async () => {
  try {
    await api.status();
  } catch (err) {
    await api.signIn({ login: 'user', password: 'nopassword' });
  }
  const methods = await api.introspection();
  api = buildAPI(methods, socket);
};

window.addEventListener('load', () => {
  signIn();
});
