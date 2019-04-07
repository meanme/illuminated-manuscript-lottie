import React, { PureComponent } from 'react';
import './IlluminatedManuscript.css';

export default class IlluminatedManuscript extends PureComponent {
  render() {
    const {
      children
    } = this.props;
    return (
      <div className="illuminated-manuscript">
        {children}
      </div>
    );
  }
}