var Storefront= require( 'storefront'),
    kind= require( 'elucidata-type')

module.exports=
Storefront.define( 'Timer', ( mgr)=>{
  var {actions, handles, observes, provides}= mgr

  actions({

    start( dispatch, projectId) {
      if( kind.isEmpty( projectId)) {
        return mgr.notify('Project ID cannot be empty.')
      }
      projectId= projectId.id || projectId
      dispatch({ projectId })
    },

    stop( dispatch) { dispatch() },
    cancel( dispatch) { dispatch() }
  })

  handles({

    start( action) {
      startTracking( action.payload.projectId)
    },

    cancel( action) {
      stopTracking()
    },

    stop( action) {
      mgr.waitFor( 'Entries')
      stopTracking()
    }
  })

  var active, currentProject, startedAt, _timer

  provides({

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
