import React from 'react';
import HomeDesc from '../../components/HomeDesc';
import { SiteName } from '../../configs/constants';

export default class Root extends React.Component {
  render() {
    return (
      <div>
        <h1>This is my home pages.</h1>
        <HomeDesc name={SiteName} />
      </div>

    );
  }
}
