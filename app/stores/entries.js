var Storefront= require( 'storefront'),
    uid= require( 'storefront/lib/uid'),
    merge= require( 'storefront/lib/merge'),
    Validator= require( '../lib/validator.js')

module.exports=
Storefront.define( 'Entries', store =>{
  var isValid= Validator.schemaChecker( store, 'entry'),
      timer= store.get( 'Timer')

  // Internal state
  var _entries= []

  store.actions({

    add( action) {
      if( isValid( action.payload)) {
        _entries.push( action.payload)
        store.hasChanged()
      }
    }
  })

  store.observes( timer, {

    stop( action) {
      console.log( "Timer stopped, adding entry!")
      store.invoke( 'add', {
        id: uid(),
        created: (new Date()).getTime(),
        projectId: timer.getProjectId(),
        duration: timer.duration(),
        started: timer.startedAt()
      })
    }
  })

  store.outlets({

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
