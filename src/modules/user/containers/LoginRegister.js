import { connect } from 'react-redux'
import handlers from '../handlers'
import LoginRegister from '../components/LoginRegister'
// import { MODULE_NAME as MODULE_VIEW } from '../models'

const mapDispatchToProps = (dispatch, props) => ({
  ...handlers(dispatch, props)
})

const mapStateToProps = (state, props) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginRegister)