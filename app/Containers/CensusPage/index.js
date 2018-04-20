import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import injectReducer from "../../utils/injectReducer";
import injectSaga from "../../utils/injectSaga";

import reducer from "./reducers";
import saga from "./sagas";
import makeSelectCensusPage from "./selectors";

import { actionReadData } from "./actions";

export class CensusPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.readData({
      filterInfo: {
        gender: ["male"]
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log("[nextProps]: ", nextProps);
  }
  render() {
    return <div>Census Page</div>;
  }
}

const mapStateToProps = createStructuredSelector({
  CensusPage: makeSelectCensusPage()
});

const mapDispatchToProps = dispatch => {
  return {
    readData: filterInfo => dispatch(actionReadData(filterInfo))
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: "CensusPage", reducer });
const withSaga = injectSaga({ key: "CensusPage", saga });

export default compose(withReducer, withSaga, withRouter, withConnect)(
  CensusPage
);
