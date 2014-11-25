var Storefront= require( 'storefront'),
    uid= require( 'storefront/lib/uid'),
    merge= require( 'storefront/lib/merge')

module.exports=
Storefront.define( 'Entries', ( mgr)=>{
  var {actions, handles, observes, provides}= mgr,
      timerStore= mgr.getStore( 'Timer')

  actions({
    add( dispatch, data) {
      // TODO: Validate data
      dispatch( data)
    }
  })

  handles({
    add( action) {
      _entries.push(
        merge({
          id: uid(),
          created: (new Date()).getTime()
        }, action.payload)
      )
      mgr.dataHasChanged()
    }
  })

  observes( timerStore, {

    stop( action) {
      console.log("Timer stopped, adding entry!")
      mgr.getClerk().add({
        projectId: timerStore.getProjectId(),
        duration: timerStore.duration(),
        started: timerStore.startedAt()
      })
    }
  })

  var _entries= []

  provides({

    allEntries() {
      return _entries
    },

    entriesForProject( id) {
      id = id.id || id // Handle id project.id
      return _entries.filter(( entry)=>{
        return entry.projectId === id
      })
    }

  })
})
