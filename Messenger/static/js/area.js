const textareas = document.querySelectorAll('.social-post-info-text textarea');

textareas.forEach(textarea => {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';

    textarea.addEventListener('input', () => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    });
});