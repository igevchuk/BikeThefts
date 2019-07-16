import * as React from 'react';
import cx from 'classnames';

export namespace Map {
  export interface Props {
    className?: string;
  }
  export interface State {

  }
}

export class Map extends React.Component<Map.Props, Map.State> {
  constructor(props: any, context?: any) {
    super(props);
    this.state = {

    };
  }


  render() {
    const { className} = this.props;

    return (
      <div className={cx('map', className)}>Map</div>
    );
  }
}
