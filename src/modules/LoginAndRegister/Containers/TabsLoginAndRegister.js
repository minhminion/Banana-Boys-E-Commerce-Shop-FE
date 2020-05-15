import { connect } from "react-redux";
import handlers from "../handlers";
import TabsLoginAndRegister from "../Components/TabsLoginAndRegister";
// import { MODULE_NAME as MODULE_VIEW } from '../models'

const mapDispatchToProps = (dispatch, props) => ({
  ...handlers(dispatch, props),
});

const mapStateToProps = (state, props) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabsLoginAndRegister);
