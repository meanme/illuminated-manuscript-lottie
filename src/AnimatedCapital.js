import React, { createRef, Component } from 'react';

import { fromEvent } from 'rxjs';
import { 
  debounceTime, 
  distinctUntilChanged,
  startWith,
  tap,
  map
 } from 'rxjs/operators';
import Lottie from './lottie-react/Lottie';
import * as animationData from './capital-e.json';

class AnimatedCapital extends Component {

  constructor(props) {
    super(props);

    const animationState = this.getAnimationState(window.innerWidth);

    this.state = {
      animationState,
      targetFrame: this.getInitialFrame(animationState),
      isStopped: false, 
      isPaused: false
    };
    this.wrapper = createRef();
    this.windowResize = undefined;
    this.animation = undefined;
  }

  componentDidMount() {
    this.windowResize = fromEvent(window, 'resize')
      .pipe(
        debounceTime(250),
        map(event => event.target.innerWidth),
        startWith(window.innerWidth),
        map(this.getAnimationState),
        distinctUntilChanged(),
        tap(this.onAnimationStateChange)
      )
      .subscribe();
  }

  getAnimationState = (width) => {
    // return the largest size
    if (width >= 780) {
      return 'large';
    } else if (width > 400) {
      return 'medium';
    } else {
      return 'small';
    }
  }

  componentWillUnmount() {
    this.windowResize.unsubscribe();
  }

  onEnterFrame = (event) => {
    const {
      targetFrame
    } = this.state;

    if (event.currentTime === targetFrame) {
      this.animation.pause();
    }
  };

  onAnimationStateChange = (newAnimationState) => {
    let direction = 1;

    const {
      animationState
    } = this.state;

    if (animationState === newAnimationState) {
      return;
    }

    if (animationState === 'small' ||
      (animationState === 'medium' && newAnimationState === 'large')) {
      direction = 1;
    } else {
      direction = -1;
    }

    this.setState({
      animationState: newAnimationState,
      targetFrame: this.getInitialFrame(newAnimationState)
    });

    this.animation.setDirection(direction);
    this.animation.play();
  }

  getInitialFrame = (animationState) => {
    switch(animationState) {
      case 'small':
      return 0;
      case 'medium':
      return 70;
      case 'large':
      return 129;
      default:
      return 0;
    }
  }

  render() {
    const {
      animationState
    } = this.state;

    const eventListeners = [
      {
        eventName: 'enterFrame',
        callback: this.onEnterFrame,
      }
    ];

    const defaultOptions = {
      loop: false,
      autoplay: false, 
      initialFrame: this.getInitialFrame(animationState),
      animationData: animationData.default,
      segments: [
        [0, 149],
        [150, 299]
      ],
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return (
      <span className="animated-capital">
        <Lottie 
          options={defaultOptions}
          height={'30vw'}
          width={'30vw'}
          style={{display: 'inline-block', marginRight: 10, verticalAlign: 'bottom'}}
          ariaRole="heading"
          ariaLabel="E"
          animation={(anim) => this.animation = anim}
          eventListeners={eventListeners}
          isStopped={this.state.isStopped}
          isPaused={this.state.isPaused}
        />
      </span>
    );
  }
}


export default AnimatedCapital;