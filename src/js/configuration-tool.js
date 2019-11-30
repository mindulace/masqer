window.toolAddButtonSelector     = 'tool-add',
window.toolRemoveButtonSelector  = 'tool-remove',
window.configurationFormSelector = 'configuration-form';
window.entryTemplateSelector     = 'is--template';

window.toolAddButtonObject     = null,
window.toolRemoveButtonObject  = null,
window.configurationFormObject = null;
window.entryTemplateObject     = null;

window.checkboxCounter = 0;
window.classDeactivate = 'deactivated';

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
 * 
 * @return {object}
 */
function getItem(entry) {
    return entry.parentElement;
}

/**
 * Removes all selected items.
 * 
 * Gets called when button window.toolRemoveButtonObject gets pressed.
 * 
 * @param {event} event
 * 
 * @return {void}
 */
function removeItem(event) {
    if (event.target.classList.contains(window.classDisabled)) {
        return;
    }

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
 * Clones the template into a variable.
 * 
 * @return {void}
 */
function cloneTemplate() {
    window.entryTemplate = window.entryTemplateObject.cloneNode(true);
    window.entryTemplate.removeAttribute('id');
}

/**
 * Adds a new item to the form.
 * 
 * Gets called when button window.toolAddButtonObject gets pressed.
 * 
 * @return {void}
 */
function addItem() {
    cloneTemplate();
    
    window.configurationFormObject.append(window.entryTemplate);

    registerElements(true);
}

/**
 * Adds class to remove tool depending of the given state.
 * 
 * @param {string} state 
 */
function changeStateOfRemoveTool(state) {
    if (state == 'activate') {
        window.toolRemoveButtonObject.classList.remove(window.classDisabled);
    } else if(state == 'deactivate') {
        window.toolRemoveButtonObject.classList.add(window.classDisabled);
    }
}

/**
 * Checks the amount of the counter and set the sate.
 * 
 * @return {void}
 */
function checkCheckboxCounter() {
    let state = null;

    if (window.checkboxCounter > 0) {
        state = 'activate';
    } else {
        state = 'deactivate';
    }

    changeStateOfRemoveTool(state);
}

/**
 * Checks the checked state of the given checkbox or all checkboxes.
 * 
 * @param {event} event
 * @param {boolean} [checkRegisteredCheckboxes = false]
 * 
 * @return {void}
 */
function checkCheckboxState(event, checkRegisteredCheckboxes = false) {
    if (checkRegisteredCheckboxes == false){
        if (event.target.checked) {
            window.checkboxCounter += 1;
        } else {
            window.checkboxCounter -= 1;
        }
    } else {
        // Reset to counter
        window.checkboxCounter = 0;

        // Increase counter for every checked checkbox
        for (var i = 0; i < window.entriesCheckboxes.length; i++) {
            if (window.entriesCheckboxes[i].checked) {
                window.checkboxCounter += 1;
            }
        }
    }

    checkCheckboxCounter();
}

/**
 * Registers all needed events.
 * 
 * @return {void}
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
 * @param {boolean} [array = false] - If the variable 'object' is a array
 * 
 * @return {void}
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
 * 
 * @return {void}
 */
function registerCheckboxes(reset) {
    if (reset == true) {
        unbindEvents(window.entriesCheckboxes, 'change', checkCheckboxState, true);

        // Check if there are any checked checkboxes
        checkCheckboxState(null, true);

        // And call the checkboxCounter Checker
        checkCheckboxCounter();
    }

    // Fetch new checkboxes
    window.entriesCheckboxes = document.getElementsByClassName('entry--select');
}

/**
 * Registers all needed elements.
 * 
 * @param {boolean} [reset = false]
 * 
 * @return {void}
 */
function registerElements(reset = false) {
    if (reset == false) {
        window.toolAddButtonObject     = document.getElementById(window.toolAddButtonSelector);
        window.toolRemoveButtonObject  = document.getElementById(window.toolRemoveButtonSelector);
        window.configurationFormObject = document.getElementById(window.configurationFormSelector);

        window.entryTemplateObject = document.getElementById(window.entryTemplateSelector);
    }

    registerCheckboxes(reset);

    registerEvents();
}

/**
 * Initialize the javascript.
 */
function init() {
    registerElements();
}

document.addEventListener('DOMContentLoaded', init, false);