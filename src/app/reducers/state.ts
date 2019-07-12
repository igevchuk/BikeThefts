import { IncidentModel, TodoModel } from 'app/models';

export interface RootState {
  incidents: RootState.IncidentState;
  todos: RootState.TodoState;
  isLoading: boolean;
  error: any;
  router?: any;
}

export namespace RootState {
  export type IncidentState = IncidentModel[];
  export type TodoState = TodoModel[];
}
