import { ClientSession } from 'mongoose'
import { UsuarioModel } from '../../data/mongodb'
import { CustomErrors, UsuarioDataSource, UsuarioEntity } from '../../domain'
import { CrearUsuarioDto } from '../../domain/dtos/usuario/crear_usuario.dto'
import { UsuarioMapper } from '../mappers/usuario.mapper'

export class MongoUsuarioDatasourceImpl implements UsuarioDataSource {
  async crearUsuario(
    crearUsuarioDto: CrearUsuarioDto,
    session?: ClientSession
  ): Promise<UsuarioEntity> {
    UsuarioModel
    try {
      const { correo, contrasena, rol } = crearUsuarioDto
      const existeUsuario = await UsuarioModel.findOne({ correo: correo })

      if (existeUsuario) throw CustomErrors.badRequest('El correo ya se encuentra registrado')

      const usuarioAcrear = new UsuarioModel({ contrasena, correo, rol })
      const usuario = await usuarioAcrear.save({ session })

      return UsuarioMapper.userEntityFromObject(usuario.toObject())
    } catch (error) {
      throw error
    }
  }
  obetenerUsuarioPorId(id: string): Promise<UsuarioEntity> {
    throw new Error('Method not implemented.')
  }
}
