'use strict'

// youtube axios

const YT_KEY = 'AIzaSyCKF96ZeP8PSHN_dtitzaOPJzW64TtSVtk'

function getVideos(value = 'joke') {
    const YT_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YT_KEY}&q=${value}`
    const STORAGE_VIDEO_KEY = `${value}_video_DB`
    var gVideosCache = loadFromStorage(STORAGE_VIDEO_KEY)

    if (gVideosCache) return Promise.resolve(gVideosCache)

    return axios.get(YT_URL)
        .then(res => res.data)
        .then((data) => {
            var videosInfo = data.items.map(video => getVideos_(video))
            saveToStorage(STORAGE_VIDEO_KEY, videosInfo)
            return videosInfo
        }
        )
}

function getVideos_(video) {
    return {
        title: video.snippet.title,
        imgUrl: video.snippet.thumbnails.default.url,
        description: video.snippet.description,
        id: video.id.videoId
    }
}

// wiki axios

function getWiki(keyword = 'joke') {
    const WIKI_URL = `https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&srsearch=${keyword}&format=json`
    const STORAGE_WIKI_KEY = `${keyword}_wiki_DB`
    var gWikiCache = loadFromStorage(STORAGE_WIKI_KEY)

    if (gWikiCache) {
        console.log(gWikiCache)
        return Promise.resolve(gWikiCache)
            .then(results => renderWiki(results))
    }
    return axios.get(WIKI_URL)

        .then(res => res.data)
        .then((data) => {
            let results = data.query.search.slice(0, 3)

            results = results.map(result => ({
                title: result.title,
                desc: result.snippet
            })
            )
            saveToStorage(STORAGE_WIKI_KEY, results)
            return results
        })
}

