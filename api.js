const express= require("express")
const app=express()
const bodyP=require("body-parser")
const compiler=require("compilex")
const options={stats:true}
compiler.init(options)

app.use(bodyP.json())
app.use("/codemirror-5.65.16",express.static("C:/Users/darsh/Documents/DARSHAN/Projects/LetsCode/codemirror-5.65.16"))
app.get("/",function(req,res){
    res.sendFile("C:/Users/darsh/Documents/DARSHAN/Projects/LetsCode/index.html")
})
app.post("/RunCode",function(req,res){
    var code=req.body.code
    var input=req.body.input
    var lang=req=req.body.lang
    // if(data.ouput){
    //     res.send(data);
    // }
    // else{
    //     res.send({output:"error"})
    // }
     try{
          if(lang=="C++"){
            if(input){
                var envData = { OS : "windows" , cmd : "g++"}; 
    
                compiler.compileCPPWithInput(envData , code , input , function (data) {
                    if(data.ouput){
                        res.send(data);
                    }
                    else{
                        res.send({output:"error"})
                    }
             });
            }else{
                var envData = { OS : "windows" , cmd : "g++"};
                compiler.compileCPP(envData , code , function (data) {
                    if(data.ouput){
                        res.send(data);
                    }
                    else{
                        res.send({output:"error"})
                    }
                    //data.error = error message 
                    //data.output = output value
                });
            }
          }
          else if(lang=="Java"){
            if(!input){
                var envData = { OS : "windows"}; 
                compiler.compileJava( envData , code , function(data){
                    if(data.ouput){
                        res.send(data);
                    }
                    else{
                        res.send({output:"error"})
                    }
                });   
            }
            else{
                var envData = { OS : "windows"}; 
                compiler.compileJavaWithInput( envData , code , input ,  function(data){
                    if(data.ouput){
                        res.send(data);
                    }
                    else{
                        res.send({output:"error"})
                    }
                 });
            }
          }else{
            if(!input){
                     
                    var envData = { OS : "windows"}; 
                    compiler.compilePython( envData , code , function(data){
                        if(data.ouput){
                            res.send(data);
                        }
                        else{
                            res.send({output:"error"})
                        }
                    });    
            }
            else{
                    var envData = { OS : "windows"}; 
                   compiler.compilePythonWithInput( envData , code , input ,  function(data){
                    if(data.ouput){
                        res.send(data);
                    }
                    else{
                        res.send({output:"error"})
                    }       
                    });
            }
          }
        }
     catch(e){
        console.log("error");
     }
})


app.listen(8000) 