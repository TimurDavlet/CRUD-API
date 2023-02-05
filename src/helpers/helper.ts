import { IncomingMessage } from 'http';

export const bodyParser = async (request: IncomingMessage) => new Promise((resolve, reject) => {
  let totalChunked = '';
  request
    .on('error', (err) => {
      console.error(err);
      reject(err);
    })
    .on('data', (chunk) => {
      totalChunked += chunk;
    })
    .on('end', () => {
      resolve(totalChunked);
    });
});

export const dataChecking = (body: any) => {
  const keys = Object.keys(body);
  if (keys.length !== 3) {
    throw new Error('property error');
  }
  if (body.username === '' || body.username === undefined) {
    throw new Error('username not found');
  }
  if (body.age === '' || body.age === undefined) {
    throw new Error('age not found');
  }
  if (!Array.isArray(body.hobbies) || body.hobbies === undefined) {
    throw new Error('hobbies not found');
  }
  if (body.hobbies.length !== 0) {
    body.hobbies.forEach((el: any) => {
      if (typeof el !== 'string') {
        throw new Error('array contains more than just strings');
      }
    });
  }
  if (typeof body.username !== 'string') {
    throw new Error('username not string');
  }
  if (typeof body.age !== 'number') {
    throw new Error('age not number');
  }
};

export const getUserUuid = (url: string | undefined) => {
  const arrUrl = url !== undefined ? url.split('/') : [];
  const uuid = arrUrl[arrUrl.length - 1];
  return uuid;
};
