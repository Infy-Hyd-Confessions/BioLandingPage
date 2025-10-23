
var ip = "";

// var host = "https://jarvis-ihcp-dev.vercel.app"
var host = "https://jarvis-ihcp.vercel.app"

const maxChars = 2000;

// Update character count on every key press
function checkLength() {
    const text = message.value;
    const textLength = text.length;
    

    current.textContent = maxChars - textLength;

    // If the text starts with a dollar symbol, exit the function
    if (text.startsWith('$')) {
        return;
    }

    if (textLength > maxChars) {
        message.value = text.substring(0, maxChars);
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
                window.open("https://t.me/infy_queries", "_self");
                // window.open("index.html", "_self")
            });
    }
}


function postConfession() {
    if (document.getElementById("message").value == "") {
        alert("Please enter your Story");
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
    story.innerText = "Loading...."
    story.disabled = true;
    story.className = "btn btn-disabled"

// Get the current day of the week (0 for Sunday, 6 for Saturday)
    const currentDay = new Date().getDay();
    
    // Check if it's Saturday (6) or Sunday (0)
    //if (currentDay === 0 || currentDay === 6) {
    //    window.location.href = 'FormStatus.html';
     //   return; // Skip the rest of the function
   // }

    fetch(host + "/formStatus", {
    method: 'GET',
    headers: {
        'Content-Type': 'text/plain;charset=UTF-8',
    },
})
.then(response => response.text())
.then(responseText => {
    if (responseText === '1') {
        const text = "Make sure you are submitting only the story and not a query.\nIf you are writing a query press 'Cancel'";
        if (confirm(text)) {
            window.open("writeConfessionRules.html", "_self");
        } else {
            window.open("writeQuery.html", "_self");
        }
    } else if (responseText === '0') {
        window.location.href = 'FormStatus.html';
    } else {
        // Unknown response — fallback
        console.warn("Unexpected response:", responseText);
        window.open("writeConfessionRules.html", "_self");
    }
})
.catch(error => {
    console.error('Error:', error);
    // Proceed even if fetch fails
    alert("arghhhhh.... something is wrong... Proceeding anyway...");
    window.open("writeConfessionRules.html", "_self");
});

}

function json(url) {
    return fetch(url).then(res => res.json());
}