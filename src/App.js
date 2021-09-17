/* Global Imports */
import React from 'react';
import ReactDOM from 'react-dom';

/* Local Imports */
import Theme from './utils/theme/Theme'
import './mainStyle.scss'
import MediaSources from './utils/mediasources/MediaSources'
import SettingsStore from './utils/settings/settingsStore'

import TitleBar from './titlebar/TitleBar'
import SceneControlPanel from './scenecontrols/SceneControlPanel'
import SceneVideo from './scenemedia/SceneVideo'
import SceneImage from './scenemedia/SceneImage'
import AudioPlayer from './scenemedia/AudioPlayer'
import Timer from './timer/Timer'
import TimerSetup from './timer/TimerSetup'
import SidePanel from './sidepanel/SidePanel'
import Settings from './settings/Settings'

class App extends React.Component {

  appStyle = {
    //backgroundImage: `url('./assets/img/rain_on_leaves.png')`,
    backgroundSize: 'cover'
  }

  updateState = (newState, cbFunc) => {
    this.setState(newState, () => {
      SettingsStore.updateSettings(this.state)
      if(cbFunc){
        cbFunc()
      }
    })
  }
  state = {
    /* Variables */
    currentScene: 'rain_on_leaves',
    currentMusicTrack: 'still',
    currentTheme: Theme.staticThemes['dark'],
    sceneAudioVolume: 50,
    musicAudioVolume: 20,
    alarmVolume: 70,
    /* Functions */
    setStateFunction: this.updateState,
    /* Static Data */
    mediaSources: MediaSources,
    /* Flags */
    videoLoaded: false,
    musicMuted: false,
    sfxMuted: false,
    videoDisabled: false,
    presetsMenuExpanded: false,
    timerSetupShowing: false,
    settingsShowing: false,
    /* Timer State */
    timerMode: 'Session',
    timerSessionLength: 1,
    timerBreakLength: 2,
    timerStatus: 'stopped',
    timerDuration: 60,
    timerInterval: undefined,
    timerComponent: undefined
  }

  showOverlay = () => {
    
    if(this.state.timerSetupShowing){
      return true
    }

    if(this.state.settingsShowing){
      return true
    }

    return false
  }

  componentDidMount = () => {
    SettingsStore.loadSettings(this.state)
  }


  render = () => {

    return(
      <div id="app" style={this.appStyle}>
        <SceneImage appState={this.state} />
        <AudioPlayer appState={this.state} type='sfx' />
        <AudioPlayer appState={this.state} type='music' />
        <SceneVideo appState={this.state} />
        <div id="appTop">
          <TitleBar appTitleText="Calmeo" appState={this.state} />
        </div>
        { this.showOverlay() &&
          <div id='appOverlay'>
            { this.state.timerSetupShowing && <TimerSetup appState={this.state} />}
            { this.state.settingsShowing && <Settings appState={this.state} />}
          </div>
        }
        <SidePanel id="leftPanel" appState={this.state} type="timerPresets"/>
        <SidePanel id="rightPanel" appState={this.state} type="toggles"/>
        <div id="appMiddle">          
          <div id="appCenter">
            {<Timer appState={this.state} />}
          </div>          
        </div>
        <div id="appBottom">
          <SceneControlPanel 
            appState={this.state}
          />
        </div>
      </div>
    );
  }
}

/* Render App */
ReactDOM.render(
  <App />,
  document.querySelector('body')
);

module.hot.accept()