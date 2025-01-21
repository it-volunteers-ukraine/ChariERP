import bcrypt from 'bcrypt';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

import { sendEmail } from '@/services';
import { tokenExpiryTime } from '@/constants';

import { Admin, ResetToken, Users } from '..';
import { BaseService } from '../database/base.service';

class ResetTokenService extends BaseService {
  async sendResetEmail(email: string, baseUrl: string) {
    try {
      await this.connect();

      const admin = await Admin.findOne({ email });
      const user = await Users.findOne({ email });

      const targetUser = user || admin;

      if (!targetUser) {
        return { success: false, message: 'notFound' };
      }

      const existingToken = await ResetToken.findOne({ userId: targetUser._id });

      if (existingToken) {
        const decoded = jwt.verify(existingToken.token, process.env.SPACES_KEY!);

        if (typeof decoded === 'object' && 'exp' in decoded) {
          const currentUnixTime = Math.floor(Date.now() / 1000);

          const remainingHours = (decoded.exp! - currentUnixTime) / 3600;

          return {
            success: false,
            message: 'tokenExistsTime',
            time: remainingHours.toFixed(0),
          };
        }

        return {
          success: false,
          message: 'tokenExists',
        };
      }

      const jwtToken = jwt.sign({ userId: targetUser._id }, process.env.SPACES_KEY!, {
        expiresIn: `${tokenExpiryTime}s`,
      });

      await ResetToken.create({
        userId: targetUser._id,
        token: jwtToken,
        createdAt: new Date(),
      });

      const passwordChangeLink = `${baseUrl}/password-change?token=${jwtToken}`;

      await sendEmail({
        to: email,
        subject: 'Запит на зміну пароля',
        text: `Ви надіслали запит на зміну пароля. Перейдіть за цим посиланням, щоб виконати зміну: ${passwordChangeLink}`,
        html: `
            <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px;">
              <h2 style="color: #0056b3; text-align: center;">Запит на зміну пароля</h2>
              <p>Ви надіслали запит на зміну пароля. Натисніть кнопку нижче, щоб виконати зміну:</p>
              <div style="text-align: center; margin: 20px 0;">
                <a href="${passwordChangeLink}" target="_blank" style="display: inline-block; background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
                  Змінити пароль
                </a>
              </div>
              <p style="font-size: 14px; color: #555;">Якщо ви не робили цей запит, просто ігноруйте цей лист або зверніться до служби підтримки.</p>
              <p style="font-size: 14px; color: #777; text-align: center;">Дякуємо!</p>
            </div>
          `,
      });

      return { success: true, message: 'Email sent successfully' };
    } catch {
      return { success: false, message: 'errorSend' };
    }
  }

  async changePassword(token: string | null, newPassword: string) {
    await this.connect();

    if (!token) {
      return { success: false, message: 'linkExpired' };
    }

    if (!newPassword) {
      return { success: false, message: 'passwordRequired' };
    }

    try {
      const decode = jwt.verify(token, process.env.SPACES_KEY!) as { userId: string };

      if (!decode.userId) {
        return { success: false, message: 'linkExpired' };
      }
      const resetToken = await ResetToken.findOne({ userId: decode.userId });

      if (!resetToken) {
        return { success: false, message: 'linkExpired' };
      }

      const user = await Users.findById(decode.userId);
      const admin = await Admin.findById(decode.userId);

      if (!user && !admin) {
        return { success: false, message: 'notFound' };
      }

      const targetUser = user || admin;

      targetUser.password = await bcrypt.hash(newPassword, 10);

      if (admin) {
        await Admin.findByIdAndUpdate(decode.userId, { $set: targetUser }, { new: true });
      } else {
        await Users.findByIdAndUpdate(decode.userId, { $set: targetUser }, { new: true });
      }

      await ResetToken.deleteOne({ userId: decode.userId });

      return { success: true, message: 'Password change successfully' };
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return { success: false, message: 'linkExpired' };
      }

      return { success: false, message: 'error' };
    }
  }
}

export const resetTokenService = new ResetTokenService();
