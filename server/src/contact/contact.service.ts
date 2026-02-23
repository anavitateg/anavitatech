import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { ContactDto } from './contact.dto';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  private transporter: nodemailer.Transporter;

  constructor(private readonly config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get<string>('SMTP_HOST', 'smtp.gmail.com'),
      port: this.config.get<number>('SMTP_PORT', 587),
      secure: this.config.get<string>('SMTP_SECURE', 'false') === 'true',
      auth: {
        user: this.config.get<string>('SMTP_USER'),
        pass: this.config.get<string>('SMTP_PASS'),
      },
    });
  }

  async sendContactEmail(dto: ContactDto): Promise<{ success: boolean; message: string }> {
    const { name, email, message } = dto;
    const recipient = this.config.get<string>('CONTACT_EMAIL', 'hola@tudominio.com');

    try {
      // Email to portfolio owner
      await this.transporter.sendMail({
        from: `"Portfolio Contact" <${this.config.get('SMTP_USER')}>`,
        to: recipient,
        replyTo: email,
        subject: `📩 Nuevo mensaje de ${name} — Portfolio`,
        html: this.buildOwnerEmailTemplate(name, email, message),
        text: `Nuevo mensaje de ${name} (${email}):\n\n${message}`,
      });

      // Confirmation email to sender
      await this.transporter.sendMail({
        from: `"Tu Nombre" <${this.config.get('SMTP_USER')}>`,
        to: email,
        subject: '✅ He recibido tu mensaje — Te contactaré pronto',
        html: this.buildConfirmationEmailTemplate(name),
        text: `Hola ${name},\n\nHe recibido tu mensaje y te responderé en menos de 24 horas.\n\nSaludos,\nTu Nombre`,
      });

      this.logger.log(`Contact email sent from ${email}`);
      return { success: true, message: 'Mensaje enviado correctamente.' };
    } catch (error) {
      this.logger.error(`Failed to send contact email: ${error.message}`, error.stack);
      throw new InternalServerErrorException('No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.');
    }
  }

  private buildOwnerEmailTemplate(name: string, email: string, message: string): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <style>
        body { font-family: 'Segoe UI', sans-serif; background: #030712; color: #fff; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .header { background: linear-gradient(135deg, #00f5ff, #a855f7); border-radius: 12px 12px 0 0; padding: 30px; text-align: center; }
        .header h1 { color: #030712; font-size: 24px; margin: 0; font-weight: 700; }
        .body { background: #0a0f1e; border: 1px solid rgba(255,255,255,0.08); border-top: none; border-radius: 0 0 12px 12px; padding: 30px; }
        .field { margin-bottom: 20px; }
        .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #00f5ff; margin-bottom: 6px; }
        .value { color: rgba(255,255,255,0.8); font-size: 15px; line-height: 1.6; background: rgba(255,255,255,0.05); border-radius: 8px; padding: 12px 16px; border: 1px solid rgba(255,255,255,0.08); }
        .footer { text-align: center; color: rgba(255,255,255,0.3); font-size: 12px; margin-top: 24px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📩 Nuevo mensaje en tu Portfolio</h1>
        </div>
        <div class="body">
          <div class="field">
            <div class="label">Nombre</div>
            <div class="value">${this.escapeHtml(name)}</div>
          </div>
          <div class="field">
            <div class="label">Email</div>
            <div class="value">${this.escapeHtml(email)}</div>
          </div>
          <div class="field">
            <div class="label">Mensaje</div>
            <div class="value">${this.escapeHtml(message).replace(/\n/g, '<br>')}</div>
          </div>
        </div>
        <div class="footer">Portfolio Contact System · ${new Date().toLocaleString('es-ES')}</div>
      </div>
    </body>
    </html>
    `;
  }

  private buildConfirmationEmailTemplate(name: string): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <style>
        body { font-family: 'Segoe UI', sans-serif; background: #030712; color: #fff; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .header { background: linear-gradient(135deg, #a855f7, #3b82f6); border-radius: 12px 12px 0 0; padding: 30px; text-align: center; }
        .header h1 { color: #fff; font-size: 24px; margin: 0; font-weight: 700; }
        .body { background: #0a0f1e; border: 1px solid rgba(255,255,255,0.08); border-top: none; border-radius: 0 0 12px 12px; padding: 30px; }
        p { color: rgba(255,255,255,0.7); line-height: 1.8; font-size: 15px; }
        .highlight { color: #00f5ff; font-weight: 600; }
        .footer { text-align: center; color: rgba(255,255,255,0.3); font-size: 12px; margin-top: 24px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Mensaje recibido</h1>
        </div>
        <div class="body">
          <p>Hola <span class="highlight">${this.escapeHtml(name)}</span>,</p>
          <p>He recibido tu mensaje y te contactaré en menos de <span class="highlight">24 horas</span>.</p>
          <p>Gracias por tu interés. ¡Estoy deseando conocer tu proyecto!</p>
          <p>Saludos,<br/><span class="highlight">Tu Nombre</span><br/>Full Stack Developer</p>
        </div>
        <div class="footer">No respondas a este correo automático.</div>
      </div>
    </body>
    </html>
    `;
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
