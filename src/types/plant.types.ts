export interface PlantCreateInput {
  name: string;
}

export interface PlantUpdateInput extends Partial<PlantCreateInput> {}
