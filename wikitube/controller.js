function onInit() {
    getVideos()
        .then(renderVideos)
        .then(getWiki())
        .then(renderWiki)
}

// youtube
function renderVideos(videos) {
    onSetVideo(videos[0].id)
    let strHtml = videos.map(({ id, imgUrl, title, description }) => {
        return `
          <div class="video-card" onclick="onSetVideo('${id}')">
             <img src="${imgUrl}">
             <h3 class="video-title">${title}</h3> 
             <h5 class="video-title">${description}</h5> 
         </div>`
    })
    const elVideos = document.querySelector('.videos-container')
    elVideos.innerHTML = strHtml.join('')
}

function onSetVideo(id) {
    let elPlayer = document.querySelector('iframe')
    elPlayer.src = `https://www.youtube.com/embed/${id}`
}


// wiki
function renderWiki(results) {
    const elContainerWiki = document.querySelector('.containerWiki')
    var strHtmls = results.map(result => {
        return (` 
        <h2>${result.title}</h2>
        <h3>${result.desc}</h3>`)
    })
    elContainerWiki.innerHTML = strHtmls.join('')
}

function onSearch(value) {
    getVideos(value)
        .then(renderVideos)
        .then(getWiki(value))
        .then(renderWiki)
}