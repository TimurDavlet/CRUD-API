/* require('dotenv').config();
var MongoClient = require('mongodb').MongoClient;

// Обращение к переменным из .env, которые теперь доступны в process.env 
MongoClient.connect(process.env.DB_CONN, function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
}); */

import { createServer } from "http";
import postHandler from "./postHendler.js";

const db = [{id: 1, username: 'Test', age: 28, hobbies: []},];

const server = createServer((request, response) => {
  let url = request.url
  let method = request.method

  const getPosts = (request, response) => {
    response.writeHead(200, { "Content-Type": "application/json" })
    response.write(JSON.stringify(db))
    response.end()
  }

  const putPosts = async (request, response) => {
    /*
    try {
      // Getting url for request stream.
      let url = request.url

      // Js string function to split url
      let idQuery = url.split("?")[1]
      let idKey = idQuery.split("=")[0] // index of our DB array which will be id
      let idValue = idQuery.split("=")[1] // Index Value

      if (idKey === "id") {
        // Calling bodyParser to get Data from request stream
        await bodyParser(request)

        // Appending Request body into provided index
        db[idValue - 1] = request.body
        response.writeHead(200, { "Content-Type": "application/json" })
        response.write(JSON.stringify(db))
        response.end()
      } else {
        response.writeHead(400, { "Content-type": "text/plain" })
        response.write("Invalid Query")
        response.end()
      }
    } catch (err) {
      response.writeHead(400, { "Content-type": "text/plain" })
      response.write("Invalid body data was provided", err.message)
      response.end()
    }
  */
  }

  switch (method) {
    case "GET":
      if (url === "/api/users") {
        getPosts(request, response)
      }
    break;
    case "POST":
      if (url === "/api/users") {
        postHandler(request, response, db);
      }
    break;
    putPosts(request, response)
      break;

    default:
      response.writeHead(200, { "Content-Type": "text/plain" })
      response.write("Url Not Found")
      response.end()
  }
});

server.listen(4000, () => {
  console.log(`Server running on Port 4000`)
});

/*
createServer(function(request, response){
    //console.log("Url: " + request.url);
    //console.log("Тип запроса: " + request.method);
    //console.log("User-Agent: " + request.headers["user-agent"]);
    //console.log("Все заголовки");
    //console.log(request.headers);

    response.setHeader("Content-Type", "text/html; charset=utf-8;");
     
    if(request.url === "/api/users"){
      if (request.method === 'GET') {
        console.log(request)
        response.write("all users");
      }
      if (request.url === "/api/users/:id"){
        if (request.method === 'GET') {
          const id = request.params.id;
          response.write(`user id: ${id}`);
        }
      }
    }
    else if(request.url == "/about"){
        response.write("<h2>Abouts</h2>");
    }
    else if(request.url == "/contact"){
        response.write("<h2>Contacts</h2>");
    }
    else{
        response.write("<h2>Not found</h2>");
    }
    response.end();
}).listen(4000);
*/