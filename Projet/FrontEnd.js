function getMessage(){
    const requestAjax = new XMLHttpRequest();
    requestAjax.open("GET","BackEnd.php");
    requestAjax.onload = function(){
        const resultat = JSON.parse(requestAjax.responseText);
        console.log(resultat);
        const html = resultat.map(function(message){
            const auteur = document.getElementById('auteur')
            return(auteur.value==message.pseudo)?
             '<div id="unite"><div class="auteur"><strong>You</strong></div><span class="content">'+message.content+'</span><div class="date1"><sub>'+message.date+'</sub></div></div><br>':
             '<div id="unite1"><div class="auteur"><strong>'+message.pseudo+'</strong></div><span class="content">'+message.content+'</span><div class="date"><sub>'+message.date+'</sub></div></div><br>';
        }).join("");
        
        console.log(html);

        const message = document.querySelector('.message')
        message.innerHTML = html
    }
    
    requestAjax.send();
}getMessage()
function postMessage(event){
    event.preventDefault();
    const auteur = document.querySelector('#auteur')
    const content = document.querySelector('#content')

    const data = new FormData();
    data.append('auteur',auteur.value);
    data.append('content',content.value);

    const requestAjax = new XMLHttpRequest();
    requestAjax.open("POST","BackEnd.php?task=write");
    requestAjax.onload = function(){
        content.value='';
        content.focus();
        getMessage();
    }
    requestAjax.send(data);
}
document.querySelector('form').addEventListener('submit',postMessage);

const interval = window.setInterval(getMessage,5000);

function mode() {
    fond=document.querySelector('.chat')
    button=document.getElementById('button')
    if (fond.style.backgroundColor=='white') {
        button.innerHTML='claire'
        fond.style.backgroundColor='black'
        fond.style.color='white'
    }
    else{

        fond.style.backgroundColor='white'
        button.innerHTML='sombre'
        fond.style.color='black'
    }
}