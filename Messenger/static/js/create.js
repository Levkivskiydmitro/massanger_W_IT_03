const btn = document.querySelector('.fast-message-content-button-publish');
const modal = document.querySelector('.window-back');

const close = document.getElementById('close-btn');
const upload = document.getElementById('post-img');
const uploadbtn = document.getElementById('post-img-btn');

let savedText = "";


btn.addEventListener('click', () => {
    modal.classList.toggle('show');
});

close.addEventListener('click', () => {
    modal.classList.remove('show');
});

uploadbtn.addEventListener('click', () => {
    upload.click();
});

setInterval(function() {
    savedText = $('.fast-message-content-input').val();
}, 1000);


$('.fast-message-content-button-publish').on('click', function() {
    $('#post-description').text(savedText);
});

const delBtn = document.getElementById('img-delete-btn');
const prevImg = document.getElementById('post-img');

prevImg.addEventListener('change', function(event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function(e) {
      const preview = document.getElementById('img-preview-1');
      preview.src = e.target.result;
      preview.style.display = 'block';
    };

    delBtn.style.display = 'block';
    reader.readAsDataURL(file);
  }
});

delBtn.addEventListener('click', () => {
    document.getElementById('img-preview-1').style.display = 'none';
    delBtn.style.display = 'none';
    prevImg.value = ''
})