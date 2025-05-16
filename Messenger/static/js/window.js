const createBtn = document.querySelector('.fast-message-content-button-publish');

createBtn.addEventListener('click', () => {
  const div = document.createElement('div');
  div.classList.add('window-back', 'show');

  div.innerHTML = `
    <div class="window">
      <button id="close-btn"><img src="{% static 'img/Vector.css' %}"></button>
      <h1>Створення публікації</h1>
      <div class="window-content">
        <div class="window-input">
          <h3>Назва публікації</h3>
          <input type="text" placeholder="">
        </div>
        <div class="window-input">
          <h3>Тема публікації</h3>
          <input type="text" placeholder="Напишіть тему публікаціїї">
        </div>
        <div class="window-input">
          <textarea>
Інколи найкращі ідеї народжуються в тиші
Природа, книга і спокій — усе, що потрібно, аби перезавантажитись.
#відпочинок #натхнення #життя #природа #читання #спокій #гармонія
          </textarea>
        </div>
        <div class="window-input">
          <h3>Посилання</h3>
          <input type="text" placeholder="https://www.instagram.com/world.it.academy">
        </div>
      </div>
      <div class="imgs-container">
        <input type="file">
        <div><button></button></div>
        <div><button></button></div>
        <div><button></button></div>
      </div>
      <div class="bottom">
        <button class="outlined" id="img-btn"><img src="{% static 'img/Component3.png' %}" alt=""></button>
        <button class="outlined" id="emoji-btn"><img src="{% static 'img/Component4.png' %}" alt=""></button>
        <button class="filled">Публікація<img src="{% static 'img/telegram.png' %}"></button>
      </div>
    </div>
  `;

  document.body.appendChild(div);

  div.querySelector('#close-btn').addEventListener('click', () => {
    div.remove();
  });

    div.addEventListener('click', () => {
      div.remove();
    })
});