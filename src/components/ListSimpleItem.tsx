import * as React from 'react';

interface ListSimpleItemProps {
  id: number;
  title: string;
  onClick: Function;
}

export class ListSimpleItem extends React.Component<ListSimpleItemProps, {}> {
  render() {
    return (
      <li key={this.props.id} onClick={this.props.onClick.bind(this)}>
        <h3>{this.props.title}</h3>
      </li>
    );
  }
}