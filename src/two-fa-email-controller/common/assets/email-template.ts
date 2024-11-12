export const emailTemplate = (
  clientName: string,
  twoFANumber: string,
): string => `<!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Código de Acceso - Banco Caja Social</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
        rel="stylesheet"
      />
    </head>
  
    <body>
      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="background-color: #f2f2f2"
      >
        <tr>
          <td align="center" style="padding: 40px 20px">
            <table
              width="600"
              cellpadding="0"
              cellspacing="0"
              border="0"
              style="
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
              "
            >
              <tr>
                <td style="padding: 30px">
                  <h1
                    style="color: #0072c6; text-align: center; margin-top: 20px"
                  >
                    Código de Acceso
                  </h1>
                  <p style="color: #555; text-align: center; margin-top: 10px">
                    Estimado(a) ${clientName},
                  </p>
                  <p
                    style="
                      color: #333;
                      text-align: center;
                      font-size: 24px;
                      font-weight: bold;
                      margin-top: 20px;
                    "
                  >
                    Tu código de seguridad para ingresar a Caja Plus es:
                  </p>
                  <p
                    style="
                      color: #0072c6;
                      text-align: center;
                      font-size: 36px;
                      font-weight: bold;
                      margin-top: 10px;
                    "
                  >
                    ${twoFANumber}
                  </p>
                  <p style="color: #555; text-align: center; margin-top: 20px">
                    ¡Gracias por confiar en Banco Caja Social!
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
