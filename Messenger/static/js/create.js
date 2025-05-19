/*document.addEventListener('DOMContentLoaded', function () {
    const closeBtn = document.getElementById('close-btn');
    const openBtn = document.querySelector('.fast-message-content-button-publish');
    const modal = document.querySelector('.window-back');
    const body = document.body;
    const publishBtn = document.getElementById('publish-btn'); 
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', function () {
            modal.classList.remove('show');
            body.style.overflow = 'auto';
        });
    }
    if (openBtn && modal) {
        openBtn.addEventListener('click', function () {
            modal.classList.add('show');
            body.style.overflow = 'hidden'; 
        });
    }

    if (publishBtn) {
        publishBtn.addEventListener('click', function () {
            console.log('Кнопка нажата');
            const titleInput = document.getElementById('post-title');
            const textArea = document.getElementById('post-description');
            const topicInput = document.getElementById('post-topic');
            const linkInput = document.getElementById('post-link');
            const imgInput = document.getElementById('post-img');

            if (!titleInput || !textArea || !topicInput) {
                console.error('Ошибка: поля для ввода данных не найдены');
                return;
            }

            const formData = new FormData();
            formData.append("title", titleInput.value);
            formData.append("description", textArea.value);
            formData.append("topic", topicInput.value);
            formData.append("link", linkInput.value);
            formData.append("tags", 'відпочинок'); 

            if (imgInput.files.length > 0) {
                formData.append("img", imgInput.files[0]);
            }

            var csrf_token = "{{ csrf_token }}";
            const url = publishBtn.getAttribute('data-url');

            const csrftoken = document.querySelector('[name=csrf-token]').content;

            fetch('http://127.0.0.1:8000/create/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
              },
              body: JSON.stringify({
                // данные
              }),
            })

            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    modal.classList.remove('show');
                    body.style.overflow = 'auto';

                    const newPostHtml = `
                        <div class="social-post">
                            <div class="social-post-user-info">
                                <div class="social-post-inner-user-info">
                                    <div class="social-post-inner-user-info-total">
                                        <img src="{% static 'home_app/img/Avatar7.png' %}">
                                        <p>${data.username}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="social-post-info">
                                <div class="social-post-info-text">
                                    <span>${data.title}<br>${data.description}</span>
                                </div>
                                ${data.img_url ? `<div class="social-post-info-photos">
                                    <img src="${data.img_url}">
                                </div>` : ''}
                                <div class="social-post-info-stats">
                                    <div class="social-post-info-stat-likes">
                                        <img src="{% static 'home_app/img/like.png' %}">
                                        <p>0 Вподобань</p>
                                    </div>
                                    <div class="social-post-info-stat-views">
                                        <img src="{% static 'home_app/img/eye.png' %}">
                                        <p>0 Переглядів</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;

                    const publicationsContainer = document.querySelector('.unfixed-right-panel');
                    publicationsContainer.insertAdjacentHTML('beforeend', newPostHtml);
                } else {
                    alert('Ошибка при отправке поста');
                }
            })
            .catch(error => {
                console.error('Ошибка сети:', error);
            });
        });
    }
});
*/


const btn = document.querySelector('.fast-message-content-button-publish');
const modal = document.querySelector('.window-back');

const close = document.getElementById('close-btn');
const upload = document.getElementById('post-img');
const uploadbtn = document.getElementById('post-img-btn');


btn.addEventListener('click', () => {
    modal.classList.toggle('show');
});

close.addEventListener('click', () => {
    modal.classList.remove('show');
});

uploadbtn.addEventListener('click', () => {
    upload.click();
});

function op() {
    modal.classList.toggle('show');
}