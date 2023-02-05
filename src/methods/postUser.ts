import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../server';
import { bodyParser, dataChecking } from '../helpers/helper';

interface Person {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

const post = async (request: IncomingMessage, response: ServerResponse) => {
  try {
    const data = await bodyParser(request);
    const body: Person = JSON.parse(data as string);
    dataChecking(body);
    const user: Person = {
      id: uuidv4(),
      username: body.username,
      age: body.age,
      hobbies: body.hobbies,
    };
    db.push(user);
    response.writeHead(201, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(user));
    response.end();
  } catch (err) {
    console.log(err);
    response.writeHead(400, { 'Content-type': 'text/plain' });
    response.write('Invalid body data was provided');
    response.end();
  }
};

export default post;
