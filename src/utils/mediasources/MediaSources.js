let fetch = require('sync-fetch')

let buildSourcesObject = (sourcesArray) => {
    let sourcesObject = {}

    sourcesArray.forEach((source) => {
        sourcesObject[source['id']] = source
    })

    return sourcesObject
}

class MediaSources {

    static scenesArray = fetch('./assets/scenes.json', 
        {headers: {Accept: 'application/vnd.citationstyles.csl+json'}
    }).json()

    static musicTracksArray = fetch('./assets/musicTracks.json', 
        {headers: {Accept: 'application/vnd.citationstyles.csl+json'}
    }).json()

    static presetsArray = fetch('./assets/presets.json', 
        {headers: {Accept: 'application/vnd.citationstyles.csl+json'}
    }).json()

    static scenes = buildSourcesObject(fetch('./assets/scenes.json', 
        {headers: {Accept: 'application/vnd.citationstyles.csl+json'}
    }).json())


    static musicTracks = buildSourcesObject(fetch('./assets/musicTracks.json', 
        {headers: {Accept: 'application/vnd.citationstyles.csl+json'}
    }).json())

    static presets = buildSourcesObject(fetch('./assets/presets.json', 
        {headers: {Accept: 'application/vnd.citationstyles.csl+json'}
    }).json())

    static getSceneName = (sceneId) => {
        if(this.scenes && this.scenes[sceneId] && this.scenes[sceneId]['name']){
            return this.scenes[sceneId]['name']
        }
    }

    static getSceneVideo = (sceneId) => {
        if(this.scenes && this.scenes[sceneId]){
            return `./assets/scenes/${sceneId}/${sceneId}.mp4`
        }
    }

    static getSceneImage = (sceneId) => {
        if(this.scenes && this.scenes[sceneId]){
            return `./assets/scenes/${sceneId}/${sceneId}.png`
        }
    }

    static getSceneImageBlur = (sceneId) => {
        if(this.scenes && this.scenes[sceneId]){
            return `./assets/scenes/${sceneId}/${sceneId}-blur.jpg`
        }
    }

    static getSceneImageThumb = (sceneId) => {
        if(this.scenes && this.scenes[sceneId]){
            return `./assets/scenes/${sceneId}/${sceneId}-thumb.jpg`
        }
    }

    static getSceneSfx = (sceneId) => {
        if(this.scenes && this.scenes[sceneId]){
            return `./assets/scenes/${sceneId}/${sceneId}.mp3`
        }
    }
}

export default MediaSources