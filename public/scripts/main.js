"use strict";
// setting up the data
const local_json = "__simplesvg-sprites_db__";
const update_time = "__update_time__"
let app;
const el = "#app";

const data = new Vue_Data();
const methods = new Vue_Methods();
const components = new Vue_Components();

if (!localStorage.getItem(local_json) || isFuture_d(localStorage.getItem(update_time))) {
    setTimeout(retrieveDb, 1000);
    console.log(`Retrieving database and ${(localStorage.getItem(local_json)) ? "updating" : "adding"} to local storage.`);
} else {
    const icons = JSON.parse(localStorage.getItem(local_json));

    data["icons"] = icons; 

    app = callVue(el, data, methods, components);
    app.active = true

    console.log("Database detected in local storage. Adding data from the local files.");
}
