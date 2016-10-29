import * as React from 'react';

export interface ListImageItemProps {
  imageUrl: string;
  title: string;
}

export class ListImageItem extends React.Component<ListImageItemProps, {}> {
  render() {
    return <li>
      <img src={this.props.imageUrl} alt={this.props.title} />
      <h3>{this.props.title}</h3>
    </li>;
  }
}