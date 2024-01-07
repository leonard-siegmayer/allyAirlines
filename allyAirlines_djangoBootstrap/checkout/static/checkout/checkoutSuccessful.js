/**
 * Replaces the spinner from the checkoutSuccessful-View with a success message.
 */
function replaceSpinner() {
    let spinner = document.getElementById("successContainer");
    if (spinner) {
        spinner.innerHTML = `<h2>Vielen Dank für Ihre Buchung!</h2><p>Sie haben jederzeit die Möglichkeit Ihre Buchungen einzusehen oder zu stornieren. Gehen Sie dafür einfach zu <a href="/myBookings">'Meine Flüge'</a>.</p>`;
    }
}

// Trigger the replaceSpinner() Function after 3 seconds, in order to simulate a loading process.
setTimeout(replaceSpinner, 3000);