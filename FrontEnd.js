function envoie() {

    // récupèrer les champs
   
    let pseudo = document.getElementById("pseudo")
   
    let message = document.getElementById("message")
   
    var xhr = new XMLHttpRequest();
   
    // paramétrage de la requête
   
    xhr.open('POST', 'http://localhost/ChatJS/BackEnd.php', true);
   
    // configuration
   
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
   
    // écouteur de la réponse
   
    xhr.onload = function () {
   
      if (xhr.status === 200) {
   
        let response = xhr.responseText
   
        let donneeJson = JSON.parse(response)
   
        console.log(donneeJson);
   
      } else {
   
        console.log('Erreur : code=' + xhr.status);
   
      }
   
    };
   
    // envoie de la requête avec des paramètres
   
    xhr.send("pseudo=" + encodeURIComponent(pseudo.value) + "&message=" + encodeURIComponent(message.value));
   
   }function get_messager_ajax() {
    var xhr2 = new XMLHttpRequest();
    // paramétrage de la requête
    xhr2.open('GET', 'http://localhost/ChatJS/BackEnd.php');
    // écouteur de la réponse
    xhr2.onload = function () {
        if (xhr2.status === 200) {
            let response = xhr2.responseText
            let messager = JSON.parse(response)
            console.log(messager);
            afficher(messager)
        } else {
            console.log('Erreur : code=' + xhr2.status);
        }
    };
    xhr2.send();
}
function afficher(messager) {
    var h2 = document.createElement('h2')
    h2.innerHTML = 'messager'

    let div1 = document.getElementById('div1')
    var ordre = document.createElement('ul')
    messager.forEach(element => {
        let list = document.createElement('li')
        list.innerHTML = element.pseudo + ' ' + element.message
        ordre.appendChild(list)
    });
    div1.appendChild(h2)
    div1.appendChild(ordre)
}
get_messager_ajax()