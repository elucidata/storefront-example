var Storefront= require( 'storefront')

Storefront.configure({
  verbose: true,
  useRAF: true,
  logging: true
})


var React= require( 'react/addons'),
    projects= require( './stores/projects.js'),
    entries= require( './stores/entries.js'),
    timer= require( './stores/timer.js'),
    App= require( './views/app.jsx')

function renderApp() {
  console.log( '[Top-level render]')
  React.render(
    <App/>,
    document.body
  )
}

projects.add( 'Test project')
projects.add( 'A second project')

// Log the change events so you can see the sequence
// (and aggregated top-level onChange)
projects.onChange(()=> console.log( 'projects.onChanged') )
entries.onChange(()=> console.log( 'entries.onChanged') )
timer.onChange(()=> console.log( 'timer.onChanged') )

projects.onNotify(()=> console.info( 'projects.onNotify', arguments) )
entries.onNotify(()=> console.info( 'entries.onNotify', arguments) )
timer.onNotify(()=> console.info( 'timer.onNotify', arguments) )

Storefront.onChange( renderApp)

// For playing in the console...
module.exports= { Storefront, projects, entries, timer }

renderApp()

console.log(
  ` ******************************************************
  You can access the Storefront object and the projects,
  entries, and timer stores via the 'App' global.

  Have fun!
  ******************************************************`)
