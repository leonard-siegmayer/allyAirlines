/**
 * Changes the style of the current page in the navigation.
 */
function updateActiveNavLink() {
    const currentPath = window.location.pathname;
    const possiblePaths = ['myBookings', 'about', 'offers', 'flights']

    let changedToActive = false;
    const idSuffix = 'NavLink';

    if (currentPath === '/') {
        document.getElementById('home' + idSuffix);
    } else {
        document.getElementById('home' + idSuffix).classList.remove('active');
    }

    for (let possiblePath of possiblePaths) {
        const navElemId = possiblePath + idSuffix;
        const navElem = document.getElementById(navElemId);
        let classList;
        try { classList = navElem.classList; } catch (error) { continue; }
        if (currentPath.includes(possiblePath) && !changedToActive) {
            classList.add('active');
            changedToActive = true;
        } else {
            classList.remove('active');
        }
    }
}

/**
 * Dummy login functionality.
 */
function login() {
    sessionStorage.setItem("loggedIn", "true");

    document.getElementById('loginOrAccount').classList.add('dropdown');
    document.getElementById("loginOrAccount").innerHTML = `
      <a class="nav-link dropdown-toggle" role="button" href="#" id="myBookingsNavLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Mein Konto
      </a>
      <div class="dropdown-menu" aria-labelledby="myBookingsNavLink" role="listbox">
        <a class="dropdown-item" role="option" href="/myBookings">Meine Flüge</a>
        <div class="dropdown-divider"></div>
        <a role="button" onclick="javascript:logout()" class="dropdown-item" role="option" href="#">Abmelden</a>
      </div>`;

    $('#loginModal').modal('hide');
    dismissToast();
}

function logout() {
    sessionStorage.setItem("loggedIn", "false");
    window.location.href = '/';
}

/**
 * Checks if a user is logged in and updates the session storage variable depending on the result.
 */
function initLoggedIn() {
    isLoggedIn() ? login() : sessionStorage.setItem("loggedIn", "false");
}

/**
 * Returns true if a user is logged in, and false otherwise.
 */
function isLoggedIn() {
    return (sessionStorage.getItem("loggedIn") === "true");
}

/**
 * Focuses the main header, except the user enters the application for the first time or navigates to '/flights/' with parameters
 * or to 'checkout'.
 */
function manageFocus() {
    const href = window.location.href;
    if (href.includes('checkout') && !href.includes('success')) {
        manageFormFocus();
        return;
    }
    if (href.includes('flights/?')) {
        if (document.getElementById('flightResultsList')) {
            setTimeout(_ => document.getElementById('flightResultsHeading').focus(), 0);
        }
    } else {
        setTimeout(_ => document.getElementById('mainHeader').focus(), 0);
    }
}

/**
 * Sets the 'aria-current'-Attribute and the 'active'-Class for the last link in the breadcrumbs.
 * Furthermore, the link of the currently active link will be disabled.
 */
function selectCurrentLinkInBreadcrumbs() {
    const lastLink = document.getElementById('breadcrumbList').lastElementChild;
    lastLink.setAttribute('aria-current', 'page');
    lastLink.classList.add('active');
    lastLink.innerHTML = lastLink.firstChild.innerHTML;
}

/**
 * Closes the element with the id 'loginToast'.
 */
function dismissToast() {
    const toast = document.getElementById('loginToast');
    if (toast) {
        toast.classList.add('d-none');
        $('#loginToast').toast('dispose')
    }
}

window.onload = () => {
    selectCurrentLinkInBreadcrumbs();
    initLoggedIn();
    updateActiveNavLink();
    manageFocus();
    $('#loginModal').on('hidden.bs.modal', function (e) {
        setTimeout(_ => document.getElementById('myBookingsNavLink').focus(), 0);
    });
}