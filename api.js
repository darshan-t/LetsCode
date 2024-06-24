const express= require("express")
const app=express()
const bodyP=require("body-parser")
const compiler=require("compilex")
const options={stats:true}
compiler.init(options)

app.use(bodyP.json())
app.use("/codemirror-5.65.16",express.static("C:/Users/darsh/Documents/DARSHAN/Projects/LetsCode/codemirror-5.65.16"))
app.get("/",function(req,res){
    compiler.flush(function(){
        console.log("deleted")
    })
    res.sendFile("C:/Users/darsh/Documents/DARSHAN/Projects/LetsCode/index.html")
})
app.post("/RunCode", function(req,res){
    var code=req.body.code
    var input=req.body.input
    var lang=req.body.lang
    
     try{
          if(lang==="C++"){
            var envData = { OS : "windows" , cmd : "g++", options:{timeout:10000}};
            if(!input){
                compiler.compileCPP(envData , code , function (data) {
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output:"error"})
                    }
                   
                });
            }else{
                
                compiler.compileCPPWithInput(envData , code , input , function (data) {
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output:"in input error"})
                    }
             });
            }
          }
          else if(lang==="Java"){
            var envData = { OS: "windows", cmd: "javac", options: { timeout: 10000 } };
            if (!input) {
                compiler.compileJava(envData, code, function(data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: "Compilation error" });
                    }
                });
            } else {
                compiler.compileJavaWithInput(envData, code, input, function(data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: "Runtime error" });
                    }
                });
            }
          }else if(lang==="Python"){
            var envData = { OS: "windows" };
            if (!input) {
                compiler.compilePython(envData, code, function(data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: "Runtime error" });
                    }
                });
            } else {
                compiler.compilePythonWithInput(envData, code, input, function(data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: "Runtime error" });
                    }
                });
            }
          }
          else {
                        res.status(400).send({ output: "Unsupported language" });
           }
        }
     catch(e){
        
console.error("Error:", e);
res.status(500).send({ output: "Internal server error" });
     }
})
app.listen(8000) 
// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const compiler = require("compilex");
// const options = { stats: true };
// compiler.init(options);

// app.use(bodyParser.json());

// // Serve static files (assuming codemirror is in the specified directory)
// app.use("/codemirror-5.65.16", express.static("C:/Users/darsh/Documents/DARSHAN/Projects/LetsCode/codemirror-5.65.16"));

// // Serve index.html on root path
// app.get("/", function(req, res) {
//     res.sendFile("C:/Users/darsh/Documents/DARSHAN/Projects/LetsCode/index.html");
// });

// // Handle POST requests to /RunCode
// app.post("/RunCode", function(req, res) {
//     var code = req.body.code;
//     var input = req.body.input;
//     var lang = req.body.lang;

//     try {
//         if (lang === "C++") {
//             var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
//             if (!input) {
//                 compiler.compileCPP(envData, code, function(data) {
//                     if (data.output) {
//                         res.send(data);
//                     } else {
//                         res.send({ output: "Compilation error" });
//                     }
//                 });
//             } else {
//                 compiler.compileCPPWithInput(envData, code, input, function(data) {
//                     if (data.output) {
//                         res.send(data);
//                     } else {
//                         res.send({ output: "Runtime error" });
//                     }
//                 });
//             }
//         } else if (lang === "Java") {
//             var envData = { OS: "windows" };
//             if (!input) {
//                 compiler.compileJava(envData, code, function(data) {
//                     if (data.output) {
//                         res.send(data);
//                     } else {
//                         res.send({ output: "Compilation error" });
//                     }
//                 });
//             } else {
//                 compiler.compileJavaWithInput(envData, code, input, function(data) {
//                     if (data.output) {
//                         res.send(data);
//                     } else {
//                         res.send({ output: "Runtime error" });
//                     }
//                 });
//             }
//         } else if (lang === "Python") {
//             var envData = { OS: "windows" };
//             if (!input) {
//                 compiler.compilePython(envData, code, function(data) {
//                     if (data.output) {
//                         res.send(data);
//                     } else {
//                         res.send({ output: "Runtime error" });
//                     }
//                 });
//             } else {
//                 compiler.compilePythonWithInput(envData, code, input, function(data) {
//                     if (data.output) {
//                         res.send(data);
//                     } else {
//                         res.send({ output: "Runtime error" });
//                     }
//                 });
//             }
//         } else {
//             res.status(400).send({ output: "Unsupported language" });
//         }
//     } catch (e) {
//         console.error("Error:", e);
//         res.status(500).send({ output: "Internal server error" });
//     }
// });


// const port = 8000;
// app.listen(port, function() {
//     console.log(`Server is running on http://localhost:${port}`);
// });
