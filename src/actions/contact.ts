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

    let emailSent = false;
    let dbSaved = false;
    let errorMessage = '';

    // 1. DBに保存
    try {
        await saveMessage({
            name,
            email,
            message,
        });
        dbSaved = true;
    } catch (error) {
        console.error('Database save failed:', error);
        errorMessage = 'データベースへの保存に失敗しました: ' + (error instanceof Error ? error.message : String(error));
    }

    // 2. Email通知を送信 (Resend使用)
    if (dbSaved) {
        try {
            if (resend) {
                const { data: resendData, error: resendError } = await resend.emails.send({
                    from: 'onboarding@resend.dev',
                    to: 'tmiyoshi0525@gmail.com',
                    subject: '【Sydney Diary】お問い合わせが届きました',
                    text: `以下の内容でお問い合わせが届きました。\n\nお名前: ${name}\nメールアドレス: ${email}\n\n内容:\n${message}`,
                });

                if (resendError) {
                    console.error('Resend error:', resendError);
                    errorMessage = 'メール送信エラー: ' + resendError.message;
                } else {
                    console.log('Email sent successfully:', resendData);
                    emailSent = true;
                }
            } else {
                errorMessage = 'RESEND_API_KEY が設定されていません。';
            }
        } catch (error) {
            console.error('Email notification failed:', error);
            errorMessage = 'メール送信中に予期せぬエラーが発生しました。';
        }
    }

    revalidatePath('/admin');
    return { success: dbSaved, emailSent, errorMessage };
}
