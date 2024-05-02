import { NextFunction, Request, Response } from 'express'
import { HashtagRepository, RegistrarHashtagDto } from '../../domain'
import { ObtenerHashtags, RegistrarHashtag } from '../../domain/use-case/hashtag'

export class HashtagController {
  constructor(private readonly hashtagRepository: HashtagRepository) {}

  registrarHashtag = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const registrarHashtagDto = RegistrarHashtagDto.crear(req.body)

      const hashtag = await new RegistrarHashtag(this.hashtagRepository).execute(
        registrarHashtagDto
      )
      res.json(hashtag)
    } catch (error) {
      next(error)
    }
  }

  ObtenerHashtags = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hashtags = await new ObtenerHashtags(this.hashtagRepository).execute()
      res.json(hashtags)
    } catch (error) {
      next(error)
    }
  }
}
