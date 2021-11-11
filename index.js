const domElements = {
  userTable: document.querySelector('#user-table'),
  userData: document.querySelector('#user-data'),
  postsTable: document.querySelector('#posts-table'),
  postsData: document.querySelector('#posts-data'),
  returnUsers: document.querySelector('#return-users')
}

function returnToUsers() {
  const {postsTable, userTable, returnUsers} = domElements

  postsTable.setAttribute('hidden', 'hidden')
  userTable.removeAttribute('hidden')
  returnUsers.setAttribute('hidden', 'hidden')
}

function createBackButton() {
  const {returnUsers} = domElements
  returnUsers.removeAttribute('hidden')
  returnUsers.addEventListener('click', function () {
    returnToUsers()
  })
}
function userTableTemplate(users) {
  const {userData} = domElements
  let html = ''

  for (const user of users) {
    html += `
      <tr>
        <td>${user.id}</td>
        <td class="user-name">${user.name}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.website}</td>
        <td>${user.phone}</td>
        <td>${user.address.city}</td>
        <td>${user.company.name}</td>
      </tr>
    `
  }

  userData.innerHTML = html

  userData.addEventListener('click', e => {
    if (e.target.classList.contains('user-name')) {
      getPosts(e.target.parentElement.children[0].textContent)
    }
  })
}

function postsTableTemplate(posts) {
  const {postsTable, userTable, postsData} = domElements

  postsTable.removeAttribute('hidden')
  userTable.setAttribute('hidden', 'hidden')

  let html = ''

  for (const post of posts) {
    html += `
      <tr>
        <td>${post.userId}</td>
        <td>${post.id}</td>
        <td>${post.title}</td>
        <td>${post.body}</td>
      </tr>
    `
  }

  postsData.innerHTML = html

  createBackButton()
}

async function getUsers() {
  const userResponse = await fetch('https://jsonplaceholder.typicode.com/users')
  const users = await userResponse.json()
  userTableTemplate(users)
}

async function getPosts(id) {
  const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
  const posts = await postResponse.json()
  postsTableTemplate(posts)
}

getUsers()
