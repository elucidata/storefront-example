var React= require( 'react/addons'),
    Storefront= require( 'storefront'),
    projectStore= require( '../stores/projects.js')

module.exports=
React.createClass({
  mixins: [
    Storefront.mixins.eventHelper
  ],

  getInitialState() {
    return {
      error: '',
      showError: false
    }
  },

  hideError( e) {
    e.preventDefault()
    this.setState({ showError:false}, ()=>{
      this.refs.name.getDOMNode().focus()
    })
  },

  componentDidMount() {
    this.onStoreEvent( projectStore, 'notify', this.onProjectNotify)
  },

  onProjectNotify( e) {
    if( e.valid) {
      this.props.onClose()
    }
    else {
      this.setState({ error:e.message, showError:true }, ()=> {
        this.refs.name.getDOMNode().focus()
      })
    }
  },

  formOnSubmit( e) {
    e.preventDefault()
    projectStore.add( this.refs.name.getDOMNode().value)
  },

  render() {
    return (
      <form onSubmit={ this.formOnSubmit}>
        <input type="text" ref="name" autoFocus/>
        <input type="submit" value="Add"/>
        { this.renderError()}
      </form>
    )
  },

  renderError() {
    var hasError= this.state.showError,  // jshint ignore:line
        opacity= hasError ? 1 : 0
    return <div style={{ opacity }} onClick={ this.hideError} className="form-error">{ this.state.error}</div>
  }
})
