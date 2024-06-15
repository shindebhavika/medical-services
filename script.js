document.addEventListener('DOMContentLoaded', function() {
  const apiUrl = 'https://randomuser.me/api/?results=4'; // API URL for generating random user profiles
  
  const customerList = document.getElementById('customerList');

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      data.results.forEach(user => {
        const article = document.createElement('article');
        article.classList.add('customer');
        article.innerHTML = `
          <img src="${user.picture.medium}" alt="${user.name.first} ${user.name.last}" class="circle">
          <h3>${user.name.first} ${user.name.last}</h3>
          <p>Email: ${user.email}</p>
          <p>Phone: ${user.phone}</p>
          <p>Location: ${user.location.city}, ${user.location.country}</p>
          <div class="rating">
            <input value="5" name="rate-${user.login.uuid}" id="star5-${user.login.uuid}" type="radio">
            <label title="text" for="star5-${user.login.uuid}"></label>
            <input value="4" name="rate-${user.login.uuid}" id="star4-${user.login.uuid}" type="radio">
            <label title="text" for="star4-${user.login.uuid}"></label>
            <input value="3" name="rate-${user.login.uuid}" id="star3-${user.login.uuid}" type="radio" checked="">
            <label title="text" for="star3-${user.login.uuid}"></label>
            <input value="2" name="rate-${user.login.uuid}" id="star2-${user.login.uuid}" type="radio">
            <label title="text" for="star2-${user.login.uuid}"></label>
            <input value="1" name="rate-${user.login.uuid}" id="star1-${user.login.uuid}" type="radio">
            <label title="text" for="star1-${user.login.uuid}"></label>
          </div>
        `;
        customerList.appendChild(article);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});
