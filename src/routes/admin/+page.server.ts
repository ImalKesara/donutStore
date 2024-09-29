import { db } from '../../hooks.server';

async function getSalesData() {
	const data = await db.order.aggregate({
		// means priceIncents tiyena ewaye withrk ekathuwa
		_sum: { priceInCents: true },
		_count: true
	});
	return {
		amount: (data._sum.priceInCents || 0) / 100,
		numberOfSales: data._count
	};
}

export const load = async () => {
	return {};
};
