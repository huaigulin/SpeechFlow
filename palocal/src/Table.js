import React, { Component } from 'react';

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Role</th>
      </tr>
    </thead>
  );
};

const TableBody = props => {
  console.log(props);
  const rows = props.people.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.name}</td>
        <td>{row.role}</td>
      </tr>
    );
  });
  return <tbody>{rows}</tbody>;
};

class Table extends Component {
  render() {
    // const { people } = this.props.peopleData;
    return (
      <table>
        <TableHeader />
        <TableBody people={this.props.peopleData} />
      </table>
    );
  }
}

export default Table;
