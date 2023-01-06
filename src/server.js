import { createServer } from "http";
import { getUsers, putPosts, postHandler, deletePosts } from "./method.js";

// {username: 'Test', age: 28, hobbies: [], id: 1}
export const db = [];
let idCount = 2;

export const server = createServer((request, response) => {
  let url = request.url;
  let method = request.method;

  let getUrlApi = url.split('/');
  let isApi = `/${getUrlApi[1]}/${getUrlApi[2]}` === "/api/users";

  if (isApi) {
    switch (method) {
      case "GET":
        getUsers(request, response, url);
      break;
      case "POST":
        if (url === "/api/users" || url === "/api/users/") {
          postHandler(request, response, idCount);
          idCount += 1;
        } else {
          response.writeHead(404, { "Content-Type": "text/plain" });
          response.write("URL is invalid ");
          response.end();
        }
      break;
      case "PUT":
        putPosts(request, response, url);
      break;
      case "DELETE":
        deletePosts(request, response, url);
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
