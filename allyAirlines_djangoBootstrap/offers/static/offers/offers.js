/**
 * If the user is not logged in, a toast will ask the user to do so.
 * Otherwise returns true.
 */
function showToastIfNotLoggedIn() {
    if (isLoggedIn()) {
        return true;
    } else {
        document.getElementById('loginToast').classList.remove('d-none');
        $('#loginToast').toast('show');
        return false;
    }
}