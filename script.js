
var ip = "";

// var host = "https://jarvis-ihcp-dev.vercel.app"
var host = "https://jarvis-ihcp.vercel.app"

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

        fetch(host + "/postQuery", requestOptions)
            .then(response => response.text())
            .then(result =>
                alert(result))
            // .then(result => message.value="")
            .catch(error => console.log('error', error))
            .then(() => {
                window.open("https://t.me/infosys_queries", "_self");
                // window.open("index.html", "_self")
            });
    }
}


function postConfession() {
    if (document.getElementById("message").value == "") {
        alert("Please enter your query");
    } else {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Access-Control-Allow-Origin", "*");
        
        var raw = JSON.stringify({
            "message": age_gender.value + "\n\n" + message.value
        });
        console.log(raw);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(host+"/postConfession", requestOptions)
            .then(response => response.text())
            .then(result =>
                alert(result))
            .catch(error => console.log('error', error))
            .then(() => { 
                window.open("index.html", "_self")
            });

    }
}



// //get current ip address and store it in ip variable
// function getIP() {
//     json('https://jsonip.com').then(data => {
//         ip = data.ip;
//     });
// }

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
        window.open("writeConfessionRules.html", "_self")
    }
    else {
        window.open("writeQuery.html", "_self")
    }
}

function json(url) {
    return fetch(url).then(res => res.json());
}