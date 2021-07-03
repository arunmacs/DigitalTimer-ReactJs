import {Component} from 'react'
import './index.css'

const playImg = 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
const playImgAlt = 'play icon'
const pauseImg = 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
const pauseImgAlt = 'pause icon'

class DigitalTimer extends Component {
  state = {isTimerStarted: false, timerMins: 25, timerSecs: 0}

  startTimer = () => {
    const {timerMins, timerSecs} = this.state
    const isTimerFinished = timerSecs === timerMins * 60

    if (isTimerFinished) {
      this.clearTimer()
      this.setState({
        isTimerStarted: false,
      })
    } else {
      this.setState(prevState => ({timerSecs: prevState.timerSecs + 1}))
    }
  }

  clearTimer = () => clearInterval(this.timerId)

  onClickStartPause = () => {
    const {isTimerStarted, timerMins, timerSecs} = this.state

    const isTimerFinished = timerSecs === timerMins * 60

    if (isTimerFinished) {
      this.setState({timerSecs: 0})
    }
    if (isTimerStarted) {
      this.clearTimer()
    } else {
      this.timerId = setInterval(this.startTimer, 1000)
    }

    this.setState(prevState => ({
      isTimerStarted: !prevState.isTimerStarted,
    }))
  }

  resetTimer = () => {
    this.clearTimer()
    this.setState({isTimerStarted: false, timerMins: 25, timerSecs: 0})
  }

  getTimerInTimeFormat = () => {
    const {timerMins, timerSecs} = this.state
    const totalRemSeconds = timerMins * 60 - timerSecs
    const mins = Math.floor(totalRemSeconds / 60)
    const secs = Math.floor(totalRemSeconds % 60)
    const minsInString = mins > 9 ? mins : `0${mins}`
    const secsInString = secs > 9 ? secs : `0${secs}`

    return {minsInString, secsInString}
  }

  increaseCounterMin = () => {
    const {timerMins} = this.state
    if (timerMins > 0) {
      this.setState({timerMins: timerMins + 1})
    }
  }

  decreaseCounterMin = () => {
    const {timerMins} = this.state
    if (timerMins > 0) {
      this.setState({timerMins: timerMins - 1})
    }
  }

  render() {
    const {isTimerStarted, timerMins, timerSecs} = this.state
    const isTimerControllerActive = timerSecs > 0
    const {minsInString, secsInString} = this.getTimerInTimeFormat()

    return (
      <div className="container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-content-div">
          <div className="timer-display-bg">
            <div className="timer-display-div">
              <h1 className="count-down-display">
                {`${minsInString}:${secsInString}`}
              </h1>
              <p className="timer-status-text">
                {isTimerStarted ? 'Running' : 'Paused'}
              </p>
            </div>
          </div>
          <div className="timer-ui-div">
            <div className="start-reset-div">
              <button type="button" className="play-pause-reset-button">
                <img
                  src={isTimerStarted ? pauseImg : playImg}
                  alt={isTimerStarted ? pauseImgAlt : playImgAlt}
                  className="play-pause-reset-image"
                  onClick={this.onClickStartPause}
                />
                {isTimerStarted ? 'Pause' : 'Start'}
              </button>
              <button type="button" className="play-pause-reset-button">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="play-pause-reset-image"
                  onClick={this.resetTimer}
                />
                Reset
              </button>
            </div>
            <p className="set-timer-text">Set Timer limit</p>
            <div className="set-timer-div">
              <button
                type="button"
                onClick={this.decreaseCounterMin}
                disabled={isTimerControllerActive}
                className="plus-minus-button"
              >
                -
              </button>
              <p className="timer-value"> {timerMins} </p>
              <button
                type="button"
                disabled={isTimerControllerActive}
                onClick={this.increaseCounterMin}
                className="plus-minus-button"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
