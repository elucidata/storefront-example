var Storefront= require( 'storefront'),
    uid= require( 'storefront/lib/uid'),
    kind= require( 'elucidata-type'),
    Validator= require( '../lib/validator.js')

module.exports=
Storefront.define( 'Projects', ( mgr)=>{
  var {actions, outlets, observes, before, notify}= mgr,
      isValid= Validator.schemaChecker( mgr, 'project'),
      isNotEmpty= Validator.emptyObjectChecker( mgr)

  var _projects= []

  actions({

    add( action) {
      var name= action.payload
      if( isNotEmpty({ name })) {
        _projects.push({
          id: uid(),
          name: name,
          time: 0
        })
        mgr.dataHasChanged()
      }
    },

    update( action) {
      var project= action.payload
      if( isValid( project)) {
        _projects.
          filter(( _proj)=>{
            return _proj.id === project.id
          }).
          forEach(( _proj)=>{
            _proj.name= project.name
            mgr.dataHasChanged()
          })
      }
    },

    remove( action) {
      var len= _projects.length,
          id= action.payload
      if( isNotEmpty({ id })) {
        _projects= _projects.
          filter(( project)=>{
            return project.id !== id
          })
      }
      if( len !== _projects.length ) {
        mgr.dataHasChanged()
      }
    }
  })

  outlets({

    get( id) {
      return _projects.
        filter(( project)=>{
          return project.id === id
        })[ 0]
    },

    allProjects() {
      return _projects
    }

  })

  observes( 'Entries', {

    add( action) {
      _projects.
        filter(( project)=>{
          return project.id === action.payload.projectId
        }).
        forEach(( project)=>{
          project.time += action.payload.duration
          mgr.dataHasChanged()
        })
    }
  })

})
