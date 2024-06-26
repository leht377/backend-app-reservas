import { UsuarioModel } from '../../data/mongodb'
import {
  CustomErrors,
  OptionsRegistrarUsuario,
  RegistrarUsuarioDto,
  UsuarioDataSource,
  UsuarioEntity
} from '../../domain'
import { UsuarioMapper } from '../mappers'
import mongoose, { ClientSession } from 'mongoose'

export class MongoUsuarioDataSourceImpl implements UsuarioDataSource {
  async obtenerUsuarioPorCorreo(correo: string): Promise<UsuarioEntity | null> {
    try {
      const usuario = await UsuarioModel.findOne({ correo: correo })
      if (!usuario) return null
      return UsuarioMapper.UsuarioEntityFromObject(usuario.toObject())
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError)
        throw CustomErrors.badRequest(error.message)
      throw error
    }
  }
  async registrarUsuario(
    registrarUsuarioDto: RegistrarUsuarioDto,
    options?: OptionsRegistrarUsuario | undefined
  ): Promise<UsuarioEntity> {
    let session: ClientSession | undefined
    session = options?.session

    try {
      const usuario = new UsuarioModel({ ...registrarUsuarioDto })
      const usuarioCreado = await usuario.save({ session })
      return UsuarioMapper.UsuarioEntityFromObject(usuarioCreado.toObject())
    } catch (error: any) {
      if (error instanceof mongoose.Error.ValidationError)
        throw CustomErrors.badRequest(error.message)
      throw error
    }
  }
}
