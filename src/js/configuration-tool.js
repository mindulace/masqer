window.toolAddButtonSelector     = 'tool-add',
window.toolRemoveButtonSelector  = 'tool-remove',
window.configurationFormSelector = 'configuration-form';
window.entryTemplateSelector     = 'is--template';

window.toolAddButtonObject     = null,
window.toolRemoveButtonObject  = null,
window.configurationFormObject = null;
window.entryTemplateObject     = null;

window.checkboxCounter = 0;

/**
 * Gets all checked entries in the form.
 * 
 * @returns {array|null}
 */
function getCheckedEntries() {
    let entries        = window.configurationFormObject.querySelectorAll('#select'),
        checkedEntries = [];
    
    for (var i = 0; i < entries.length; i++) {
        if (entries[i].checked) {
            checkedEntries.push(entries[i]);
        }
    }


    return checkedEntries.length > 0 ? checkedEntries : null;
}

/**
 * Gets the full item of the select-field.
 * 
 * @param {object} entry
 */
function getItem(entry) {
    return entry.parentElement;
}

/**
 * TODO: ADD CHECK IF BUTTON IS DISABLED
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

    registerElements(true);
}

/**
 * Adds a new item to the form.
 * 
 * Gets called when button window.toolAddButtonObject gets pressed.
 */
function addItem() {
    window.configurationFormObject.append(window.entryTemplateObject);
}

function changeStateOfRemoveTool(state) {
    console.log(state);

    if (state == 'activate') {
        window.toolRemoveButtonObject.classList.remove('deactivated');
    } else if(state == 'deactivate') {
        window.toolRemoveButtonObject.classList.add('deactivated');
    }
}

function checkCheckboxCounter() {
    let state = null;

    if (window.checkboxCounter > 0) {
        state = 'activate';
    } else {
        state = 'deactivate';
    }

    changeStateOfRemoveTool(state);
}

function checkCheckboxState(event) {
    if (event.target.checked) {
        window.checkboxCounter += 1;
    } else {
        window.checkboxCounter -= 1;
    }

    checkCheckboxCounter();
}

/**
 * Registers all needed events.
 */
function registerEvents() {
    window.toolAddButtonObject.addEventListener('click', addItem, true);
    window.toolRemoveButtonObject.addEventListener('click', removeItem, true);

    for (var i = 0; i < window.entriesCheckboxes.length; i++) {
        window.entriesCheckboxes[i].addEventListener('change', checkCheckboxState, true);
    }
}

/**
 * Removes the given arrayList or variable from the given event listener. 
 * 
 * @param {array} objects 
 * @param {event} event 
 * @param {object} functionName 
 * @param {boolean} [array=false] - If the variable 'object' is a array 
 */
function unbindEvents(objects, event, functionName, array = false) {
    if (array == true) {
        for (var i = 0; i < objects.length; i++) {
            objects[i].removeEventListener(event, functionName, true);
        }
    } else {
        unbindobjects.removeEventListener(event, functionName, true);
    }
}

/**
 * Registers all checkboxes in the configuration.
 * 
 * @param {boolean} reset
 */
function registerCheckboxes(reset) {
    if (reset == true) {
        unbindEvents(window.entriesCheckboxes, 'change', checkCheckboxState, true);

        // Reset the counter
        window.checkboxCounter = 0;

        // And call the checkboxCounter Checker
        checkCheckboxCounter();
    }

    // Fetch new checkboxes
    window.entriesCheckboxes = document.getElementsByClassName('entry--select');
}

function cloneTemplate() {
    window.entryTemplate = window.entryTemplateObject.cloneNode(true).removeAttribute('id');
}

/**
 * Registers all needed elements.
 * 
 * @param {boolean} [reset=false]
 */
function registerElements(reset = false) {
    if (reset == false) {
        window.toolAddButtonObject     = document.getElementById(window.toolAddButtonSelector);
        window.toolRemoveButtonObject  = document.getElementById(window.toolRemoveButtonSelector);
        window.configurationFormObject = document.getElementById(window.configurationFormSelector);

        window.entryTemplateObject = document.getElementById(window.entryTemplateSelector);
        cloneTemplate();
    }

    registerCheckboxes(reset);

    registerEvents();
}

function init() {
    registerElements();
}

document.addEventListener('DOMContentLoaded', init, false);