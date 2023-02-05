import { createServer } from 'http';
import get from './methods/getUsers';
import post from './methods/postUser';
import put from './methods/putUser';
import deleteUser from './methods/deleteUser';

interface DB {
  id: string,
  username: string,
  age: number,
  hobbies: string[]
}

export const db: DB[] = [];

export const server = createServer((request, response) => {
  const { url } = request;
  const { method } = request;

  const getUrlApi = url !== undefined ? url.split('/') : null;
  let isValidApi = false;
  if (getUrlApi !== null) {
    isValidApi = `/${getUrlApi[1]}/${getUrlApi[2]}` === '/api/users';
  }

  if (!isValidApi) {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify({ message: 'URL is invalid' }));
    response.end();
  } else {
    try {
      switch (method) {
        case 'GET':
          get(response, url);
          break;
        case 'POST':
          post(request, response);
          break;
        case 'PUT':
          put(request, response, url);
          break;
        case 'DELETE':
          deleteUser(response, url);
          break;

        default:
          response.writeHead(404, { 'Content-Type': 'application/json' });
          response.write(JSON.stringify({ message: 'Method Not Found' }));
          response.end();
      }
    } catch (err) {
      const errorMessage = `Server side error!\nDetailed error information:\n ${err}`;
      console.log(err);
      response.writeHead(500, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify({ message: errorMessage }));
      response.end();
    }
  }
});
