import { NextFunction, Request, Response } from 'express'
import { CategoriaRepository, CrearCategoriaDto } from '../../domain'
import { CrearCategoria } from '../../domain/use-case/categoria/crear-categoria.usecase'
import { ObtenerCategorias } from '../../domain/use-case/categoria/obtener-categorias.usecase'

export class CategoriaController {
  constructor(private readonly categoriaRepository: CategoriaRepository) {}

  crear = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const crearCategoriaDto = CrearCategoriaDto.crear(req.body)
      const categoria = await new CrearCategoria(this.categoriaRepository).execute(
        crearCategoriaDto
      )

      res.json(categoria)
    } catch (error) {
      next(error)
    }
  }

  obtener = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categorias = await new ObtenerCategorias(this.categoriaRepository).execute()
      res.json(categorias)
    } catch (error) {
      next(error)
    }
  }
}
