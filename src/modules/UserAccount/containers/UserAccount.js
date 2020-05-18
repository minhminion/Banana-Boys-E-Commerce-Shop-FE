import { connect } from "react-redux"
import { multilanguage } from "redux-multilanguage"
import UserAccount from "../components/UserAccount"

const mapStateToProps = (state, props) => {
    return ({
        user: state.user.user
    })
}

const mapDispatchToProps = (dispatch, props) => ({
  })

export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(UserAccount))