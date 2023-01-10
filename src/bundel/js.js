function registerClient(variabels) {
    for (var [key, value] of Object.entries(variabels)) {
        window[key] = value
    }
}



// Make sure import is correct
window["_jxc"] = {
    registerClient
}