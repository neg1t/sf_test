import { connect } from "react-redux"

let Header = ({
  shadow
}) => {
  return (
    <header>
      <div className={`header ${shadow ? 'shadow' : ''}`}>
        <h1>Solution Factory Test App</h1>
      </div>
    </header>
  )
}
const mapStateToProps = state => {
  return {
    shadow: state.chequesReducers.deletingActivate
  }
}

export default connect(mapStateToProps)(Header)