import { db } from "./index.js";

const getPostId = (request, response, id) => {
    const result = db.filter(el => Number(el.id) === Number(id));
    if (result.length !== 0) {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(JSON.stringify(result));
      response.end();
    } else {
      response.writeHead(404, { "Content-Type": "text/plain" })
      response.write("userId not found")
      response.end()
    }
  }

const getPosts = (request, response) => {
  response.writeHead(200, { "Content-Type": "application/json" })
  response.write(JSON.stringify(db))
  response.end()
}

export const getUsers = (request, response, url) => {
    if (url === "/api/users" || url === "/api/users/") {
        return getPosts(request, response);
      }
      let getUrlApi = url.split('/');
      let isGetApi = `/${getUrlApi[1]}/${getUrlApi[2]}` === "/api/users";
      if (isGetApi) {
        let arrUrl = url.split('/');
        let id = arrUrl[arrUrl.length - 1];
        return getPostId(request, response, id);
      }
      response.writeHead(400, { "Content-Type": "text/plain" });
      response.write("REQUEST is invalid ");
      response.end();
}