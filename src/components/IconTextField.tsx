import * as React from 'react';

interface Props {
  leftIconSrc?: string;
  rightIconSrc?: string;
  onValueChange: Function;
}

export class IconTextField extends React.Component<Props, undefined> {
  props: Props;

  render() {
    return (
      <div className="iconTextFieldContainer">
        {this.props.leftIconSrc ? <img src={this.props.leftIconSrc} /> : null}
        <input type="text" onChange={this.onValueChange.bind(this)}/>
        {this.props.rightIconSrc ? <img src={this.props.rightIconSrc} width={16} height={16} /> : null}
      </div>
    );
  }

  onValueChange(event: any) {
    this.props.onValueChange(event.currentTarget.value);
  }
}