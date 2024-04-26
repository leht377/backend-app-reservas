import { RegistrarClienteDto } from '../dtos'

export abstract class AuthDataSource {
  abstract registrarCliente(registrarClienteDto: RegistrarClienteDto): Promise<any>
  // abstract login()
  // abstract registrarRestaurante (registrarRestauranteDto:RegistrarRestauranteDto): Promise<any>
}
