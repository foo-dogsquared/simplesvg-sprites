// CREDITS: https://stackoverflow.com/a/42274086/8633667
function createDownloadBox(obj, file_name) {
    const url = window.URL.createObjectURL(obj);
    const a = document.createElement('a');
    a.href = url;
    a.download = file_name;
    document.body.appendChild(a); 
    a.click();    
    a.remove(); 
    URL.revokeObjectURL(url);
}

function emptyArray() {
    return Array.from([]);
}

function isFuture_d(prev, cur = new Date().toISOString()) {
    const prev_month = String(prev).substr(5, 2);
    const cur_month = String(cur).substr(5, 2);
    
    const prev_day = String(prev).substr(8, 2);
    const cur_day = String(cur).substr(8, 2);
    
    // comparing them both since the current date of the day can be less than the previous day 
    // (in case the user haven't visited the page in a month, for example)
    return (prev_month != cur_month) || (prev_day != cur_day);
}
function pseudoAlphabeticalSort(x, y) {
    if (x.toLowerCase() > y.toLowerCase()) return 1
    else if (x.toLowerCase() < y.toLowerCase()) return -1
    else return 0
}

function Post_Compile_Data(body) {
    this.method = "POST"
    this.body = `icons=${body}`;
    this.headers = {"Content-Type": "application/x-www-form-urlencoded"}
}

function retrieveDb() {
    return fetch('/database')
    .then(response => response.json())
    .then(json => {
        localStorage.setItem(local_json, JSON.stringify(json));
        localStorage.setItem(update_time, new Date().toISOString());
        
        data["icons"] = json; 
        
        app = callVue(el, data, methods, components);
        app.active = true;
        
        return 1;
    })
    .catch(error => console.log(error))
}