import React from 'react';

import DockMonitor from 'redux-devtools-dock-monitor';
import Inspector from 'redux-devtools-inspector';

import {createDevTools} from 'redux-devtools';


export default createDevTools(
  <DockMonitor
    defaultIsVisible
    toggleVisibilityKey='ctrl-h'
    changePositionKey='ctrl-q'
    changeMonitorKey='ctrl-m'
  >
    <Inspector />
  </DockMonitor>
);
