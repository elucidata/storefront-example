var Storefront= require( 'storefront'),
    kind= require( 'elucidata-type'),
    Validator= require( '../lib/validator.js')

module.exports=
Storefront.define( 'Timer', store => {
  var isNotEmpty= Validator.emptyObjectChecker( store)

  // State
  var active, currentProject, startedAt, _timer

  store.actions({

    start( action) {
      if( isNotEmpty({ projectId:action.payload })) {
        startTracking( action.payload)
      }
    },

    cancel( action) {
      stopTracking()
    },

    stop( action) {
      store.waitFor( 'Entries')
      stopTracking()
    }
  })

  store.outlets({

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
    store.hasChanged()
    _timer= setTimeout( tick, 1000)
  }

  function startTracking( projectId) {
    active= true
    currentProject= projectId
    startedAt= (new Date()).getTime()
    store.hasChanged()
    _timer= setTimeout( tick, 1000)
  }

  function stopTracking( triggerEvent) {
    active= false
    currentProject= null
    startedAt= null
    if( triggerEvent !== false)
      store.hasChanged()
    if( _timer) {
      clearTimeout( _timer)
      _timer= null
    }
  }

  stopTracking( false)
})
