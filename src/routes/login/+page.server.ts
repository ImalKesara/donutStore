import { loginFormSchema } from '$lib/formSchema';
import { generateId } from 'lucia';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { Argon2id } from 'oslo/password';
import { db, lucia } from '../../hooks.server.js';

export const load = async () => {
	return {
		form: await superValidate(zod(loginFormSchema))
	};
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(loginFormSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		// -------------Create user----------- 
		// const userId = generateId(15);
		// const hashedPassword = await new Argon2id().hash(form.data.password);

		// await db.user.create({
		// 	data: {
		// 		email: 'admin@gmail.com',
		// 		hashedPassword: hashedPassword,
		// 		username: form.data.username,
		// 		isAdmin: true,
		// 		id: userId
		// 	}
		// });

		// const session = await lucia.createSession(userId,{});
		// const sessionCookie = lucia.createSessionCookie(session.id);
		// event.cookies.set(sessionCookie.name, sessionCookie.value,{
		// 	path:'',
		// 	...sessionCookie.attributes
		// })

	}
};
