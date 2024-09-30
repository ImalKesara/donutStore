import { db } from '../../../hooks.server';

export const load = async () => {
	return {
		products: await db.product.findMany({
			select: {
				id: true,
				name: true,
				priceInCents: true,
				isAvailableForPurchase: true,
				imagePath: true,
				_count: {
					select: {
						order: true
					}
				}
			},
			orderBy: { name: 'asc' }
		})
	};
};

export const actions = {
	toggleAvailability: async ({ request }) => {
		const formData = await request.formData();
		//  name = "id" in form
		const id = formData.get('id') as string;
		const isAvailableForPurchase = formData.has('isAvailableForPurchase');
		await db.product.update({
			where: { id },
			data: {
				isAvailableForPurchase
			}
		});
	}
};
