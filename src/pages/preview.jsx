import React, { Component } from 'react';
import Link from 'umi/link';
import { Icon, Button, Slider } from 'antd';
import lottie from 'lottie-web';
import update from 'immutability-helper';

import './preview.less';
class preview extends Component {
  constructor(props) {
    super(props);
    this.lottieView = {};
    this.currentTime = 0;
    this.timerCurentTime = 0;
    this.state = {
      lottieFile: null,
      currentTime: 0,
      lottieConfig: {
        play: false,
        loop: true,
        totalFrames: 0,
        frameRate: 0,
      },
    }
  }

  async componentDidMount() {
    console.log('did');
    const { url } = this.props.location.query;
    // const _this = this;
    if (!url) {
      return;
    }
    const lottieFile = await fetch(decodeURIComponent(url)).then(res => res.json());
    this.lottieView = lottie.loadAnimation({
      container: this.el,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: JSON.parse(JSON.stringify(lottieFile)), // the animation data
      rendererSettings: {
        scaleMode: 'scale',
        clearCanvas: true,
        progressiveLoad: true, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
        hideOnTransparent: false, // Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
      },
    });
    this.lottieView.addEventListener('enterFrame', event => {
      this.currentTime = Number.parseInt(event.currentTime, 10);
    });
    this.timerCurentTime = setInterval(this.updateCurrentTime, 1000 / this.lottieView.frameRate || 25);
    this.setState({
      lottieConfig: {
        play: true,
        loop: true,
        totalFrames: this.lottieView.totalFrames,
        frameRate: this.lottieView.frameRate,
      }
    });
  }

  updateCurrentTime = () => {
    this.setState(update(this.state, {
      currentTime: { $set: this.currentTime }
    }));
  }

  handleSliderChange = (value) => {
    if (this.state.lottieConfig.play) {
      this.lottieView.goToAndPlay(value, true);
    } else {
      this.lottieView.goToAndStop(value, true);
    }
  }

  toggle = () => {
    this.setState(update(this.state, {
      lottieConfig: {
        $toggle: ['play'],
      }
    }));
  }

  stop = () => {
    this.setState(update(this.state, {
      lottieConfig: {
        play: { $set: false }
      }
    }));
  }

  handleLoop = () => {
    this.setState(update(this.state, {
      lottieConfig: {
        $toggle: ['loop'],
      }
    }));
  }

  render() {
    const { currentTime = 0, lottieConfig } = this.state;
    const { totalFrames = 0, play = false, loop } = lottieConfig;
    return (
      <div className="preview">
        <div className="header">
          <div className="icon-close">
            <Link to="/"><Icon type="close" /></Link>
          </div>
          <div className="icon-fullscreen">
            <Icon type="eye" />
          </div>
        </div>
        <div className="lottie-body">
          <div ref={c => { this.el = c; }} className="lottie-container"></div>
        </div>
        <div className="lottie-controller">
          <div className="action-panel">
            <div className="action-bar">
              <div className="action-play">
                <Icon type={!play ? 'play-circle' : 'pause-circle'} onClick={this.toggle} />
                <span>{currentTime} / {totalFrames}</span>
              </div>
              <Slider
                className="play-slider"
                min={0}
                max={totalFrames}
                onChange={this.handleSliderChange}
                value={currentTime}
              />
              <div className="action-loop" onClick={this.handleLoop}>
                <Icon type="retweet" style={{ color: `${loop ? '#484848' : '#eee'}` }} />
              </div>
            </div>
          </div>
          <div className="action-btn">
            <Button className="action">
              border
            </Button>
            <Button className="action">
              background
            </Button>
            <Button className="action">
              Trim
            </Button>
            <Button className="action">
              Scale
            </Button>
            <Button className="action">
              Speed
            </Button>
            <Button className="action">
              ShowKeyPaths
            </Button>
            <Button className="action">
              RenderGraph
            </Button>
            <Button className="action">
              Lint
            </Button>
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log(this.state.lottieConfig);
    // console.log(prevState.lottieConfig);
    const lottieConfig = this.state.lottieConfig;
    if (lottieConfig !== prevState.lottieConfig) {
      if (lottieConfig.play) {
        this.lottieView.play();
      } else {
        const currentRawFrame = Math.round(this.lottieView.currentRawFrame);
        this.lottieView.pause();
        this.lottieView.setCurrentRawFrameValue(currentRawFrame);
      }
      console.log('lottieConfig.loop', lottieConfig.loop);
      
      if (lottieConfig.loop) {
        this.lottieView.onLoopComplete = () => {};
      } else {
        this.lottieView.onLoopComplete = this.stop;
      }
    }
  }

  componentWillUnmount() {
    console.log('unmound');
    clearInterval(this.timerCurentTime);
    this.lottieView.destroy && this.lottieView.destroy();
  }

}

export default preview;