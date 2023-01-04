/* require('dotenv').config();
var MongoClient = require('mongodb').MongoClient;

// Обращение к переменным из .env, которые теперь доступны в process.env 
MongoClient.connect(process.env.DB_CONN, function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
}); */

import { createServer } from "http";

const server = createServer((request, response) => {
  let url = request.url
  let method = request.method

  switch (method) {
    case "GET":
      if (url === "/") {
        response.writeHead(200, { "Content-Type": "application/json" })
        response.write(JSON.stringify({ message: "Hello World" }))
        response.end()
      }
    break;
    case "POST":
      if (url === "/post") {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.write(JSON.stringify({ message: "Hello From Post" }));
        response.end();
      }
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