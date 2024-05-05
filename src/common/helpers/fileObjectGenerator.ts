import { FileArray, UploadedFile } from 'express-fileupload'
import { filesObject } from '../../domain'

export const fileObjectGenerator = (reqFiles: FileArray): filesObject[] => {
  const data: filesObject[] = []
  if (reqFiles) {
    const files: FileArray = reqFiles
    const filekeys = Object.keys(files)
    filekeys.forEach((key) => {
      const file = files[key]
      if (Array.isArray(file)) {
        file.forEach((f) => {
          const { name, tempFilePath } = f
          data.push({
            nombre: name,
            tempFilePath: tempFilePath
          })
        })
      } else {
        const { name, tempFilePath } = file
        data.push({
          nombre: name,
          tempFilePath: tempFilePath
        })
      }
    })
  }
  return data
}
