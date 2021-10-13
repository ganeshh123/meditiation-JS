/* Global Imports */
import React from 'react';

import MediaBox from './MediaBox'
import MediaSources from '../utils/mediasources/MediaSources'
import './mediaSelectStyles.scss'

export default class MediaSelect extends React.Component{

    constructor(props){
        super(props)
    }

    setColors = () => {
        this.mediaSelectColors = {
            //backgroundColor: this.props.appState.currentTheme.backgroundColor,
            //border: this.props.appState.currentTheme.border,
            //boxShadow: this.props.appState.currentTheme.boxShadow,
            //backdropFilter : this.props.appState.currentTheme.backdropFilter,
            //WebkitBackdropFilter : this.props.appState.currentTheme.webkitBackdropFilter,
            color: this.props.appState.currentTheme.accentColor
        }

        this.buttonColors = {
            backgroundColor: this.props.appState.currentTheme.buttonBackgroundColor,
            border: this.props.appState.currentTheme.border,
            boxShadow: this.props.appState.currentTheme.boxShadow,
            backdropFilter : this.props.appState.currentTheme.backdropFilter,
            WebkitBackdropFilter : this.props.appState.currentTheme.webkitBackdropFilter,
            color: this.props.appState.currentTheme.accentColor
        }

        this.mediaSelectIconColors = {
            filter: this.props.appState.currentTheme.iconColor
        }
    }

    setupKeys = () => {
        let appState = this.props.appState
        document.addEventListener('keydown', (event) => {
            if(event.key == 'Escape'){
                appState.setStateFunction({
                    mediaSelectShowing: false,
                    mediaSelectConfig: {}
                })
            }
        })
    }

    getMediaSelectTitle = () => {
        let type = this.props.appState.mediaSelectConfig['type']

        if(type == 'scene'){
            return 'Locations'
        }

        if(type == 'musicTrack'){
            return 'Soundtracks'
        }
    }

    getMediaChoices = () => {
        let appState = this.props.appState
        let type = this.props.appState.mediaSelectConfig['type']

        if(type == 'scene'){
            return MediaSources.getScenesArray()
        }

        if(type == 'musicTrack'){
            return MediaSources.getMusicArray()
        }
    }

    mediaSelectCloseButtonPressed = () =>{
        let appState = this.props.appState

        appState.setStateFunction({
            mediaSelectShowing: false
        })
    }

    render(){

        this.setColors()
        this.setupKeys()

        let appState = this.props.appState
        let mediaArray = this.getMediaChoices()

        return(
            <div className='mediaSelect' style={this.mediaSelectColors} onClick={this.mediaSelectCloseButtonPressed}>
                <div className='mediaSelectTitle'>
                    {this.getMediaSelectTitle()}
                </div>
                <img 
                    className='mediaSelectCloseButton iconButton'
                    src='./assets/icons/cross_icon.svg'
                    onClick={this.mediaSelectCloseButtonPressed}
                    style={this.mediaSelectIconColors}
                />
                <div className="mediaSelectMenuContainer">
                <div className='mediaSelectMenu'>

                    {mediaArray.map((media, index) => {
                        return(
                            <MediaBox appState={appState} media={media} key={index} />
                        )
                    } )}

                </div>
                </div>
            </div>
        )
    }
}