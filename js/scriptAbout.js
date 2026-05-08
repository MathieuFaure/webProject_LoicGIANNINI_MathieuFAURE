function handleSubmit(e) {

    e.preventDefault();
    const firstName = document.getElementById('firstName').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!firstName || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }

    const banner = document.getElementById('formSuccess');
    banner.style.display = 'block';

    // Reset fields
    ['firstName', 'lastName', 'email', 'message'].forEach(id => {
        document.getElementById(id).value = '';
    });
    document.getElementById('subject').selectedIndex = 0;

    banner.scrollIntoView({behavior: 'smooth', block: 'nearest'});
}
