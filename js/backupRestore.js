/**
 * Load global managers from JSON file
 * @param file - name of file
 */
function loadFromFile(file){
    if (storageAvailable('localStorage')) {
        deleteLocal();
        loadJSONasFile(file);
    }else {
        alert("local storage is not supported, please update your browser.");
    }
}