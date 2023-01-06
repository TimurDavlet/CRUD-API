import { createServer } from "http";
import postHandler from "./postHendler.js";
import { getUsers } from "./method.js";

export const db = [{id: 1, username: 'Test', age: 28, hobbies: []},];
let idCount = 2;

const server = createServer((request, response) => {
  let url = request.url;
  let method = request.method;

  const putPosts = async (request, response) => {
    
  }

  let getUrlApi = url.split('/');
  let isGetApi = `/${getUrlApi[1]}/${getUrlApi[2]}` === "/api/users";

  if (isGetApi) {
    switch (method) {
      case "GET":
        getUsers(request, response, url);
      break;
      case "POST":
        if (url === "/api/users") {
          postHandler(request, response, idCount);
          idCount += 1;
        }
      break;
      putPosts(request, response)
        break;
  
      default:
        response.writeHead(404, { "Content-Type": "text/plain" })
        response.write("Method Not Found")
        response.end()
    }
  } else {
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.write("URL is invalid ");
      response.end();
  }
});

server.listen(4000, () => {
  console.log(`Server running on Port 4000`)
});
