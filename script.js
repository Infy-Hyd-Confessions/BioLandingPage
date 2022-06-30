
var ip = "";
function postQuery() {

    if (document.getElementById("message").value == "") {
        alert("Please enter your query");
    } else {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "message": message.value,
        "ip": ip
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://infy-hyd-jarvis-bot-telegram.herokuapp.com/postMessage", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
}

//get current ip address and store it in ip variable
function getIP() {
    json('http://ip-api.com/json').then(data => {
        ip = data;
    });
}

function writeQuery() {
    alert("Make sure you are writing the query in detail");
    window.open("writeQuery.html", "_self")
}

function writeConfession() {
    alert("Make sure you are writing the confession and not a query");
    window.open("writeConfession.html", "_self")
}

function json(url) {
    return fetch(url).then(res => res.json());
}