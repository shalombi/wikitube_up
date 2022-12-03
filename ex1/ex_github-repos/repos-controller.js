'use strict'


function onInit() {
    getUsers()
        .then(renderUsers)
}

function renderUsers(users) {
    const strHtmls = users.map(
        user => `
      <article class="flex flex-column">
          <img src="${user.img}" alt="my-image">
          <span class="username">Username: ${user.username}</span>
          <small>Num of repositories: ${user.reposAmount}</small>
      </article>
      `
    )
    document.querySelector('.users-container').innerHTML = strHtmls.join('')
}


