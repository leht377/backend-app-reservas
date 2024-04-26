import {
  AuthRepository,
  RegistrarClienteDto,
  UsuarioDataSource,
  clienteDataSource
} from '../../domain'

export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    private readonly clienteDataSource: clienteDataSource,
    private readonly usuarioDataSource: UsuarioDataSource
  ) {}

  registrarCliente(registrarClienteDto: RegistrarClienteDto): Promise<any> {
    throw new Error('Method not implemented.')
  }
}
