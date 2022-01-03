import React from 'react';
import ThemeController from '../theme/ThemeController'
import PresetsMenu from '../presets/PresetsMenu'
import './sidePanelStyle.scss'
import {PresetsIcon, NewTimerIcon, LightDarkIcon, VideoOffIcon, VideoOnIcon} from '../icons'

export const SidePanel = (props) => {

    const {appState, type, id} = props
    const theme = appState.currentTheme
    const update = appState.setStateFunction

    const buttonContainerProps = {
        className: 'glassBlock sidePanelButton',
        style: {
            backgroundColor: theme.backgroundColor,
            border: theme.border,
            boxShadow: theme.boxShadow,
            backdropFilter : theme.backdropFilter,
            WebKitBackdropFilter : theme.webkitBackdropFilter,
        }
    }

    const sharedButtonProps = {
        className: 'sidePanelIcon',
        style: {
            color: theme.accentColor
        }
    }

    const PresetsButton = () => (
        <div
            {...buttonContainerProps}
            onClick={() => update({presetsMenuExpanded: !appState.presetsMenuExpanded})}
            id={appState['presetsMenuExpanded'] ? 'presetsButtonContainerPressed' : 'presetsButtonContainer'}
        >
            <PresetsIcon
                {...sharedButtonProps}
                id= {'presetsButton'}
                
            />
        </div>
    )

    const NewTimerButton = () => (
        <div
            {...buttonContainerProps}
            onClick={() => update({timerSetupShowing: !appState.timerSetupShowing})}
        >
            <NewTimerIcon
                {...sharedButtonProps}
                id={'timerSetupButton'}
            />
        </div>
    )

    const LightDarkButton = () => (
        <div
            {...buttonContainerProps}
            onClick={() => ThemeController.switchTheme(appState)}
        >
            <LightDarkIcon
                {...sharedButtonProps}
                id={'lightDarkButton'}
            />
        </div>
    )

    const VideoToggleButton = () => {
        const videoCurrentlyDisabled = appState.videoDisabled
        const videoButtonId = 'videoToggleButton'
        const videoElement = document?.querySelector('#sceneVideo')

        if(videoCurrentlyDisabled){
            return(
                <div
                    {...buttonContainerProps}
                    onClick={() => {
                        update({videoDisabled: false, videoLoaded: false})
                        videoElement && videoElement.play()
                    }}
                >
                    <VideoOffIcon
                        {...sharedButtonProps}
                        id={videoButtonId}
                    />
                </div>
            )
        }

        if(!videoCurrentlyDisabled){
            return(
                <div
                    {...buttonContainerProps}
                    onClick={() => {
                        update({videoDisabled: !videoCurrentlyDisabled})
                        videoElement && videoElement.pause()
                    }}
                >
                    <VideoOnIcon
                        {...sharedButtonProps}
                        id={videoButtonId}
                    />
                </div>
            )
        }
    }

    return(
        <div className='sidePanel' id={id}>
            {type === 'timerPresets' &&
                <>
                    {PresetsButton()}
                    {appState['presetsMenuExpanded'] && <PresetsMenu appState={appState} />}
                    {NewTimerButton()}
                </>
            }

            {type==='toggles' &&
                <>
                    {LightDarkButton()}
                    {VideoToggleButton()}
                </>
            }
        </div>
    )
}

export default SidePanel