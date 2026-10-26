/* ==================================
   BUG-07: ACCESSIBLE MOBILE MENU
================================== */

const menuButton = document.querySelector('#menu-icon');
const navMenu = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links a');

// Update the menu's visible and accessible states
function setMenuOpen(isOpen) {

    navMenu.classList.toggle('active', isOpen);

    menuButton.setAttribute(
        'aria-expanded',
        String(isOpen)
    );

    menuButton.setAttribute(
        'aria-label',
        isOpen ? 'Close navigation menu' : 'Open navigation menu'
    );

    // Switch between hamburger and close icons
    const icon = menuButton.querySelector('i');

    icon.classList.toggle('fa-bars', !isOpen);
    icon.classList.toggle('fa-xmark', isOpen);
}

// Open or close the menu
menuButton.addEventListener('click', () => {

    const isOpen =
        menuButton.getAttribute('aria-expanded') === 'true';

    setMenuOpen(!isOpen);
});

// Close after selecting a navigation link
navLinks.forEach(link => {

    link.addEventListener('click', () => {
        setMenuOpen(false);
    });

});

// Close the menu when Escape is pressed
document.addEventListener('keydown', (event) => {

    if (
        event.key === 'Escape' &&
        menuButton.getAttribute('aria-expanded') === 'true'
    ) {
        setMenuOpen(false);
        menuButton.focus();
    }

});

// Close the menu when clicking outside the header
document.addEventListener('click', (event) => {

    const isOpen =
        menuButton.getAttribute('aria-expanded') === 'true';

    if (isOpen && !document.querySelector('header').contains(event.target)) {
        setMenuOpen(false);
    }

});

// Reset mobile navigation when returning to desktop
window.addEventListener('resize', () => {

    if (window.innerWidth > 600) {
        setMenuOpen(false);
    }

});