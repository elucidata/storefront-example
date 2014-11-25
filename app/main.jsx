var Storefront= require( 'storefront'),
    React= require( 'react/addons'),
    projects= require( './stores/projects.js'),
    entries= require( './stores/entries.js'),
    timer= require( './stores/timer.js'),
    App= require( './views/app.jsx')

Storefront.configure({
  verbose: true,
  useRAF: true
})

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

Storefront.onChange( renderApp)

// For playing in the console...
module.exports= { Storefront, projects, entries, timer }

renderApp()
