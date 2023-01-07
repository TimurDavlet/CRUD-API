import { db } from "./server.js";
import { bodyParser, dataChecking } from './helpers.js';

const getPostId = (request, response, id) => {
    const result = db.filter(el => Number(el.id) === Number(id));
    if (result.length !== 0) {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(JSON.stringify(result[0]));
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

export const postHandler = async (request, response, idCount) => {
    try {
      await bodyParser(request);
      request.body = JSON.parse(request.body);
      dataChecking(request.body);
      const id = idCount;
      request.body.id = id;
      db.push(request.body);
      response.writeHead(201, { "Content-Type": "application/json" });
      response.write(JSON.stringify(request.body));
      response.end();
    } catch (err) {
      response.writeHead(400, { "Content-type": "text/plain" });
      response.write("Invalid body data was provided");
      response.end();
      console.log(err);
    }
  };

export const putPosts = async (request, response, url) => {
    if (url === "/api/users" || url === "/api/users/") {
        response.writeHead(400, { "Content-Type": "text/plain" });
        response.write("userId is invalid ");
        response.end();
    }
    try {
        await bodyParser(request);
        request.body = JSON.parse(request.body);
        dataChecking(request.body);
        let arrUrl = url.split('/');
        let id = arrUrl[arrUrl.length - 1];
        let elArrIndex = null;
        db.filter((el, index) => {
            if (Number(el.id) === Number(id)) {
                elArrIndex = index;
                return el;
            }
        });
        if (elArrIndex !== null) {
            request.body.id = id;
            db[elArrIndex] = request.body;
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify(request.body));
            response.end();
        } else {
            response.writeHead(404, { "Content-type": "text/plain" });
            response.write("userId not found");
            response.end();
        }
    } catch(err) {
        response.writeHead(400, { "Content-type": "text/plain" });
        response.write("Invalid body data was provided");
        response.end();
        console.log(err);
    }
}

export const deletePosts = async (request, response, url) => {
    if (url === "/api/users" || url === "/api/users/") {
        response.writeHead(400, { "Content-Type": "text/plain" });
        response.write("userId is invalid ");
        response.end();
    } else {
        try {
            let arrUrl = url.split('/');
            let id = arrUrl[arrUrl.length - 1];
            let elArrIndex = null;
            db.filter((el, index) => {
                if (Number(el.id) === Number(id)) {
                    elArrIndex = index;
                    return el;
                }
            });
            if (elArrIndex !== null) {
                db.splice(elArrIndex, 1);
                response.writeHead(204, { "Content-Type": "text/plain" });
                response.write("User delete");
                response.end();
            } else {
                response.writeHead(404, { "Content-type": "text/plain" });
                response.write("userId is invalid");
                response.end();
            }
        } catch(err) {
            response.writeHead(400, { "Content-type": "text/plain" });
            response.write("request error");
            response.end();
            console.log(err);
        }
    }
}
