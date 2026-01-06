'use server';

import { saveMessage } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { Resend } from 'resend';

export async function sendContactAction(formData: FormData) {
    const apiKey = process.env.RESEND_API_KEY;
    const resend = apiKey ? new Resend(apiKey) : null;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
        throw new Error('すべての項目を入力してください。');
    }

    // 1. DBに保存
    await saveMessage({
        name,
        email,
        message,
    });

    // 2. Email通知を送信 (Resend使用)
    try {
        if (resend) {
            await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: 'tmiyoshi0525@gmail.com',
                subject: '【Sydney Diary】お問い合わせが届きました',
                text: `以下の内容でお問い合わせが届きました。\n\nお名前: ${name}\nメールアドレス: ${email}\n\n内容:\n${message}`,
            });
            console.log('Email sent successfully');
        } else {
            console.error('RESEND_API_KEY is missing');
        }
    } catch (error) {
        console.error('Email notification failed:', error);
        // DBには保存されているため、処理は継続するが詳細はログに
    }

    revalidatePath('/admin');
    return { success: true };
}
