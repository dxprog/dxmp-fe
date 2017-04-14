import * as React from 'react';

interface Props {
  id: number;
  imageUrl?: string;
  isDirectMatch: boolean;
  title: string;
}

export class AlbumListItemHeader extends React.Component<Props, undefined> {
  props: Props;

  render() {
    const classNames = ['albumListItemHeader'];
    if (this.props.isDirectMatch) {
      classNames.push('albumListItemHeaderMatch');
    }

    return (
      <div className={classNames.join(' ')} key={this.props.id}>
        <img 
          src={this.props.imageUrl || ''} 
        />
        <h3>{this.props.title}</h3>
      </div>
    );
  }
}