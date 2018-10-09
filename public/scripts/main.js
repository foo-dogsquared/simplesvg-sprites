"use strict";
const local_json = "__simplesvg-sprites_db__";
const update_time = "__update_time__"
let data, methods, components, app;

function retrieveDb() {
    return fetch('/database')
        .then(response => response.json())
        .then(json => {
            // adding to the local storage
            localStorage.setItem(local_json, JSON.stringify(json));
            localStorage.setItem(update_time, new Date().toISOString());

            data = new Vue_Data(json);

            methods = new Vue_Methods();

            components = new Vue_Components();

            app = callVue(".wrapper.main", data, methods, components);
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
    // TODO: Call Vue instance here
    const icons = JSON.parse(localStorage.getItem(local_json));
    data = new Vue_Data(icons);
    methods = new Vue_Methods();
    components = new Vue_Components();

    app = callVue(".wrapper.main", data, methods, components);
    app.active = true;

    // TODO: Add the text from local storage instead
    console.log("Database detected in local storage. Adding data from the local files.");
}