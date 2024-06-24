var option= document.getElementById("language");
option.addEventListener("change",function(){
    if(option.value="1"){
        editor.setOption("mode","text/x-c++src")
    }
    else if(option.value="2"){
        editor.setOption("mode","text/x-java")
    }
    else
    {
        editor.setOption("mode","text/x-pyhton");
        editor.setContent("hi hello")
    } 
});