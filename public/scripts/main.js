"use strict";
// setting up the data
const local_json = "__simplesvg-sprites_db__";
const update_time = "__update_time__"
let components, app;
const el = "#app";

const data = new Vue_Data();
const methods = new Vue_Methods();

function retrieveDb() {
    return fetch('/database')
        .then(response => response.json())
        .then(json => {
            // adding to the local storage
            localStorage.setItem(local_json, JSON.stringify(json));
            localStorage.setItem(update_time, new Date().toISOString());

            data["icons"] = json; 

            app = callVue(el, data, methods);
            app.active = true;

            return 1;
        })
        .catch(error => console.log(error))
}

function isFuture_d(prev, cur = new Date().toISOString()) {
    // getting the month of both given ISO dates
    const prev_month = String(prev).substr(5, 2);
    const cur_month = String(cur).substr(5, 2);
    
    // getting the day of both given ISO dates
    const prev_day = String(prev).substr(8, 2);
    const cur_day = String(cur).substr(8, 2);
    
    // comparing them both since the current date of the day can be less than the previous day 
    // (in case the user haven't visited the page in a month, for example)
    return (prev_month != cur_month) || (prev_day != cur_day);
}

if (!localStorage.getItem(local_json) || isFuture_d(localStorage.getItem(update_time))) {
    setTimeout(retrieveDb, 1000);
    console.log(`Retrieving database and ${(localStorage.getItem(local_json)) ? "updating" : "adding"} to local storage.`);
} else {
    const icons = JSON.parse(localStorage.getItem(local_json));

    data["icons"] = icons; 

    app = callVue(el, data, methods);
    app.active = true

    console.log("Database detected in local storage. Adding data from the local files.");
}
