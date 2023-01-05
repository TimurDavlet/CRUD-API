
const bodyParser = async (request) => {
  return new Promise((resolve, reject) => {
    let totalChunked = ""
    request
      .on("error", err => {
        console.error(err);
        reject();
      })
      .on("data", chunk => {
        console.log(JSON.parse(chunk));
        totalChunked += chunk;
      })
      .on("end", () => {
        request.body = JSON.parse(totalChunked);
        resolve();
      })
  })
};

export default async (request, response, db) => {
    try {
      await bodyParser(request)
      db.push(request.body)
      response.writeHead(200, { "Content-Type": "application/json" })
      response.write(JSON.stringify(db))
      response.end()
    } catch (err) {
      response.writeHead(400, { "Content-type": "text/plain" })
      response.write("Invalid body data was provided")
      response.end()
    }
  };
