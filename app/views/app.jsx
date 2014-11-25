var Storefront= require( 'storefront'),
    React= require( 'react/addons'),
    ProjectList= require( './project-list.jsx'),
    ProjectForm= require( './project-form.jsx'),
    projectStore= Storefront.get( "Projects")

module.exports=
React.createClass({

  getInitialState() {
    return {
      adding: false
    }
  },

  formAddClick( e) {
    e.preventDefault()
    this.setState({ adding:true})
  },

  formOnClose() {
    this.setState({ adding:false})
  },

  render() {
    return (
      <article>
        <h1>Projects</h1>
        <ProjectList projects={ projectStore.allProjects() }/>
        { this.renderForm()}
      </article>
    )
  },

  renderForm() {
    if( this.state.adding) {
      return <div className="project-item add"><ProjectForm onClose={ this.formOnClose} /></div>
    }
    else {
      return <div onClick={ this.formAddClick} className="project-item add"><a>Add Project</a></div>
    }
  }
})
