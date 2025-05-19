const btns = document.querySelectorAll('.social-post-dots');
const menu = document.querySelector('.context-menu');

const del = document.getElementById('del-btn');
const edit = document.getElementById('edit-btn');
const areas = document.querySelectorAll('.social-post-text-content');

btns.forEach((btn) => {
    btn.addEventListener('click', () => {
        const rect = btn.getBoundingClientRect();
        const postId = btn.dataset.postId;

        del.name = `del-${postId}`;
        edit.dataset.postId = postId;

        menu.style.position = 'absolute';
        menu.style.left = `${rect.left - menu.scrollWidth - 90}px`;
        menu.style.top = `${rect.bottom + window.scrollY + 10}px`;

        menu.classList.toggle('show');
    });
});

edit.addEventListener('click', () => {
    const postId = edit.dataset.postId;

    const targetArea = Array.from(areas).find(
        area => area.dataset.postId === postId
    );

    if (targetArea) {
        targetArea.removeAttribute('readonly');
        targetArea.focus();
    }
});

let typingTimer;
    const typingInterval = 1000;
   $('.social-post-text-content').on('input', () => {
   const $textarea = $(this);
   const postId = $textarea.data('post-id');
   const content = $textarea.val();

   clearTimeout(typingTimer);

   typingTimer = setTimeout(() => {
       $.ajax({
           url: '/update-post/',
           method: 'POST',
           data: {
               post_id: postId,
               description: content,
               csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val()
           },
           success: function (response) {
               console.log('Оновлено:', response);
           },
           error: function (xhr, status, error) {
               console.error('Помилка:', error);
           }
       });
   }, typingInterval);
    });