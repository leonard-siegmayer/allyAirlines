/**
 * The given step of the checkout process will be loaded, while maintaining the input.
 * @param {number} requestedStep The required step.
 */
function goBackToStep(requestedStep) {
    let currentStep = document.getElementById("step").value;
    document.getElementById("step").value = requestedStep;

    if (+currentStep >= requestedStep) {
        let inputs = document.getElementsByTagName("input");
        for (input of inputs) {
            input.required = false;
        }
    }
    document.getElementById("submitButton").click();
}

/**
 * Focuses the first input field with an error. If no error exists, the first element of the form will be 
 * focused (except for the first time entering the checkout).
 */
function manageFormFocus() {
    // Check for errors
    const helpBlocks = document.getElementsByClassName('help-block');
    for (let helpBlock of helpBlocks) {
        const id = helpBlock.id;
        if (id.includes('error')) {
            setTimeout(_ => document.getElementById(id.substring(id.indexOf('_id_') + 1)).focus(), 0);
            return;
        }
    }

    // No errors
    const step = document.getElementById('step').value;
    const maxStep = document.getElementById('max_step').value;
    let elemToFocus;
    if (step == 2 || (step == 1 && maxStep >= 0)) {
        elemToFocus = document.getElementById('formLabel');
    } else if (step == 3) {
        elemToFocus = document.getElementById('overviewHeading');
    }

    // If the form is not displayed for the first time and no errors exists, focus the first element in the form.
    // Otherwise focus the main header.
    if (elemToFocus) {
        setTimeout(_ => elemToFocus.focus(), 0);
    } else {
        setTimeout(_ => document.getElementById('mainHeader').focus(), 0);
    }
}