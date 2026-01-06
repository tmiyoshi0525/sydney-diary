'use server';

import { updateProfile } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function updateProfileAction(formData: FormData) {
    const name = formData.get('name') as string;
    const bio = formData.get('bio') as string;
    const avatar = formData.get('avatar') as string;

    await updateProfile({
        name,
        bio,
        avatar,
    });

    revalidatePath('/profile');
    revalidatePath('/admin');
}
