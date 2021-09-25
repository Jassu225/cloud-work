import { ActionType, getType } from 'typesafe-actions';
import * as workloadActions from './actions';
import { Work } from './services';


export type WorkloadsAction = ActionType<typeof workloadActions>


interface WorkloadEntry<Id extends number> extends Work {
  id: Id;
}

export type WorkloadsState = {
  [Id in number]: WorkloadEntry<Id>;
};
  

const initialState: WorkloadsState = {};

export const workloadReducer = (state: WorkloadsState = initialState, action: WorkloadsAction): WorkloadsState => {
  switch (action.type) {
    case getType(workloadActions.created):
      return { 
        ...state,
        [action.payload.id]: {
          id: action.payload.id,
          complexity: action.payload.complexity,
          completeDate: action.payload.completeDate,
          status: action.payload.status,
        },
      };
      
      case getType(workloadActions.updateStatus):
        return {
          ...state,
          [action.payload.id]: {
            ...state[action.payload.id],
            status: action.payload.status,
          },
        }

      default:
        return state;
  }
}
