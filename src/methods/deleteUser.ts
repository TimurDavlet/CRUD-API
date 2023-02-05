import { ServerResponse } from 'http';
import { validate as uuidValidate } from 'uuid';
import { db } from '../server';
import { getUserUuid } from '../helpers/helper';

const deleteUser = async (response: ServerResponse, url: string | undefined) => {
  try {
    const uuid = getUserUuid(url);
    const isUuidValid = uuidValidate(uuid);
    if (!isUuidValid) {
      response.writeHead(400, { 'Content-type': 'application/json' });
      response.write(JSON.stringify({ message: 'Uuid is invalid' }));
      response.end();
      return;
    }
    let elArrIndex = null;
    db.filter((el, index) => {
      if (el.id === uuid) {
        elArrIndex = index;
      }
      return el;
    });
    if (elArrIndex !== null) {
      db.splice(elArrIndex, 1);
      response.writeHead(204, { 'Content-Type': 'text/plain' });
      response.write('User delete');
      response.end();
    } else {
      response.writeHead(404, { 'Content-type': 'text/plain' });
      response.write('userId is invalid');
      response.end();
    }
  } catch (err) {
    response.writeHead(400, { 'Content-type': 'text/plain' });
    response.write('request error');
    response.end();
    console.log(err);
  }
};

export default deleteUser;
