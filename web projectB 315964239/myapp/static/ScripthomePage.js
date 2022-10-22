// JavaScript source code

var v;
window.onload = start();

function start(){
    
    v=0;
    for (i=0; i<=4; i++){
        document.getElementById('card'+(5*v+i)).style.display= "block";
       
       
    }
    
}




function rightClick(){
    //if out of boundries
    if(v==3){
        for (i=0; i<=4; i++){
            document.getElementById('card'+(5*(v)+i)).style.display= "none";
           
        }
        
        v=0;
        for (i=0; i<=4; i++){
            document.getElementById('card'+(5*(v)+i)).style.display= "block";
           
        }
        return;
    }
    
    //hide the previous cards
    for (i=0; i<=4; i++){
        document.getElementById('card'+(5*(v)+i)).style.display= "none";
       
    }
    v++;
    //show the current batch
    for (i=0; i<=4; i++){
        document.getElementById('card'+(5*v+i)).style.display= "block";
       
    }    
}

function leftClick(){
    //if out of boundries
    if(v==0){
        for (i=0; i<=4; i++){
            document.getElementById('card'+(5*(v)+i)).style.display= "none";
           
        }
        
        v=3;
        for (i=0; i<=4; i++){
            document.getElementById('card'+(5*(v)+i)).style.display= "block";
           
        }

        return;
    }
    //hide the previous cards
    for (i=0; i<=4; i++){
        document.getElementById('card'+(5*(v)+i)).style.display= "none";
       
    }
    v--;
    //show the current batch
    for (i=0; i<=4; i++){
        document.getElementById('card'+(5*(v)+i)).style.display= "block";
       
    }
    
    
}
