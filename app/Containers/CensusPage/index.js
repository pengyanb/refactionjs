import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import ReactSelect from "react-select";
import injectReducer from "../../utils/injectReducer";
import injectSaga from "../../utils/injectSaga";

import reducer from "./reducers";
import saga from "./sagas";
import makeSelectCensusPage from "./selectors";

import { actionReadData } from "./actions";

import DataTableComponent from "../../Components/DataTableComponent";

if (process.env.NODE_ENV !== 'test') {
  require("react-select/dist/react-select.css");
  require("./index.scss");
}

const COLUMN_MAPPER = [
  {
    key: "_id",
    label: "ID",
    filterable: false,
    sortable: true
  },
  {
    key: "name",
    label: "Name",
    filterable: true,
    sortable: true
  },
  {
    key: "gender",
    label: "Gender",
    filterable: true,
    sortable: true,
    useCustomFilter: true
  },
  {
    key: "age",
    label: "Age",
    filterable: true,
    sortable: true,
    useCustomFilter: true
  }
];

const SELECT_OPTIONS_INFO = {
  gender: [
    {
      value: "male",
      label: "male"
    },
    {
      value: "female",
      label: "female"
    }
  ],
  age: [
    {
      value: 20,
      label: "20"
    },
    {
      value: 24,
      label: "24"
    },
    {
      value: 30,
      label: "30"
    },
    {
      value: 55,
      label: "55"
    }
  ]
};
export class CensusPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterInfo: {
        gender: [],
        age: {
          $gte: null,
          $lte: null
        },
        name: ""
      }
    };
  }
  componentWillMount() {
    this.props.readData(this.state.filterInfo);
  }
  // componentWillReceiveProps(nextProps) {
  //   console.log("[nextProps]: ", nextProps);
  // }
  projectDataTableColumns = () => {
    return COLUMN_MAPPER.map(columnInfo => {
      return {
        id: columnInfo.key,
        Header: () => <h5>{columnInfo.label}</h5>,
        filterable: columnInfo.filterable,
        sortable: columnInfo.sortable,
        getHeaderProps: () => {
          if (columnInfo.useCustomFilter === true) {
            return {
              style: {
                overflow: "visible"
              }
            };
          } else {
            return {};
          }
        },
        Cell: props => {
          const originalData = props.original[columnInfo.key];
          const index = props.index;
          if (typeof originalData !== typeof undefined) {
            return (
              <div style={{ width: "100%", textAlign: "center" }}>
                <span>{originalData}</span>
              </div>
            );
          } else {
            return null;
          }
        }
      };
    });
  };
  render() {
    let data;
    if (this.props.CensusPage.readDataResult.error === false) {
      data = this.props.CensusPage.readDataResult.data;
    }
    return (
      <div>
        {data ? (
          <DataTableComponent
            data={data}
            columns={this.projectDataTableColumns()} 
            FilterComponent={filterComponentInfo => {
              const columnId = filterComponentInfo.column.id;
              let useCustomFilter = false;
              let columnKey;
              COLUMN_MAPPER.map(columnInfo => {
                if (
                  columnInfo.key === columnId &&
                  columnInfo.useCustomFilter === true
                ) {
                  useCustomFilter = true;
                  columnKey = columnInfo.key;
                }
              });
              let value = this.state.filterInfo[columnKey];
              if (useCustomFilter) {
                if (columnKey === "age") {
                  return (
                    <div>
                      <div style={{ display: "inline-block", width: "10%" }}>
                        <span>{">="}</span>
                      </div>
                      <div style={{ display: "inline-block", width: "40%" }}>
                        <ReactSelect
                          value={this.state.filterInfo[columnKey].$gte}
                          options={SELECT_OPTIONS_INFO[columnKey]}
                          clearable
                          placeholder="greater or equal"
                          onChange={selectedItem => {
                            const filterInfo = this.state.filterInfo;
                            if (selectedItem) {
                              filterInfo[columnKey].$gte = selectedItem.value;
                            } else {
                              filterInfo[columnKey].$gte = null;
                            }
                            this.setState({ filterInfo }, () => {
                              this.props.readData(this.state.filterInfo);
                            });
                          }}
                        />
                      </div>
                      <div style={{ display: "inline-block", width: "10%" }}>
                        <span>{"<="}</span>
                      </div>
                      <div style={{ display: "inline-block", width: "40%" }}>
                        <ReactSelect
                          value={this.state.filterInfo[columnKey].$lte}
                          options={SELECT_OPTIONS_INFO[columnKey]}
                          clearable
                          placeholder="less or equal"
                          onChange={selectedItem => {
                            const filterInfo = this.state.filterInfo;
                            if (selectedItem) {
                              filterInfo[columnKey].$lte = selectedItem.value;
                            } else {
                              filterInfo[columnKey].$lte = null;
                            }
                            this.setState({ filterInfo }, () => {
                              this.props.readData(this.state.filterInfo);
                            });
                          }}
                        />
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div>
                      <ReactSelect
                        value={this.state.filterInfo[columnKey]}
                        options={SELECT_OPTIONS_INFO[columnKey]}
                        searchable
                        clearable
                        multi
                        onChange={selectedItems => {
                          const filterInfo = this.state.filterInfo;
                          if (selectedItems) {
                            filterInfo[columnKey] = selectedItems.map(
                              selectedItem => selectedItem.value
                            );
                          } else {
                            filterInfo[columnKey] = [];
                          }
                          this.setState({ filterInfo }, () => {
                            this.props.readData(this.state.filterInfo);
                          });
                        }}
                      />
                    </div>
                  );
                }
              } else {
                return (
                  <div>
                    <input
                      type="text"
                      onChange={evt => {
                        console.log("evt: ", evt.target.value);
                        const filterInfo = this.state.filterInfo;
                        filterInfo.name = evt.target.value;
                        this.setState(filterInfo, () => {
                          this.props.readData(this.state.filterInfo);
                        });
                      }}
                    />
                  </div>
                );
              }
            }}
          />
        ) : null}
      </div>
    );
  }
}

CensusPage.propTypes = {
  readData: PropTypes.func.isRequired,
  CensusPage: PropTypes.object.isRequired,
};

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
