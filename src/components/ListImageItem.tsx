import * as React from 'react';

export interface ListImageItemProps {
  id: number;
  imageUrl: string;
  title: string;
}

export class ListImageItem extends React.Component<ListImageItemProps, {}> {
  render() {
    return (
      <li key={this.props.id}>
        <img src={this.props.imageUrl} alt={this.props.title} />
        <h3>{this.props.title}</h3>
      </li>
    );
  }
}