import React, { PureComponent } from 'react';

import WorkloadList from '../WorkloadList/WorkloadList';
import WorkloadForm from '../WorkloadForm/WorkloadForm';
import './App.css';

class App extends PureComponent {
  render() {
    return (
      <div className="container">
        <h2 className="app-header">CloudWork</h2>
        <h3 className="workloads-list-header">Workloads</h3>
        <WorkloadList />
        <WorkloadForm />
      </div>
    );
  }
}

export default App;
