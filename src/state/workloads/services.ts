import { Status } from './types';

export interface Work {
  id: number;
  complexity: number;
  completeDate: Date;
  status: Status;
}

interface WorkWithTimer extends Work {
  timer: NodeJS.Timeout;
}
export class WorkloadService {

  private workLoads: { [key in number]: WorkWithTimer } = {};
  private counter = 0;


  private getWorkload(id: number): WorkWithTimer | undefined {
    return this.workLoads[id];
  }

  private completeWorkload(work: Work) {
    work.status = work.id % 2
      ? 'FAILURE'
      : 'SUCCESS';
  }


  public create({ complexity }: { complexity: number }) {
    const id = this.counter++;
    const status: Status = 'WORKING';

    const milliseconds = complexity * 1000;
    const completeDate = new Date(new Date().getTime() + milliseconds);
    const timer = setTimeout(() => this.completeWorkload(work), milliseconds);

    const work: WorkWithTimer = {
      id,
      complexity,
      status,
      completeDate,
      timer,
    }
    this.workLoads[id] = work;

    return Promise.resolve({ id, status, complexity, completeDate });
  }

  public checkStatus({ id }: { id: number }) {
    const work = this.getWorkload(id);
    if (!work) return Promise.reject('Workload not found');
    return Promise.resolve(work);
  }

  public cancel({ id }: { id: number }) {
    const work = this.getWorkload(id);
    if (!work) return Promise.reject('Workload not found');
    if (work.status !== 'WORKING') return Promise.reject('Workload cannot be canceled');

    clearTimeout(work.timer);
    work.status = 'CANCELED';

    return Promise.resolve(work);
  }
}

export const workloadService = new WorkloadService();
