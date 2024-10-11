import { error } from '@sveltejs/kit';
import { db } from '../../../../../hooks.server';

export const load = async ({ params: { id } }) => {
	const product = await db.product.findUnique({
		where: { id }
	});

	if (!product) 
		error(404,'not found')
	
	return {
		product
	};
};
 