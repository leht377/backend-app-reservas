import { NextFunction, Request, Response } from 'express'
import { HashtagRepository, RegistrarHashtagDto } from '../../domain'

export class HashtagController {
  constructor(private readonly hashtagRepository: HashtagRepository) {}

  registrarHashtag = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const registrarHashtagDto = RegistrarHashtagDto.crear(req.body)
      const hashtag = await this.hashtagRepository.registrarHashtag(registrarHashtagDto)
      res.json(hashtag)
    } catch (error) {
      next(error)
    }
  }

  ObtenerHashtags = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hashtags = await this.hashtagRepository.obtenerHashtag()
      res.json(hashtags)
    } catch (error) {
      next(error)
    }
  }
}
