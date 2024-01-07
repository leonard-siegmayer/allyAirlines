/**
 * Prefills the search form with data from the get-parameters.
 */
function enterSearchFields() {
    let firstFlightParam;
    let secondFlightParam;
    let flightDateParam;
    try { secondFlightParam = findGetParameter("secondFlight").split('+').join(' '); } catch (error) { /* do nothing */ }
    try { firstFlightParam = findGetParameter("firstFlight").split('+').join(' '); } catch (error) { /* do nothing */ }
    try { flightDateParam = findGetParameter("date"); } catch (error) { /* do nothing */ }

    let enterParamInSearchField = (searchFieldId, value) => value ? document.getElementById(searchFieldId).value = value : setTimeout(_ => document.getElementById(searchFieldId).focus(), 0);

    if (firstFlightParam || secondFlightParam || flightDateParam) {
        enterParamInSearchField("firstFlightInput", firstFlightParam);
        enterParamInSearchField("secondFlightInput", secondFlightParam);
        enterParamInSearchField("flightDateInput", flightDateParam);
    }
}

// 
/**
 * A helper function, which takes the name of a get-parameter and returns its value or null, if the parameter does not exist.
 * @param {string} parameterName The name of the requested get-parameter.
 */
function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

/**
 * Takes the id of a 'makeBookingForm' and triggers it, if the user is currently logged in. Otherwise, a toast asking the user to login will pop up.
 * @param {string} id 
 */
function triggerForm(id) {
    if (isLoggedIn()) {
        document.getElementById('makeBookingForm' + id).submit()
    } else {
        document.getElementById('loginToast').classList.remove('d-none');
        $('#loginToast').toast('show');
    }
}

enterSearchFields();