/** Model definitions **/

export interface TodoModel {
  id: number;
  text: string;
  completed: boolean;
}

export namespace TodoModel {
  export enum Filter {
    SHOW_ALL = 'all',
    SHOW_ACTIVE = 'active',
    SHOW_COMPLETED = 'completed'
  }
}

export interface IncidentModel {
  address: string;
  description: string;
  id: number;
  location_description: string;
  location_type: string;
  media: MediaModel;
  occurred_at: Date;
  source: string;
  title: string
  type: string;
  type_properties: string;
  updated_at: Date;
  url: string;
}

export interface MediaModel {
  image_url: string;
  image_url_thumb: string
}

export interface AppState {
  incidents: IncidentModel[],
  isLoading: boolean
}

