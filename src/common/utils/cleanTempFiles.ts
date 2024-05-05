import path from 'path'
import fs from 'fs'

export const limpiarFiles = (files: any) => {
  const elementosAeliminar = Object.keys(files).map(
    (key) => files[key]?.tempFilePath?.match(/tmp[^\/]+$/)[0]
  )

  const rutaCarpeta = path.resolve(process.cwd(), 'temp')

  elementosAeliminar.forEach((elemento) => {
    const rutaElemento = path.join(rutaCarpeta, elemento)
    if (fs.existsSync(rutaElemento)) {
      const esCarpeta = fs.statSync(rutaElemento).isDirectory()

      if (esCarpeta) {
        // Si es una carpeta, llamar recursivamente a la función
        // eliminarContenidoCarpeta(rutaElemento)
      } else {
        // Si es un archivo, eliminarlo
        fs.unlinkSync(rutaElemento)
      }
    } else {
      //console.log(`El archivo ${rutaElemento} no existe.`)
    }
  })
  // Obtener la lista de elementos en la carpeta
}
