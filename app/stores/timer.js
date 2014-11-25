var Storefront= require( 'storefront'),
    kind= require( 'elucidata-type'),
    Validator= require( '../lib/validator.js')

module.exports=
Storefront.define( 'Timer', ( mgr)=>{
  var {actions, outlets, observes, before}= mgr,
      isNotEmpty= Validator.emptyObjectChecker( mgr)

  var active, currentProject, startedAt, _timer

  actions({

    start( action) {
      if( isNotEmpty({ projectId:action.payload })) {
        startTracking( action.payload)
      }
    },

    cancel( action) {
      stopTracking()
    },

    stop( action) {
      mgr.waitFor( 'Entries')
      stopTracking()
    }
  })

  outlets({

    isActive() { return active },
    getProjectId() { return currentProject },
    startedAt() { return startedAt },

    duration() {
      if( active) {
        var now= (new Date()).getTime()
        return now - startedAt
      }
      else {
        return null
      }
    }
  })

  function tick() {
    console.log('timer.tick')
    mgr.dataHasChanged()
    _timer= setTimeout( tick, 1000)
  }

  function startTracking( projectId) {
    active= true
    currentProject= projectId
    startedAt= (new Date()).getTime()
    mgr.dataHasChanged()
    _timer= setTimeout( tick, 1000)
  }

  function stopTracking( triggerEvent) {
    active= false
    currentProject= null
    startedAt= null
    if( triggerEvent !== false)
      mgr.dataHasChanged()
    if( _timer) {
      clearTimeout( _timer)
      _timer= null
    }
  }

  stopTracking( false)
})
