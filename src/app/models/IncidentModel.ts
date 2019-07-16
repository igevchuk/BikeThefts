/** Model definitions **/

export interface IncidentModel {
  address: string;
  description: string;
  id: number;
  location_description: string;
  location_type: string;
  media: IncidentModel.media;
  occurred_at: number;
  source: IncidentModel.source;
  title: string;
  type: string;
  type_properties: string;
  updated_at: number;
  url: string;
};

export namespace IncidentModel {
  export type media = {
    image_url: string;
    image_url_thumb: string;
  }
  export type source = {
    api_url: string;
    html_url: string;
    name: string;
  }
}



