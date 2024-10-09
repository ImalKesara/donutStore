import { db } from '../../hooks.server';

function getMostPopluarProduct() {
	return db.product.findMany({
		where: { isAvailableForPurchase: true },
		take: 5,
		orderBy: { order: { _count: 'desc' } }
	});
}

function getNewstProduct() {
	return db.product.findMany({
		where: { isAvailableForPurchase: true },
		take: 5,
		orderBy: { createdAt: 'desc' }
	});
}

export const load = async () => {
	const [mostPopularProduct, newsetProduct] = await Promise.all([
		getMostPopluarProduct(),
		getNewstProduct()
	]);

	return {
		mostPopularProduct,
		newsetProduct
	};
};
