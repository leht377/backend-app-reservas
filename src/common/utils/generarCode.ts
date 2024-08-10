const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const codeLength = 8
const usedCodes = new Set() // Para almacenar códigos ya generados

/**
 * Genera un código aleatorio de 8 caracteres en mayúsculas.
 * @returns {string} Código generado.
 */
export default function generateCode() {
  let code = ''
  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    code += characters[randomIndex]
  }
  return code
}
