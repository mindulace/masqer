window.toolAddButtonSelector     = 'tool-add',
window.toolRemoveButtonSelector  = 'tool-remove',
window.configurationFormSelector = 'configuration-form';

window.toolAddButtonObject     = null,
window.toolRemoveButtonObject  = null,
window.configurationFormObject = null;

/**
 * Gets all checked entries in the form.
 * 
 * @returns {array|null}
 */
function getCheckedEntries() {
    let entries        = window.configurationFormObject.querySelectorAll('#select'),
        checkedEntries = [];
    
        // console.log(entries);
    for (var i = 0; i < entries.length; i++) {
        if (entries[i].checked) {
            checkedEntries.push(entries[i]);
        }
    }


    return checkedEntries.length > 0 ? checkedEntries : null;
}

/**
 * Gets the full item of the select-field.
 */
function getItem(entry) {
    return entry.parentElement;
}

/**
 * TODO: ADD CHECK IF BUTTON IS DISABLED
 * TODO: ADD EVENT IF ANY SELECT IS ACTIVE
 *       TO DISABLE DEACTIVATED CLASS
 * 
 * Removes all selected items.
 * 
 * Gets called when button window.toolRemoveButtonObject gets pressed.
 */
function removeItem() {
    let selectedEntries = getCheckedEntries();

    if (selectedEntries != null) {
        for (var i = 0; i < selectedEntries.length; i++) {
            let item = getItem(selectedEntries[i]);
    
            item.remove();
        }
    }
}

/**
 * Adds a new item to the form.
 * 
 * Gets called when button window.toolAddButtonObject gets pressed.
 */
function addItem() {
    console.log("addClicked");
}

/**
 * Registers all needed events.
 */
function registerEvents() {
    window.toolAddButtonObject.addEventListener('click', addItem, true);
    window.toolRemoveButtonObject.addEventListener('click', removeItem, true);
    console.log("registerEvents");
}

/**
 * Registers all needed elements.
 */
function registerElements() {
    window.toolAddButtonObject     = document.getElementById(window.toolAddButtonSelector);
    window.toolRemoveButtonObject  = document.getElementById(window.toolRemoveButtonSelector);
    window.configurationFormObject = document.getElementById(window.configurationFormSelector);

    console.log("registerElements");
    registerEvents();
}

document.addEventListener('DOMContentLoaded', registerElements, false);