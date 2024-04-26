import { RegistrarClienteDto } from '../dtos'

export abstract class AuthRepository {
  abstract registrarCliente(registrarClienteDto: RegistrarClienteDto): Promise<any>
}
