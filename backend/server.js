import express from "express"
const PORT = 8080;

const routes = { GET: [], POST: {} };

const globalMiddlewares = [];
let errorHandler = null;

function setErrorHandler(fn){
  errorHandler = fn;
};

function use(fn){
  globalMiddlewares.push(fn)
}

// routes.GET['/'] = [fn1, fn2]

function get(url, ...handlers) {
  routes.GET.push({url, handlers});
}
function post(url, handler) {
  routes.POST[url] = handler;
}


function matchRoute(route, url){
  const routeParts = route.split('/')
  const urlParts = url.split('/');

  if (routeParts.length !== urlParts.length) {
    return null
  };

  const params = {};

  for(let i = 0; i < routeParts.length; i++){
    if(routeParts[i].startsWith(':')){
      const key = routeParts[i].slice(1);
      params[key] = urlParts[i]
    } else if (routeParts.length !== urlParts.length){
      return null
    }
  }
  return params;
}



function runPipeline(handlers, req, res){
let i = 0;
function next(err){
  const handler = handlers[i++]
  // ERROR FLOW
  if(err){
    if(errorHandler){
      return errorHandler(err, req, res, next)
    };
    res.writeHead(500, {"Content-Type":"text-plain"});
    res.end("Unhandled error")
  };
  
  // NORMAL -- ASYNC FLOW
  if (!handler) return;
  
  safeExecution(handler, req, res, next)
};
next();
};

function safeExecution(fn, req, res, next){
  try {
    const result = fn(req, res, next);

    if(result && result instanceof Promise) return result.catch(next);
    return result
  } catch (err) {
    next(err)
  }
}

function handleRequest(req, res){
  const methodRoutes = routes[req.method];


    for(const route of methodRoutes){
      const params = matchRoute(route.path, req.url)
      if (params) {
        req.params = params;
        return runPipeline(route.handlers, req, res)
      }
    }
    res.writeHead(404);
    res.end("Not found")
}

// const urlObj = new URL(req.url, `http://${req.headers.host}`);
// const req.query = Object.fromEntries(urlObj.searchParams) 


setErrorHandler((err, req, res, next)=>{
  res.writeHead(500, {"Content-Type":"text-plain"});
  res.end(`Something broke: ${err.message}`)
});


get("/", (req, res, next) => {
  try {
    // Simulating an error
    throw new Error('Simulation of an error')
    console.log('Middleware 1 auth check');

  next()
  } catch (err) {
    next(err)
  }
}, 
  (req, res, next)=>{
    console.log('Middleware 2 auth check');
    next()
  }, 
  (req, res) => {
  res.writeHead(200, { "Content-Type": "text-plain" });
  res.end("Home Page");
},);

get("/films", (req, res) => {
  res.writeHead(200, { "Content-Type": "application-json" });
  res.end(JSON.stringify({ director: "Christopher Nolan" }));
});

const server = http.createServer((req, res) => {
  const { url, method } = req;
  const allHandlers = [];
  const handlers = routes[method][url];

  allHandlers.push(...globalMiddlewares)

  const route = routes[method]?.find(r => matchRoute(r.path, url))

  if (!route) {
    res.writeHead(404, { "Content-Type": "text-plain" });
    res.write("This page does not exist");
    res.end();
  }

  allHandlers.push(...route.handlers);
  runPipeline(allHandlers, req, res)
  // handleRequest(req, res);
});

server.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
