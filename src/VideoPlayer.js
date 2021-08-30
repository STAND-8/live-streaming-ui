import React from 'react';
import 'shaka-player/dist/controls.css';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
const shaka = require('shaka-player/dist/shaka-player.ui.js');

//Creating class component
class VideoPlayer extends React.PureComponent {

    constructor(props) {

        super(props);
        this.state = {
            url2: 'https://d3ihgx4qqsi5hi.cloudfront.net/out/v1/ea671d64acd1489795d660beeeb547be/index.mpd',
            url: 'http://ftp.itec.aau.at/datasets/DASHDataset2014/BigBuckBunny/2sec/BigBuckBunny_2s_onDemand_2014_05_09.mpd'
        };
        //Creating reference to store video component on DOM
        this.videoComponent = React.createRef();

        //Creating reference to store video container on DOM
        this.videoContainer = React.createRef();

        //Initializing reference to error handlers
        this.onErrorEvent = this.onErrorEvent.bind(this);
        this.onError = this.onError.bind(this);
        this.player = null
    }

    play = () => {
        console.log(this.player)
        this.videoComponent.current.play()
    }
    pause = () => {
        this.videoComponent.current.pause()
    }

    Changevideo = () => {
        this.setState({ url: 'https://d3ihgx4qqsi5hi.cloudfront.net/out/v1/ea671d64acd1489795d660beeeb547be/index.mpd' })
    }

    onErrorEvent(event) {
        // Extract the shaka.util.Error object from the event.
        this.onError(event.detail);
    }

    onError(error) {
        // Log the error.
        console.error('Error code', error.code, 'object', error);
    }

    componentDidUpdate() {
        // This is an asynchronous process.
        this.player.load(this.state.url)
        // This runs if the asynchronous load is successful.
    }

    componentDidMount() {

        //Link to MPEG-DASH video


        //Getting reference to video and video container on DOM
        const video = this.videoComponent.current;
        const videoContainer = this.videoContainer.current;

        //Initialize shaka player
        this.player = new shaka.Player(video);

        //Setting UI configuration JSON object
        const uiConfig = {};

        //Configuring elements to be displayed on video player control panel
        uiConfig['controlPanelElements'] = ['mute', 'volume', 'time_and_duration', 'fullscreen', 'overflow_menu',];

        //Setting up shaka player UI
        const ui = new shaka.ui.Overlay(this.player, videoContainer, video);

        ui.configure(uiConfig); //configure UI
        ui.getControls();

        // Listen for error events.
        this.player.addEventListener('error', this.onErrorEvent);

        // Try to load a manifest.
        // This is an asynchronous process.
        this.player.load(this.state.url).then(function () {
            // This runs if the asynchronous load is successful.
            console.log('The video has now been loaded!');
        }).catch(this.onError);  // onError is executed if the asynchronous load fails.

    }

    changeUrl = (e) => {
        this.setState({ url: e.target.value})
    }

    render() {

        /*
        Returning video with a container. Remember, when setting up shaka player with custom UI, you must
        add your video component inside a container
        The container will be used by shaka player to add your customized UI for the player
        */
        return (
            <div>
                <div className="video-container" ref={this.videoContainer}>
                    <video
                        className="shaka-video"
                        ref={this.videoComponent}
                        poster="//shaka-player-demo.appspot.com/assets/poster.jpg"
                    />
                </div>
                <div className="button-container align">

                    <Button onClick={this.play} variant="contained" color="primary" className="button-p" >Play</Button>
                    <Button onClick={this.pause} variant="contained" color="primary" className="button-p" >Pause</Button>
                    <Button onClick={this.Changevideo} variant="contained" color="primary" className="button-p"  >Live Streaming</Button>


                </div>
                <div className="button-container align">
                    <TextField
                        id="standard-full-width"
                        label="Enter new url"
                        style={{ margin: 8 }}
                        placeholder="Placeholder"
                        onChange={(value) => {
                            this.changeUrl(value)

                        }}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
            </div>

        );
    }
}

export default VideoPlayer;