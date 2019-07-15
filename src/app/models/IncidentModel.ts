/** Model definitions **/

export interface IncidentModel {
  address: string;
  description: string;
  id: number;
  frame_colors: string[],
  location_description: string;
  location_type: string;
  media: {
    image_url: string;
    image_url_thumb: string;
  };
  occurred_at: Date;
  serial: string,
  source: string;
  title: string
  type: string;
  type_properties: string;
  updated_at: Date;
  url: string;
};



