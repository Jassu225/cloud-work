import * as React from 'react';
import TimeAgo from 'react-timeago';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { cancel, checkStatus } from '../../state/workloads/actions';
import Button from '../base/Button/Button';
import './WorkloadItem.css';

export interface WorkloadItemProps {
    id: number;
}

const timeUnitShortMap = {
  second: 'sec',
  minute: 'min',
  hour: 'hr',
  day: 'day',
  week: 'week',
  month: 'month',
  year: 'year'
};

const timeFormatter = (value: number, unit: TimeAgo.Unit) => {
  const remappedUnit =  timeUnitShortMap[unit];
  return `${value} ${
    value === 1 ? remappedUnit : `${remappedUnit}s`
  }`;
}


const WorkloadItem: React.FC<WorkloadItemProps> = (props) => {
  const dispatch = useAppDispatch();
  const workload = useAppSelector((state) => state.workloads[props.id]);

  const isWorking = workload.status === 'WORKING';

  React.useEffect(() => {
    const now = Date.now();
    const timeout = workload.completeDate.getTime() - now + 10;
    if (isWorking && timeout > 0) {
      const timeoutID = setTimeout(() => {
        dispatch(checkStatus({ id: workload.id }));
      }, timeout);
      return () => {
        clearTimeout(timeoutID);
      };
    }
  }, [dispatch, workload.completeDate, workload.id, isWorking]);

  return (
  <div className="WorkloadItem">
    <div>
      <h4 className="WorkloadItem-heading">Workload #{workload.id}</h4>
      <div className="WorkloadItem-infoText">
        <span className="WorkloadItem-complexity">
          <span className="WorkloadItem-infoText-header">Complexity: </span>
          {workload.complexity}
        </span>
        {isWorking && (
          <span className="WorkloadItem-time-remaining">
            <span className="WorkloadItem-infoText-header"> • Time left: </span>
            <TimeAgo date={workload.completeDate} formatter={timeFormatter} />
          </span>
        )}
      </div>
    </div>
    <div className="WorkloadItem-status-or-time">
      {isWorking
        ? (
            <Button 
              className="WorkloadItem-cancelButton" 
              onClick={() => dispatch(cancel({ id: workload.id }))}
            >
              Cancel
            </Button>
        )
        : (
          <span className={`WorkloadItem-statusText ${workload.status.toLowerCase()}`}>{workload.status}</span>
        )
      }
    </div>
  </div>
)};


export { 
  WorkloadItem,
};

export default WorkloadItem;