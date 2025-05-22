
$(document).ready(function () {
    const $menu = $('.context-menu');
    const $del = $('#del-btn');
    const $edit = $('#edit-btn');
    const $areas = $('.social-post-text-content');

    // Показ контекстного меню
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

    // Редактирование поста
    $edit.on('click', function () {
        const postId = $(this).data('post-id');

        const $targetArea = $areas.filter(function () {
            return $(this).data('post-id') === postId;
        });

        if ($targetArea.length) {
            $targetArea.removeAttr('readonly').focus();
            $('#edit-post-id').val(postId); // Вставляем ID в скрытое поле формы
        }
    });

    // Автосохранение при вводе текста
    let typingTimer;
    const typingInterval = 1000;

    $areas.on('input', function () {
        const $textarea = $(this);
        const postId = $textarea.data('post-id');
        const content = $textarea.val();

        clearTimeout(typingTimer);

        typingTimer = setTimeout(function () {
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

    // Удаление поста через форму
    $del.on('click', function () {
        const postName = $(this).attr('name'); // Например: del-123

        if (!postName || !postName.startsWith('del-')) {
            alert('Некорректный ID поста.');
            return;
        }

        if (confirm('Вы уверены, что хотите удалить этот пост?')) {
            // Создание и отправка скрытой формы
            const $form = $('<form>', {
                method: 'POST',
                action: '/create/'
            });

            // Кнопка удаления
            $form.append($('<input>', {
                type: 'hidden',
                name: postName,
                value: '1'
            }));

            // CSRF токен
            $form.append($('<input>', {
                type: 'hidden',
                name: 'csrfmiddlewaretoken',
                value: $('input[name="csrfmiddlewaretoken"]').val()
            }));

            $('body').append($form);
            $form.submit();
        }
    });
});