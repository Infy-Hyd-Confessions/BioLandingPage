
var ip = "";
function postQuery() {
    if (document.getElementById("message").value == "") {
        alert("Please enter your query");
    } else {
        pq_button.disabled = true;
        pq_button.className = "btn btn-disabled"
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Access-Control-Allow-Origin", "*");

        var raw = JSON.stringify({
            "message": message.value
        });
        // console.log(raw);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://jarvis-ihcp-vercel.vercel.app/postMessage", requestOptions)
            .then(response => response.text())
            .then(result =>
                alert(result))
            // .then(result => message.value="")
            .catch(error => console.log('error', error))
            .then(() => window.open("index.html", "_self"));
    }
}


function postConfessionTest() {
    if (document.getElementById("message").value == "") {
        alert("Please enter your query");
    } else {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Access-Control-Allow-Origin", "*");

        var raw = JSON.stringify({
            "message": message.value,
            "ip": ip
        });
        console.log(raw);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://conf-test-pil.herokuapp.com/postConfession", requestOptions)
            .then((res) => { return res.blob(); })
            .then((data) => {
                var a = document.createElement("a");
                a.href = window.URL.createObjectURL(data);
                a.download = "Confession.png";
                a.click();
            });
            // .then(response => response.text())
            // .then(result =>
            //     alert(result))
            // .catch(error => console.log('error', error))
            // .then(() => window.open("index.html", "_self"));

    }
}



//get current ip address and store it in ip variable
function getIP() {
    json('https://jsonip.com').then(data => {
        ip = data.ip;
    });
}

function writeQuery() {
    text = "Make sure you are writing the query in detail"
    if (confirm(text) == true) {
        console.log("true is received")
        window.open("writeQuery.html", "_self")
    }
}

function writeConfession() {
    text = "Make sure you are writing only the confession and not a query. \nif you are writing a query press 'Cancel'"
    if (confirm(text) == true) {
        window.open("writeConfession.html", "_self")
    }
    else {
        window.open("writeQuery.html", "_self")
    }
}

function json(url) {
    return fetch(url).then(res => res.json());
}