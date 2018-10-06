"use strict";
const div = document.querySelector("#app");
const local_json = "__simplesvg-sprite_json__";
const update_time = "__update_time__";

// getting and updating the list asynchronously
function fetch_icons() {
    return fetch('simple-icons')
        .then(response => response.json())
        .then(json => {
            // getting our JSON into the local storage for reasons
            localStorage.setItem(local_json, JSON.stringify(json));
            localStorage.setItem(update_time, new Date().getDate())

            addText(json);
        })
        .catch(error => console.log(error))
}

function addText(json) {
    for (let icon in json) {
        const paragraph = document.createElement("p");

        paragraph.textContent = icon;

        div.appendChild(paragraph);
    }
}

// some caching mechanism, I guess
if (!localStorage.getItem(local_json) || localStorage.getItem(update_time) < new Date().getDate()) {
    setTimeout(fetch_icons, 1000)
    console.log("JSON added to local storage.");
}
else  {
    addText(JSON.parse(localStorage.getItem(local_json)));
    console.log("Text added from local storage.")
}