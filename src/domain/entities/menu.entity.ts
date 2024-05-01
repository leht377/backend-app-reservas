import { PlatoEntity } from './plato.entity'

export class MenuEntity {
  constructor(
    private readonly id: string,
    private readonly restaurante_id: string,
    private platos: PlatoEntity[] | []
  ) {}

  getId(): string {
    return this.id
  }

  getRestauranteId(): string {
    return this.restaurante_id
  }

  getPlatos(): PlatoEntity[] {
    return this.platos
  }
}
