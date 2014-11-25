var Storefront= require( 'storefront'),
    uid= require( 'storefront/lib/uid'),
    kind= require( 'elucidata-type')

module.exports=
Storefront.define( 'Projects', ( mgr)=>{
  var {actions, handles, observes, provides}= mgr

  actions({

    add( dispatch, name) {
      if( kind.isEmpty( name)) {
        return mgr.notify({ valid:false, message:'Name cannot be empty.'})
      }
      else {
        mgr.notify({ valid:true })
      }
      dispatch({ name })
    },

    update( dispatch, id, name) {
      if( kind.isEmpty( id) || kind.isEmpty( name)) {
        return mgr.notify({ valid:false, message:'Neither ID nor Name can be empty.'})
      }
      else {
        mgr.notify({ valid:true })
      }
      dispatch({ id, name})
    },

    remove( dispatch, id) {
      if( kind.isEmpty( id)) {
        return mgr.notify({ valid:false, message:'ID cannot be empty.'})
      }
      else {
        mgr.notify({ valid:true })
      }
      id= id.id || id
      dispatch({ id })
    }
  })

  
  var _projects= []

  handles({

    add( action) {
      _projects.push({
        id: uid(),
        name: action.payload.name,
        time: 0
      })
      mgr.dataHasChanged()
    },

    update( action) {
      _projects.filter(( project)=>{
        return project.id === action.payload.id
      }).forEach(( project)=>{
        project.name= action.payload.name
        mgr.dataHasChanged()
      })
    },

    remove( action) {
      var len= _projects.length

      _projects= _projects.filter(( project)=>{
        return project.id !== action.payload.id
      })

      if( len !== _projects.length )
        mgr.dataHasChanged()
    }
  })

  provides({

    get( id) {
      return _projects.filter(( project)=>{
        return project.id === id
      })[ 0]
    },

    allProjects() {
      return _projects
    }

  })

  observes( 'Entries', {

    add( action) {
      _projects.filter(( project)=>{
        return project.id === action.payload.projectId
      }).forEach(( project)=>{
        project.time += action.payload.duration
        mgr.dataHasChanged()
      })
    }
  })

})
