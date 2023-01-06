export const dataChecking = (body) => {
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

export const bodyParser = async (request) => {
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
        request.body = totalChunked;
        resolve();
      });
  });
};
