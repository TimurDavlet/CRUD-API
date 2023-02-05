import { IncomingMessage, ServerResponse } from 'http';
import { validate as uuidValidate } from 'uuid';
import { db } from '../server';
import { getUserUuid, bodyParser, dataChecking } from '../helpers/helper';

const put = async (request: IncomingMessage,
  response: ServerResponse,
  url: string | undefined) => {
  try {
    console.log('start put');
    const data = await bodyParser(request);
    const body = JSON.parse(data as string);
    dataChecking(body);
    const uuid = getUserUuid(url);
    const isUuidValid = uuidValidate(uuid);
    if (!isUuidValid) {
      response.writeHead(400, { 'Content-type': 'application/json' });
      response.write(JSON.stringify({ message: 'Uuid is invalid' }));
      response.end();
      return;
    }
    let elArrIndex = -1;
    db.filter((el, index) => {
      if (el.id === uuid) {
        elArrIndex = index;
      }
      return el;
    });
    if (elArrIndex !== -1) {
      body.id = uuid;
      db[elArrIndex] = body;
      console.log(body);
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify(db[elArrIndex]));
      response.end();
    } else {
      response.writeHead(404, { 'Content-type': 'application/json' });
      response.write(JSON.stringify({ message: 'userId not found' }));
      response.end();
    }
  } catch (err) {
    response.writeHead(400, { 'Content-type': 'application/json' });
    response.write(JSON.stringify({ message: 'Invalid body data was provided' }));
    response.end();
    console.log(err);
  }
};

export default put;
