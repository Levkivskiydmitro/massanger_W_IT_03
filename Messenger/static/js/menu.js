$(document).ready(function () {
    const $menu = $('.context-menu');
    const $del = $('#del-btn');
    const $edit = $('#edit-btn');
    const $areas = $('.social-post-text-content');
    const typingInterval = 1000;
    let typingTimer;

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const csrftoken = getCookie('csrftoken');

    $.ajaxSetup({
        headers: { 'X-CSRFToken': csrftoken }
    });

    $('.social-post-dots').on('click', function () {
        const $btn = $(this);
        const rect = this.getBoundingClientRect();
        const postId = $btn.data('post-id');

        $del.attr('name', `del-${postId}`);
        $edit.data('post-id', postId);

        $menu.css({
            position: 'absolute',
            left: rect.left - $menu.outerWidth() - 90 + 'px',
            top: rect.bottom + window.scrollY + 10 + 'px'
        });

        $menu.toggleClass('show');
    });

    $edit.on('click', function () {
        const postId = $(this).data('post-id');

        const $targetArea = $areas.filter(function () {
            return $(this).data('post-id') == postId;
        });

        if ($targetArea.length) {
            $targetArea.removeAttr('readonly').focus();
        }
    });

    $areas.on('blur', function () {
        $(this).attr('readonly', true);
    });

    $areas.on('input', function () {
        const $textarea = $(this);
        const postId = $textarea.data('post-id');
        const content = $textarea.val();

        clearTimeout(typingTimer);

        typingTimer = setTimeout(function () {
            $.ajax({
                url: '/create/',
                method: 'POST',
                data: {
                    post_id: postId,
                    description: content
                },
                success: function (response) {
                    console.log('✅ Оновлено:', response);
                },
                error: function (xhr, status, error) {
                    console.error('❌ Помилка:', error);
                }
            });
        }, typingInterval);
    });

    $del.on('click', function () {
        const postName = $(this).attr('name');

        if (!postName || !postName.startsWith('del-')) {
            alert('Некоректний ID поста.');
            return;
        }

        const $form = $('<form>', {
            method: 'POST',
            action: '/create/'
        });

        $form.append($('<input>', {
            type: 'hidden',
            name: postName,
            value: '1'
        }));

        $form.append($('<input>', {
            type: 'hidden',
            name: 'csrfmiddlewaretoken',
            value: csrftoken
        }));

        $('body').append($form);
        $form.submit();
    });
});