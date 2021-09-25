import React, { useState } from 'react';
import { useAppDispatch } from '../../state/hooks';
import { submit } from '../../state/workloads/actions';
import Button from '../base/Button/Button';
import './WorkloadForm.css';

const defaultState = {
  complexity: 5,
};

const WorkloadForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState(defaultState);

  const handleSubmit = (e: React.MouseEvent) => {
    dispatch(submit({ complexity: state.complexity }));
    setState(defaultState);
    e.preventDefault();
  };

  return (
    <form className="WorkloadForm-container">
      <h3 className="WorkloadForm-header">Create workload</h3>
      <div>
        <label>
          <div className="WorkloadForm-label">
            <span className="WorkloadItem-label-header">Complexity: </span>
            {state.complexity}
          </div>
          <input
            className="WorkloadForm-complexity-selector"
            value={state.complexity}
            onChange={(e) => setState({ complexity: Number(e.target.value) })}
            type="range"
            min="1"
            max="10"
          />
        </label>
      </div>
      <Button onClick={handleSubmit} type="submit">
        Start work
      </Button>
    </form>
  );
};

export default WorkloadForm;
