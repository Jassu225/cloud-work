import React from 'react';
import { shallowEqual } from 'react-redux';
import { useAppSelector } from '../../state/hooks';
import WorkloadItem from '../WorkloadItem/WorkloadItem';
import './WorkloadList.css';

const WorkloadList: React.FC = () => {
  const workloadsIDs = useAppSelector((state) => Object.keys(state.workloads).map((key) => Number(key)), shallowEqual);
  return (
    <div className="workloads-list-container">
      {!workloadsIDs.length 
        ? (
          <div className="no-workloads">No workloads to display</div>
        )
      : 
      workloadsIDs.map((workloadsID) => (
          <WorkloadItem key={workloadsID} id={workloadsID} />
        ))
      }
    </div>
  );
};

export default WorkloadList;
