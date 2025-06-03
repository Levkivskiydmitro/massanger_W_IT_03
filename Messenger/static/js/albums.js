const delBtn = document.getElementById('img-delete-btn');
const collectionFileInput = document.getElementById('collection-img');
const albumFileInput = document.getElementById('album-img');
const photoContainer = document.querySelector('.my-photos-collection');
const imgsContainer = document.querySelector('.my-photos-collection');

const preview = document.getElementById('img-preview-1');

const editPhotoBtn = document.getElementById('edit-my-photos-button');
const createNewAlbumBtn = document.getElementById('create-new-album-button');


editPhotoBtn.addEventListener('click', () => {
    collectionFileInput.click();
});

createNewAlbumBtn.addEventListener('click', () => {
    albumFileInput.click();
});


albumFileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
            delBtn.style.display = 'block';
        };

        reader.readAsDataURL(file);
    }
});


    collectionFileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            // Создаём DOM-элемент preview-photo
            const previewDiv = document.createElement('div');
            previewDiv.classList.add('preview-photo');

            const img = document.createElement('img');
            img.src = e.target.result;

            const buttonsDiv = document.createElement('div');
            buttonsDiv.classList.add('center');

            const eyeBtn = document.createElement('button');
            eyeBtn.classList.add('center');
            eyeBtn.innerHTML = '<img src="/static/img/eye.svg">';

            const binBtn = document.createElement('button');
            binBtn.classList.add('center');
            binBtn.innerHTML = '<img src="/static/img/bin.svg">';

            // Кнопка удаления
            binBtn.addEventListener('click', () => {
                photoContainer.removeChild(previewDiv);
            });

            buttonsDiv.appendChild(eyeBtn);
            buttonsDiv.appendChild(binBtn);

            previewDiv.appendChild(img);
            previewDiv.appendChild(buttonsDiv);

            photoContainer.insertBefore(previewDiv, collectionFileInput);
        };

        reader.readAsDataURL(file);
        collectionFileInput.value = '';
    });

delBtn.addEventListener('click', () => {
    preview.style.display = 'none';
    delBtn.style.display = 'none';
    fileInput.value = '';
});
