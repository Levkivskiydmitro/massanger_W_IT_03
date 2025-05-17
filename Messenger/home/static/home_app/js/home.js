document.addEventListener('DOMContentLoaded', function () {
    const closeBtn = document.getElementById('close-btn');
    const openBtn = document.querySelector('.fast-message-content-button-publish');
    const modal = document.querySelector('.window-back');

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', function () {
            modal.classList.remove('show');
        });
    }

    if (openBtn && modal) {
        openBtn.addEventListener('click', function () {
            modal.classList.add('show');
        });
    }
});