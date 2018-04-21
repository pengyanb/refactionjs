import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';

if (process.env.NODE_ENV !== 'test') {
  require('react-table/react-table.css');
}

export default class DataTableComponent extends React.Component {
  render() {
    return (
      <ReactTable
        className="striped -highlight"
        defaultPageSize={5}
        columns={this.props.columns}
        data={this.props.data}
        FilterComponent={
          this.props.FilterComponent ? this.props.FilterComponent : undefined
        }
      />
    );
  }
}

DataTableComponent.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  FilterComponent: PropTypes.func,
};
