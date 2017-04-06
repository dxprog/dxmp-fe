import * as React from 'react';

interface Props {
  id: number;
  imageUrl?: string;
  title: string;
}

export class AlbumListItemHeader extends React.Component<Props, undefined> {
  props: Props;

  render() {
    return (
      <li className="albumListItemHeader" key={this.props.id}>
        <img 
          src={this.props.imageUrl || ''} 
        />
        <h3>{this.props.title}</h3>
      </li>
    );
  }
}