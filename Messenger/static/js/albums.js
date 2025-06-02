const delBtn = document.getElementById('img-delete-btn');
const prevImg = document.querySelector('.edit-button');

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