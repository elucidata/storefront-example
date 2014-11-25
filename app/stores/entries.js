var Storefront= require( 'storefront'),
    uid= require( 'storefront/lib/uid'),
    merge= require( 'storefront/lib/merge'),
    Validator= require( '../lib/validator.js')

module.exports=
Storefront.define( 'Entries', ( mgr)=>{

  var {actions, outlets, observes, before}= mgr,
      isValid= Validator.schemaChecker( mgr, 'entry'),
      timer= mgr.getStore( 'Timer')

  var _entries= []

  actions({

    add( action) {
      if( isValid( action.payload)) {
        _entries.push( action.payload)
        mgr.dataHasChanged()
      }
    }
  })

  observes( timer, {

    stop( action) {
      console.log( "Timer stopped, adding entry!")
      mgr.getClerk().add({
        id: uid(),
        created: (new Date()).getTime(),
        projectId: timer.getProjectId(),
        duration: timer.duration(),
        started: timer.startedAt()
      })
    }
  })

  outlets({

    allEntries() {
      return _entries
    },

    entriesForProject( id) {
      id = id.id || id // Handle id project.id
      return _entries.
        filter(( entry)=>{
          return entry.projectId === id
        })
    }
  })
})
