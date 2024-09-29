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

async function getUserData() {
	const [userCount, orderData] = await Promise.all([
		await db.user.count(),
		await db.order.aggregate({
			_sum: { priceInCents: true }
		})
	]);

	return {
		userCount,
		averageValuePerUser: userCount === 0 ? 0 : (orderData._sum.priceInCents || 0) / userCount / 1000
	};
}



export const load = async () => {
	return {};
};
