import { PlatoEntity } from './plato.entity'

export class MenuEntity {
  constructor(
    private readonly id: string,
    private readonly restaurante_id: string,
    private platos: PlatoEntity[]
  ) {}

  get getId(): string {
    return this.id
  }

  get getRestauranteId(): string {
    return this.restaurante_id
  }

  get getPlatos(): PlatoEntity[] {
    return this.platos
  }
}
