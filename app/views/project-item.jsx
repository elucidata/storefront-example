var React= require( 'react/addons'),
    entriesStore= require( '../stores/entries.js'),
    timer= require( '../stores/timer.js'),
    formatTimecode= require( '../lib/timecode.js')

module.exports=
React.createClass({

  isActive() {
    return timer.isActive() && timer.getProjectId() === this.props.id
  },

  toggleTimer( e) {
    e.preventDefault()
    console.log( 'ProjectItem.toggleTimer')
    if( timer.isActive()) {
      timer.stop()
    }
    else {
      timer.start( this.props.id)
    }
  },

  render() {
    var cls= this.isActive() ? 'active' : ''
    return (
      <div className={ "project-item "+ cls }>
        { this.renderTimerButton() }
        { this.renderTime() }
        <strong className="name">{ this.props.name }</strong>
        <span className="entry-count">({ entriesStore.entriesForProject( this.props).length} entries)</span>
        </div>
    )
  },

  renderTimerButton() {
    if( timer.isActive()) {
      if( this.isActive()) {
        return <i onClick={this.toggleTimer} className="fa fa-clock-o fa-spin fa-stopX"/>
      }
      else {
        return <i disabled className="fa fa-play-circle-o"/>
      }
    }
    else {
      return  <i onClick={this.toggleTimer} className="fa fa-play-circle"/>
    }
  },

  renderTime() {
    var time
    if( timer.isActive() && timer.getProjectId() == this.props.id) {
      time= this.props.time + timer.duration()
    }
    else {
      time= this.props.time
    }

    return <span className="time">{ formatTimecode( time)}</span>
  }
})
