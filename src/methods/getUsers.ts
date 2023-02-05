import { ServerResponse } from 'http';
import { validate as uuidValidate } from 'uuid';
import AppConfig from '../configs/AppConfig';
import { db } from '../server';
import { getUserUuid } from '../helpers/helper';

const { API } = AppConfig;

const getAllUsers = (response: ServerResponse) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(db));
  response.end();
};

const getUserByUuid = (response: ServerResponse, uuid: string) => {
  const isUuidValid = uuidValidate(uuid);
  if (!isUuidValid) {
    response.writeHead(400, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify({ message: 'Uuid is invalid' }));
    response.end();
    return;
  }
  const result = db.filter((el) => el.id === uuid);
  if (result.length !== 0) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(result[0]));
    response.end();
  } else {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify({ message: 'Id not found' }));
    response.end();
  }
};

const get = (response: ServerResponse, url: string | undefined) => {
  if (url === API) {
    return getAllUsers(response);
  }
  const uuid = getUserUuid(url);
  return getUserByUuid(response, uuid);
};

export default get;
