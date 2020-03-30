window.addEventListener("load", init);

let mainBtn = document.querySelector(".mainBtn");
mainBtn.addEventListener("click", getData)
let url = "https://reqres.in/api/users";
let N = 1;

function init () {
    mainBtn.style.display = "block";
}


function getData () {
    mainBtn.removeEventListener("click", getData);
    window.addEventListener("scroll", addData);

    fetch(url)
        .then(  
          function(response) {  
            if (response.status !== 200) {  
              alert('Looks like there was a problem. Status Code: ' + response.status);  
              return;
            }
            response.json()
            .then(function(data) { 
                showInfo(data);
            });
          }  
        )  
        .catch(function(err) {  
          alert('Fetch Error :-S', err);  
        });
}

function showInfo (data) {
    let tableMain = document.querySelector(".table");
    tableMain.style.display = "block"; 

    let maxPages = data.total_pages
    if (N === maxPages) {
        window.removeEventListener("scroll", addData);
    }

    let myArray = data.data;
    let table = document.querySelector("tbody");

    myArray.forEach(function(stringData) {
        let newArray = Object.values(stringData);   
        let row = table.insertRow();  
        let elements = newArray.join(",");
        elements = elements.split(","); 
        for (let i = 0; i < elements.length; i++) {
            let cell = row.insertCell(i);
            cell.innerHTML = elements[i];
        }  
    });   
}

function addData () {
    let height = document.body.scrollHeight;
    let scroll = window.pageYOffset;
    let heightToBottom = height - scroll;
    if (heightToBottom < 900) {
        N = N + 1;
        window.removeEventListener("scroll", addData);
        url = "https://reqres.in/api/users?page=" + N;
        getData()
    } 
}