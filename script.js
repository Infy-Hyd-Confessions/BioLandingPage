
var ip = "";

// var host = "https://jarvis-ihcp-dev.vercel.app"
var host = "https://jarvis-ihcp.vercel.app"

const maxChars = 2000

// Update character count on every key press
function checkLength(){    
    const textLength = message.value.length;
    current.textContent = maxChars - textLength;
    
    if (textLength > maxChars) {
        message.value = message.value.substring(0, maxChars);
    }
  }

function postQuery() {
    if (document.getElementById("message").value == "") {
        alert("Please enter your query");
    } else {
        pq_button.innerText = "Submitting...."
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
        alert("Please enter your Confession");
    } else {
        pc_button.innerText = "Submitting...."
        pc_button.disabled = true;
        pc_button.className = "btn btn-disabled"
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Access-Control-Allow-Origin", "*");
        
        var raw = JSON.stringify({
            "message": (age_gender.value + "\n\n" + message.value).trim()
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
    confession.innerText = "Loading...."
    confession.disabled = true;
    confession.className = "btn btn-disabled"
    fetch(host + "/formStatus", {
        method: 'GET', // or 'POST' if required
        headers: {
            'Content-Type': 'text/plain;charset=UTF-8',
        },
    })
    .then(response => response.text())
    .then(responseText => {
        if (responseText === '1') {
            text = "Make sure you are writing only the confession and not a query. \nif you are writing a query press 'Cancel'"
            if (confirm(text) == true) {
                window.open("writeConfessionRules.html", "_self")
            }
            else {
                window.open("writeQuery.html", "_self")
            }
        } else if (responseText === '0') {
            window.location.href = 'FormStatus.html'; // Redirect to another.html
        }
    })
    .catch(error => console.error('Error:', error));
    

}

function json(url) {
    return fetch(url).then(res => res.json());
}