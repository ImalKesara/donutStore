import { db } from "../../../hooks.server";

export const load = (async () => {
	return {
		users:await db.user.findMany({
			select:{
				id:true,
				email:true,
				// means order table eke tiyena priceInCents
				order:{select:{priceInCents:true}},
			},
			orderBy:{createdAt:'desc'}
		})
	};
});
