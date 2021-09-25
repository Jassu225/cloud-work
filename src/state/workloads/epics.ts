/* @ts-nocheck */
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { filter, map, tap, ignoreElements, mergeMap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';

import { RootAction, RootState } from '../reducer';
import * as workloadsActions from './actions';
import * as actionTypes from './constants';
import { workloadService } from './services';

type AppEpic = Epic<RootAction, RootAction, RootState>;

const logWorkloadSubmissions: AppEpic = (action$) => (
  action$.pipe(
    filter(isActionOf(workloadsActions.submit)),
    map(action => action.payload),
    tap((payload) => console.log('Workload submitted', payload)),
    ignoreElements(),
  )
);

export const createWorkLoad: AppEpic = (action$) => 
  action$.pipe(
    ofType(actionTypes.SUBMIT), 
    mergeMap(action => new Observable(async (subscriber) => {
      const response = await workloadService.create(action.payload);
      subscriber.next(response);
      subscriber.complete();
    }).pipe(
      map(response => workloadsActions.created(response))
    ))
  );

export const checkWorkloadStatus: AppEpic = (action$) => 
  action$.pipe(
    ofType(actionTypes.CHECK_STATUS),
    mergeMap(action => new Observable(async (subscriber) => {
      const response = await workloadService.checkStatus(action.payload);
      subscriber.next(response);
      subscriber.complete();
    }).pipe(
      map(response => workloadsActions.updateStatus({ id: response.id, status: response.status }))
    ))
  );

export const cancelWorkload: AppEpic = (action$) => 
  action$.pipe(
    ofType(actionTypes.CANCEL),
    mergeMap(action => new Observable(async (subscriber) => {
      const response = await workloadService.cancel(action.payload);
      subscriber.next(response);
      subscriber.complete();
    }).pipe(
      map(response => workloadsActions.updateStatus({ id: response.id, status: response.status }))
    ))
  );


export const epics = combineEpics(
  logWorkloadSubmissions,
  createWorkLoad,
  checkWorkloadStatus,
  cancelWorkload
);

export default epics;
