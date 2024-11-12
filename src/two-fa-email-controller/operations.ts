import { Logger } from '@nestjs/common';
import { emailTemplate } from '@two-fa-email-controller/common/assets/email-template';
import {
  EMAIL_SUBJECT,
  MAILJET_API_KEY,
  MAILJET_API_SECRET,
  SENDER_MAILJET_EMAIL,
} from '@two-fa-email-controller/common/constants/config-worker';
import { PortalProfile } from '@two-fa-email-controller/interfaces/portal-profile.interface';

const Mailjet = require('node-mailjet');

export async function sendTwoFactorAuthenticationEmail(
  portalProfileData: PortalProfile,
  logger: Logger,
): Promise<void> {
  try {
    logger.log('Start email process to clientId: ' + portalProfileData._id);

    const mailJetInstance = Mailjet.apiConnect(
      MAILJET_API_KEY,
      MAILJET_API_SECRET,
    );

    await mailJetInstance.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: SENDER_MAILJET_EMAIL,
            Name: SENDER_MAILJET_EMAIL,
          },
          To: [
            {
              Email: portalProfileData.email,
              Name: portalProfileData.first_name,
            },
          ],
          Subject: EMAIL_SUBJECT,
          TextPart: EMAIL_SUBJECT,
          HTMLPart: emailTemplate(
            portalProfileData.first_name,
            portalProfileData.two_factor_authentication_number,
          ),
        },
      ],
    });
    logger.log('Email sent successfully');
  } catch (error) {
    logger.error(error);
  }
}
