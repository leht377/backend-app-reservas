import {
  ClienteDetalladoEntity,
  ClienteEntity,
  ReservaEntity,
  RestauranteDetalladoEntity
} from '../../domain'
import { TypePlantillaEmail } from '../utils/enums/email.enum'

// <img src="https://via.placeholder.com/150x50?text=Logo" alt="Logo" style="max-width: 150px; height: auto; margin-bottom: 15px;">

const plantilla_reserva_pendiente_cliente = (
  clienteInfo: ClienteDetalladoEntity,
  restauranteInfo: RestauranteDetalladoEntity,
  reservaInfo: ReservaEntity
): string => {
  const date = new Date(reservaInfo?.getFechaReserva())
  const formattedDate = date.toISOString().split('T')[0]

  const formattedTime = reservaInfo?.getHoraReserva()
  return `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>Notificación de Reserva</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; border-collapse: collapse; background-color: #ffffff; border: 1px solid #dddddd; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <tr>
              <td style="padding: 20px; text-align: center; background-color: #e53935; color: #ffffff; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                  <!-- Espacio para el logo -->
                 
                  <h1 style="margin: 0; font-size: 26px; font-weight: bold;">Solicitud de Reserva</h1>
              </td>
          </tr>
          <tr>
              <td style="padding: 20px;">
                  <p style="font-size: 16px; color: #333333; margin: 0;">
                      Estimado usuario,
                  </p>
                  <p style="font-size: 16px; color: #333333; margin: 10px 0;">
                      Su reserva al restaurante <strong style="color: #e53935;">${restauranteInfo?.getNombre()}</strong> ha sido confirmada exitosamente.
                  </p>
                  
                  <!-- Sección de datos básicos de la reserva -->
                  <table width="100%" cellpadding="10" cellspacing="0" style="margin: 20px 0; border: 1px solid #dddddd; border-radius: 4px; background-color: #f9f9f9;">
                      <tr>
                          <td style="font-size: 16px; color: #333333; border-bottom: 1px solid #dddddd; font-weight: bold;">Nombre del Reservante:</td>
                          <td style="font-size: 16px; color: #333333;">${reservaInfo?.getNombreReservante()}</td>
                      </tr>
                      <tr>
                          <td style="font-size: 16px; color: #333333; border-bottom: 1px solid #dddddd; font-weight: bold;">Fecha de Reserva:</td>
                          <td style="font-size: 16px; color: #333333;">${formattedDate}</td>
                      </tr>
                      <tr>
                          <td style="font-size: 16px; color: #333333; border-bottom: 1px solid #dddddd; font-weight: bold;">Hora:</td>
                          <td style="font-size: 16px; color: #333333;">${formattedTime}</td>
                      </tr>
                      <tr>
                          <td style="font-size: 16px; color: #333333; border-bottom: 1px solid #dddddd; font-weight: bold;">Dirección:</td>
                          <td style="font-size: 16px; color: #333333;">${restauranteInfo?.getLocacion()}</td>
                      </tr>
                      <tr>
                          <td style="font-size: 16px; color: #333333; border-bottom: 1px solid #dddddd; font-weight: bold;">Número de Personas:</td>
                          <td style="font-size: 16px; color: #333333;">${reservaInfo?.getCantidadPersonas()}</td>
                      </tr>
                      <tr>
                          <td style="font-size: 16px; color: #333333; border-bottom: 1px solid #dddddd; font-weight: bold;">Estado de la Reserva:</td>
                          <td style="font-size: 16px; color: #333333;"><strong style="color: #4CAF50;">${reservaInfo?.getEstado()}</strong></td>
                      </tr>
                      <tr>
                          <td style="font-size: 16px; color: #333333; border-bottom: 1px solid #dddddd; font-weight: bold;">Codígo Reserva:</td>
                          <td style="font-size: 16px; color: #333333;"><strong style="color: #e53935;">${reservaInfo?.getCodIngreso()}</strong></td>
                      </tr>
                  </table>
                  
                  <p style="font-size: 16px; color: #333333; margin: 10px 0;">
                      Gracias por elegirnos. Si necesita más información, no dude en ponerse en contacto con nosotros.
                  </p>
                  <p style="font-size: 16px; color: #333333; margin: 10px 0;">
                      Atentamente,<br>
                      El equipo de Reservas Buenaventura ❤️
                  </p>
              </td>
          </tr>
          <tr>
              <td style="padding: 20px; text-align: center; background-color: #f4f4f4; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                  <p style="font-size: 14px; color: #999999; margin: 0;">
                      Este es un correo automático, por favor no responda a este mensaje.
                  </p>
              </td>
          </tr>
      </table>
  </body>
  </html>
`
}

const plantilla_reserva_pendiente_restaurante = (
  clienteInfo: ClienteDetalladoEntity,
  restauranteInfo: RestauranteDetalladoEntity,
  reservaInfo: ReservaEntity
): string => {
  const date = new Date(reservaInfo?.getFechaReserva())
  const formattedDate = date.toISOString().split('T')[0]
  const formattedTime = reservaInfo?.getHoraReserva()
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Notificación de Reserva</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; border-collapse: collapse; background-color: #ffffff; border: 1px solid #dddddd; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <tr>
                <td style="padding: 20px; text-align: center; background-color: #e53935; color: #ffffff; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                    <!-- Espacio para el logo -->
                   
                    <h1 style="margin: 0; font-size: 26px; font-weight: bold;">Solicitud de Reserva</h1>
                </td>
            </tr>
            <tr>
                <td style="padding: 20px;">
                    <p style="font-size: 16px; color: #333333; margin: 0;">
                        Estimado usuario,
                    </p>
                    <p style="font-size: 16px; color: #333333; margin: 10px 0;">
                        Restaurante <strong style="color: #e53935;">${restauranteInfo?.getNombre()}</strong> ha recibido una nueva solicitud de reserva.
                    </p>
                    
                    <!-- Sección de datos básicos de la reserva -->
                    <table width="100%" cellpadding="10" cellspacing="0" style="margin: 20px 0; border: 1px solid #dddddd; border-radius: 4px; background-color: #f9f9f9;">
                        <tr>
                            <td style="font-size: 16px; color: #333333; border-bottom: 1px solid #dddddd; font-weight: bold;">Nombre del Reservante:</td>
                            <td style="font-size: 16px; color: #333333;">${reservaInfo?.getNombreReservante()}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 16px; color: #333333; border-bottom: 1px solid #dddddd; font-weight: bold;">Fecha de Reserva:</td>
                            <td style="font-size: 16px; color: #333333;">${formattedDate}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 16px; color: #333333; border-bottom: 1px solid #dddddd; font-weight: bold;">Hora:</td>
                            <td style="font-size: 16px; color: #333333;">${formattedTime}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 16px; color: #333333; border-bottom: 1px solid #dddddd; font-weight: bold;">Dirección:</td>
                            <td style="font-size: 16px; color: #333333;">${restauranteInfo?.getLocacion()}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 16px; color: #333333; border-bottom: 1px solid #dddddd; font-weight: bold;">Número de Personas:</td>
                            <td style="font-size: 16px; color: #333333;">${reservaInfo?.getCantidadPersonas()}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 16px; color: #333333; border-bottom: 1px solid #dddddd; font-weight: bold;">Estado de la Reserva:</td>
                            <td style="font-size: 16px; color: #333333;"><strong style="color: #4CAF50;">${reservaInfo?.getEstado()}</strong></td>
                        </tr>
                        <tr>
                            <td style="font-size: 16px; color: #333333; border-bottom: 1px solid #dddddd; font-weight: bold;">Codígo Reserva:</td>
                            <td style="font-size: 16px; color: #333333;"><strong style="color: #e53935;">${reservaInfo?.getCodIngreso()}</strong></td>
                        </tr>
                    </table>
                    
                    <p style="font-size: 16px; color: #333333; margin: 10px 0;">
                        No hagas esperar a tu cliente, te invitamos a responder la solicitud de reserva, puedes hacerlo mediante la aplicación
                    </p>
                    <p style="font-size: 16px; color: #333333; margin: 10px 0;">
                        Atentamente,<br>
                        El equipo de Reservas Buenaventura ❤️
                    </p>
                </td>
            </tr>
            <tr>
                <td style="padding: 20px; text-align: center; background-color: #f4f4f4; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                    <p style="font-size: 14px; color: #999999; margin: 0;">
                        Este es un correo automático, por favor no responda a este mensaje.
                    </p>
                </td>
            </tr>
        </table>
    </body>
    </html>
  `
}

const plantilla_reserva_aceptada_cliente = (
  clienteInfo: ClienteDetalladoEntity,
  restauranteInfo: RestauranteDetalladoEntity,
  reservaInfo: ReservaEntity
): string => {
  const date = new Date(reservaInfo?.getFechaReserva())
  const formattedDate = date.toISOString().split('T')[0]

  const formattedTime = reservaInfo?.getHoraReserva()
  return `
         <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Notificación de Reserva</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; border-collapse: collapse; background-color: #ffffff; border: 1px solid #dddddd; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <tr>
                <td style="padding: 20px; text-align: center; background-color: #e53935; color: #ffffff; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                    <!-- Espacio para el logo -->
                    <h1 style="margin: 0; font-size: 26px; font-weight: bold;">🎉 Confirmación de Reserva!</h1>
                </td>
            </tr>
            <tr>
                <td style="padding: 20px;">
                    <p style="font-size: 16px; color: #333333; margin: 10px 0;">
                        Increible <strong>${clienteInfo?.getNombre()}</strong>, tú reserva ha sido <strong>ACEPTADA</strong>, por favor presenta el <strong>Codígo de reserva</strong> al momento de llegar al restaurante
                    </p>
                    
                    <!-- Sección de datos básicos de la reserva -->
                    <table width="100%" cellpadding="10" cellspacing="0" style="margin: 20px 0; border: 1px solid #dddddd; border-radius: 4px; background-color: #f9f9f9;">
                        <tr>
                            <td style="font-size: 16px; color: #333333; border-bottom: 1px solid #dddddd; font-weight: bold;">Nombre del Reservante:</td>
                            <td style="font-size: 16px; color: #333333;">${reservaInfo?.getNombreReservante()}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 16px; color: #333333; border-bottom: 1px solid #dddddd; font-weight: bold;">Fecha de Reserva:</td>
                            <td style="font-size: 16px; color: #333333;">${formattedDate}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 16px; color: #333333; border-bottom: 1px solid #dddddd; font-weight: bold;">Hora:</td>
                            <td style="font-size: 16px; color: #333333;">${formattedTime}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 16px; color: #333333; border-bottom: 1px solid #dddddd; font-weight: bold;">Dirección:</td>
                            <td style="font-size: 16px; color: #333333;">${restauranteInfo?.getLocacion()}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 16px; color: #333333; border-bottom: 1px solid #dddddd; font-weight: bold;">Número de Personas:</td>
                            <td style="font-size: 16px; color: #333333;">${reservaInfo?.getCantidadPersonas()}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 16px; color: #333333; border-bottom: 1px solid #dddddd; font-weight: bold;">Estado de la Reserva:</td>
                            <td style="font-size: 16px; color: #333333;"><strong style="color: #4CAF50;">${reservaInfo?.getEstado()}</strong></td>
                        </tr>
                        <tr>
                            <td style="font-size: 16px; color: #333333; border-bottom: 1px solid #dddddd; font-weight: bold;">Codígo Reserva:</td>
                            <td style="font-size: 16px; color: #333333;"><strong style="color: #e53935;">${reservaInfo?.getCodIngreso()}</strong></td>
                        </tr>
                    </table>
                    
 
                    <p style="font-size: 16px; color: #333333; margin: 10px 0;">
                        Atentamente,<br>
                        El equipo de Reservas Buenaventura ❤️
                    </p>
                </td>
            </tr>
            <tr>
                <td style="padding: 20px; text-align: center; background-color: #f4f4f4; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                    <p style="font-size: 14px; color: #999999; margin: 0;">
                        Este es un correo automático, por favor no responda a este mensaje.
                    </p>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `
}

const plantilla_reserva_rechazada_cliente = (
  clienteInfo: ClienteDetalladoEntity,
  restauranteInfo: RestauranteDetalladoEntity,
  reservaInfo: ReservaEntity
): string => {
  const date = new Date(reservaInfo?.getFechaReserva())
  const formattedDate = date.toISOString().split('T')[0]
  const formattedTime = reservaInfo?.getHoraReserva()
  return `
 <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Notificación de Reserva</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; border-collapse: collapse; background-color: #ffffff; border: 1px solid #dddddd; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <tr>
            <td style="padding: 20px; text-align: center; background-color: #e53935; color: #ffffff; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                <!-- Espacio para el logo -->
             
                <h1 style="margin: 0; font-size: 26px; font-weight: bold;">Lo sentimos, tu reserva no pudo ser aceptada</h1>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px;">
                <p style="font-size: 16px; color: #333333; margin: 0;">
                    Estimado usuario,
                </p>
                <p style="font-size: 16px; color: #333333; margin: 10px 0;">
                    Lamentamos informarte que, por razones imprevistas, no hemos podido aceptar tu reserva en <strong style="color: #e53935;">${restauranteInfo?.getNombre()}</strong>. Te pedimos disculpas por cualquier inconveniente que esto pueda causar.
                </p>
                
                <!-- Sección de datos básicos de la reserva -->
                <table width="100%" cellpadding="10" cellspacing="0" style="margin: 20px 0; border: 1px solid #dddddd; border-radius: 4px; background-color: #f9f9f9;">
                    <tr>
                        <td style="font-size: 16px; color: #333333; border-bottom: 1px solid #dddddd; font-weight: bold;">Nombre del Reservante:</td>
                        <td style="font-size: 16px; color: #333333;">${reservaInfo?.getNombreReservante()}</td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px; color: #333333; border-bottom: 1px solid #dddddd; font-weight: bold;">Fecha de Reserva:</td>
                        <td style="font-size: 16px; color: #333333;">${formattedDate}</td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px; color: #333333; border-bottom: 1px solid #dddddd; font-weight: bold;">Hora:</td>
                        <td style="font-size: 16px; color: #333333;">${formattedTime}</td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px; color: #333333; border-bottom: 1px solid #dddddd; font-weight: bold;">Dirección:</td>
                        <td style="font-size: 16px; color: #333333;">${restauranteInfo?.getLocacion()}</td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px; color: #333333; border-bottom: 1px solid #dddddd; font-weight: bold;">Número de Personas:</td>
                        <td style="font-size: 16px; color: #333333;">${reservaInfo?.getCantidadPersonas()}</td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px; color: #333333; border-bottom: 1px solid #dddddd; font-weight: bold;">Estado de la Reserva:</td>
                        <td style="font-size: 16px; color: #333333;"><strong style="color: #e53935;">${reservaInfo?.getEstado()}</strong></td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px; color: #333333; border-bottom: 1px solid #dddddd; font-weight: bold;">Código Reserva:</td>
                        <td style="font-size: 16px; color: #333333;"><strong style="color: #e53935;">${reservaInfo?.getCodIngreso()}</strong></td>
                    </tr>
                </table>
                
                <p style="font-size: 16px; color: #333333; margin: 10px 0;">
                    Apreciamos tu comprensión y te invitamos a intentar realizar una nueva reserva. Si tienes alguna pregunta o necesitas asistencia adicional, no dudes en contactarnos.
                </p>
                <p style="font-size: 16px; color: #333333; margin: 10px 0;">
                    Atentamente,<br>
                    El equipo de Reservas Buenaventura ❤️
                </p>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px; text-align: center; background-color: #f4f4f4; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                <p style="font-size: 14px; color: #999999; margin: 0;">
                    Este es un correo automático, por favor no responda a este mensaje.
                </p>
            </td>
        </tr>
    </table>
</body>
</html>

      `
}
const plantilla_reserva_cancelada_cliente = (
  clienteInfo: ClienteDetalladoEntity,
  restauranteInfo: RestauranteDetalladoEntity,
  reservaInfo: ReservaEntity
): string => {
  const date = new Date(reservaInfo?.getFechaReserva())
  const formattedDate = date.toISOString().split('T')[0]

  const formattedTime = reservaInfo?.getHoraReserva()
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Notificación de Cancelación de Reserva</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; border-collapse: collapse; background-color: #ffffff; border: 1px solid #dddddd; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <tr>
            <td style="padding: 20px; text-align: center; background-color: #e53935; color: #ffffff; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                <!-- Espacio para el logo -->
              
                <h1 style="margin: 0; font-size: 26px; font-weight: bold;">Reserva Cancelada</h1>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px;">
                <p style="font-size: 16px; color: #333333; margin: 0;">
                    Estimado usuario,
                </p>
                <p style="font-size: 16px; color: #333333; margin: 10px 0;">
                    Lamentamos informarte que hemos recibido tu solicitud de cancelación para la reserva en <strong style="color: #e53935;">${restauranteInfo?.getNombre()}</strong>. La reserva ha sido cancelada con éxito.
                </p>
                
                <!-- Sección de datos básicos de la reserva -->
                <table width="100%" cellpadding="10" cellspacing="0" style="margin: 20px 0; border: 1px solid #dddddd; border-radius: 4px; background-color: #f9f9f9;">
                    <tr>
                        <td style="font-size: 16px; color: #333333; border-bottom: 1px solid #dddddd; font-weight: bold;">Nombre del Reservante:</td>
                        <td style="font-size: 16px; color: #333333;">${reservaInfo?.getNombreReservante()}</td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px; color: #333333; border-bottom: 1px solid #dddddd; font-weight: bold;">Fecha de Reserva:</td>
                        <td style="font-size: 16px; color: #333333;">${formattedDate}</td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px; color: #333333; border-bottom: 1px solid #dddddd; font-weight: bold;">Hora:</td>
                        <td style="font-size: 16px; color: #333333;">${formattedTime}</td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px; color: #333333; border-bottom: 1px solid #dddddd; font-weight: bold;">Dirección:</td>
                        <td style="font-size: 16px; color: #333333;">${restauranteInfo?.getLocacion()}</td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px; color: #333333; border-bottom: 1px solid #dddddd; font-weight: bold;">Número de Personas:</td>
                        <td style="font-size: 16px; color: #333333;">${reservaInfo?.getCantidadPersonas()}</td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px; color: #333333; border-bottom: 1px solid #dddddd; font-weight: bold;">Estado de la Reserva:</td>
                        <td style="font-size: 16px; color: #333333;"><strong style="color: #e53935;">${reservaInfo?.getEstado()}</strong></td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px; color: #333333; border-bottom: 1px solid #dddddd; font-weight: bold;">Código Reserva:</td>
                        <td style="font-size: 16px; color: #333333;"><strong style="color: #e53935;">${reservaInfo?.getCodIngreso()}</strong></td>
                    </tr>
                </table>
                
                <p style="font-size: 16px; color: #333333; margin: 10px 0;">
                    Si en el futuro decides realizar otra reserva, estaremos encantados de atenderte. Si tienes alguna pregunta o necesitas más ayuda, no dudes en ponerte en contacto con nosotros.
                </p>
                <p style="font-size: 16px; color: #333333; margin: 10px 0;">
                    Atentamente,<br>
                    El equipo de Reservas Buenaventura ❤️
                </p>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px; text-align: center; background-color: #f4f4f4; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                <p style="font-size: 14px; color: #999999; margin: 0;">
                    Este es un correo automático, por favor no responda a este mensaje.
                </p>
            </td>
        </tr>
    </table>
</body>
</html>

      `
}

export const plantillasEmail = (
  tipoPlantilla: TypePlantillaEmail,
  clienteInfo: ClienteDetalladoEntity,
  restauranteInfo: RestauranteDetalladoEntity,
  reservaInfo: ReservaEntity
): string => {
  let plantilla = ''

  switch (tipoPlantilla) {
    case TypePlantillaEmail.CONFIRMAR_RESERVA_CLIENTE:
      plantilla = plantilla_reserva_aceptada_cliente(clienteInfo, restauranteInfo, reservaInfo)
      break
    case TypePlantillaEmail.RESERVA_RECHAZADA_CLIENTE:
      plantilla = plantilla_reserva_rechazada_cliente(clienteInfo, restauranteInfo, reservaInfo)
      break
    case TypePlantillaEmail.RESERVA_PENDIENTE_RESTAURANTE:
      plantilla = plantilla_reserva_pendiente_restaurante(clienteInfo, restauranteInfo, reservaInfo)
      break
    case TypePlantillaEmail.RESERVA_PENDIENTE_CLIENTE:
      plantilla = plantilla_reserva_pendiente_cliente(clienteInfo, restauranteInfo, reservaInfo)
      break
    case TypePlantillaEmail.CANCELADA_RESERVA_CLIENTE:
      plantilla = plantilla_reserva_cancelada_cliente(clienteInfo, restauranteInfo, reservaInfo)
      break

    default:
      break
  }
  return plantilla
}
