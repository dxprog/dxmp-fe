import * as React from 'react';

export interface ListSimpleItemProps {
  id: number;
  title: string;
}

export class ListSimpleItem extends React.Component<ListSimpleItemProps, {}> {
  render() {
    return <li key={this.props.id}>
      <h3>{this.props.title}</h3>
    </li>;
  }
}