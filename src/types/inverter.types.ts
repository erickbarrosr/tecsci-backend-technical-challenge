export interface InverterCreateInput {
  name: string;
  plantId: number;
}

export interface InverterUpdateInput extends Partial<InverterCreateInput> {}
