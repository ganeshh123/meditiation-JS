import React from 'react'
import SceneController from './SceneController'
import MusicController from './MusicController'
import {MiniVideoIcon, NoteIcon} from'../icons'

const getButtonText = (sourceId, type) => {
    if(type === 'scene'){
        return SceneController.getSceneName(sourceId)
    }
    if(type === 'musicTrack'){
        return MusicController.getMusicName(sourceId)
    }
    return ''
}

const getButtonIcon = (type, color) => {
    if(type === 'scene'){
        return(
            <MiniVideoIcon
                className='mediaSelectOpenButtonIcon'
                style={{color: color}}
            />
        )
    }
    if(type === 'musicTrack'){
        return(
            <NoteIcon
                className='mediaSelectOpenButtonIcon'
                style={{color: color}}
            />
        )
    }
}

export const MediaSelectOpenButton = (props) => {

    const {type, currentTheme, updateApp, sourceId, title} = props

    const mediaSelectOpenButtonStyle = {
        backgroundColor: currentTheme['backgroundColor'],
        color: currentTheme['accentColor']
    }

    return(
        <div
            className={'mediaSelectOpenButton'}
            style={mediaSelectOpenButtonStyle}
            onClick={() => updateApp({
                mediaSelectShowing: true,
                mediaSelectConfig: {type: type}
            })}
            title={title}
        >
            {getButtonIcon(type, currentTheme['accentColor'])}
            <div
                className={'mediaSelectOpenButtonText'}
            >
                {getButtonText(sourceId, type)}
            </div>
        </div>
    )

}

export default MediaSelectOpenButton