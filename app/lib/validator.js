var validator= require( 'tv4'),
    formats= require( 'tv4-formats'),
    kind= require( 'elucidata-type'),
    schemas= [
      require( '../stores/schema/entry.js'),
      require( '../stores/schema/project.js')
    ].
    reduce(( all, schema)=>{
      all[ schema.id]= schema
      return all
    }, {})

console.log("Data Schemas:", schemas);

function isValid(data, type) {
  var schema= schemas[ type]

  if( schema == null) {  // jshint ignore:line
    throw new Error( "Invalid schema type. Must be one of: "+ Object.keys( schemas).join(", ") )
  }

  return validator.validateMultiple( data, schema, true, true)
}


module.exports= {

  isValid,

  schemaChecker( mgr, type) {
    return function( data, isAdd) {
      if( isAdd === true) data.id= '-'
      var report= isValid( data, type)
      mgr.notify( report)
      console.log( "Validation Report:", report)
      return report.valid
    }
  },

  emptyObjectChecker(mgr) {
    return ( varHash)=>{
      var report= {
        errors: [],
        missing: []
      }
      Object.keys( varHash).forEach(( name)=>{
        if( kind.isEmpty( varHash[ name])) {
          report.errors.push({
            message: 'Missing required property: '+ name
          })
        }
      })
      report.valid= (report.errors.length === 0)
      mgr.notify( report)
      console.log( "Validation Report:", report)
      return report.valid
    }
  },

  emptyChecker( mgr) {
    return function( variable, variableName) {
      var report, msg

      if( kind.isEmpty( variable)) {
        msg= 'Missing required property'+ (variableName ? ': '+ variableName : '.')
        report= {
          valid: false,
          errors: [
          {
            message: msg
          }
          ],
          missing: []
        }
      }
      else {
        report= {
          valid: true,
          errors: [],
          missing: []
        }
      }
      mgr.notify( report)
      console.log( "Validation Report:", report)
      return report.valid
    }
  }
}
