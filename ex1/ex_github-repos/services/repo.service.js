'use strict'

const REPO_URL = 'https://api.github.com/users'
const STORAGE_KEY_USERS = 'usersReposDB'

var gUsersCache = loadFromStorage(STORAGE_KEY_USERS)

function getUsers() {
    if (gUsersCache) return Promise.resolve(gUsersCache)

    return axios.get(REPO_URL)
        .then(res => res.data)
        .then(

            (data) => {
                var usersPromises = data.map(user => getRepos(user))
                // console.log(usersPromises, '### usersPromises ###')

                return Promise.all(usersPromises)
                    .then(users => {
                        // console.log(users, '**** users ****')
                        saveToStorage(STORAGE_KEY_USERS, users)
                        return users
                    })
            }
        )
}

function getRepos(user) {
    return axios.get(user.repos_url)
        .then(res => ({
            username: user.login,
            img: user.avatar_url,
            reposAmount: res.data.length
        })
        )
}

