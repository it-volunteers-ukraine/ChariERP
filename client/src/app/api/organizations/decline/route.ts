import { NextResponse } from 'next/server';

import { sendEmail } from '@/services';
import { connectDB, Organizations } from '@/lib';
import { RequestOrganizationStatus } from '@/types';

export async function POST(request: Request) {
  try {
    await connectDB();
    const { reason, id } = await request.json();

    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    const organization = await Organizations.findOne({ _id: id });

    if (!organization) {
      return NextResponse.json({ message: 'Organization not found' }, { status: 404 });
    }

    const updateOrganization = {
      request: RequestOrganizationStatus.DECLINED,
    };

    await Organizations.findByIdAndUpdate(id, { $set: updateOrganization });

    const htmlCode = `<div style="font-family: Arial, sans-serif; padding: 20px;">
    <h2 style="color: #333;">Відмовлено в реєстрації</h2>
    <p style="color: #333;">Шановний(а) ${organization.contactData.firstName} ${organization.contactData.lastName},</p>
    <p style="color: #333;">На жаль, ваша заявка на реєстрацію була відхилена з наступної причини:</p>
    <p style="color: #d9534f; font-weight: bold;">${reason}</p>
    <p style="color: #333;">Якщо у вас є будь-які питання, будь ласка, зв'яжіться з нашою службою підтримки.</p>
    <p style="color: #333;">З повагою,<br/>Команда підтримки Chari ERP</p>
</div>`;

    await sendEmail({
      html: htmlCode,
      text: 'Відмовлено в реєстрації',
      subject: 'Відмовлено в реєстрації',
      to: organization.contactData.email,
    });

    return NextResponse.json({ message: 'Organization declined' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
