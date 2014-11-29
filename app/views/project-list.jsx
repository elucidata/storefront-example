var React= require( 'react/addons'),
    ProjectItem= require( './project-item.jsx')

module.exports=
React.createClass({

  render() {
    return (
      <ul>
        { this.props.projects.map(( project)=> <ProjectItem key={ project.id} {...project}/>)}
      </ul>
    )
  }
})
