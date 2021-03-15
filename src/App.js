import Header from './components/Header'
import Home from './pages/Home'
import { connect } from "react-redux"

let App = ({
  shadow
}) => {
  return (
    <main className={shadow ? 'shadow' : ''}>
      <Header />
      <Home />
    </main>
  );
}

const mapStateToProps = state => {
  return {
    shadow: state.chequesReducers.deletingActivate
  }
}

export default connect(mapStateToProps)(App)

