
import { db } from './index.js';

const dataChecking = (body) => {
  const keys = Object.keys(body);
  if (keys.length !== 3) {
    throw ('property error');
  }
  if (body.username === '' || body.username === undefined) {
    throw ('username not found');
  }
  if (body.age === '' || body.age === undefined) {
    throw ('age not found');
  }
  if (!Array.isArray(body.hobbies) || body.hobbies === undefined) {
    throw ('hobbies not found');
  }
  if (typeof body.username !== 'string') {
    throw ('username not string');
  }
  if (typeof body.age !== 'number') {
    throw ('age not number');
  }
}

const bodyParser = async (request) => {
  return new Promise((resolve, reject) => {
    let totalChunked = ""
    request
      .on("error", err => {
        console.error(err);
        reject();
      })
      .on("data", chunk => {
        totalChunked += chunk;
      })
      .on("end", () => {
        // const req = JSON.parse(totalChunked);
        // const reqKeys = Object.keys(req);
        
        request.body = totalChunked;
        resolve();
      });
  });
};

export default async (request, response, idCount) => {
    try {
      await bodyParser(request);
      request.body = JSON.parse(request.body);
      dataChecking(request.body);
      const id = idCount;
      request.body.id = id;
      db.push(request.body);
      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(JSON.stringify(request.body));
      response.end();
    } catch (err) {
      response.writeHead(400, { "Content-type": "text/plain" });
      response.write("Invalid body data was provided");
      response.end();
      console.log(err);
    }
  };
