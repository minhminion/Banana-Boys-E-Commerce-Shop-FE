import { connect } from "react-redux"
import { multilanguage } from "redux-multilanguage"
import AddAddress from "../components/AddAddress"
import handlers from "../handlers"

const mapStateToProps = (state, props) => {
    return ({
        user: state.user.user
    })
}

const mapDispatchToProps = (dispatch, props) => ({
    ...handlers(dispatch, props)
  })

export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(AddAddress))