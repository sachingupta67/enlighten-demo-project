import React from "react";
import CustomModal from "components/Modal/CustomModal";
import { bindActionCreators } from "redux";
import { errorReducerClear } from "../../redux/Actions/ActionCreators";
import { connect } from "react-redux";
import CustomLoader from "../../components/Loader/CustomLoader";
import { getItem } from "../../redux/Utils/AsyncUtils";
import { Strings } from "../../redux/Constants";

import MainNavbar from "components/Navbars/MainNavbar";
import DemoFooter from "components/Footers/DemoFooter";
class MasterLayout extends React.Component {
  modalHandler = () => {
    this.props.errorReducerClear();
  };
  render() {
    const { isLoading, status, message, masterStyle } = this.props;
    return (
      <div style={{ ...masterStyle }}>
        <CustomModal
          modal={status}
          message={message}
          modalHandler={this.modalHandler}
        />
        <CustomLoader loader={isLoading} />
        {getItem(Strings.KEY_USER_DATA) ? <MainNavbar /> : null}
        <div>{this.props.children}</div>
        {/* <DemoFooter /> */}
      </div>
    );
  }
}

const mapStateToProps = ({ loader, error }) => {
  const { status, errorDetails } = error;
  const { message, statusCode } = errorDetails;
  const { isLoading } = loader;

  return { loader, status, statusCode, message, isLoading };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      errorReducerClear,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(MasterLayout);
