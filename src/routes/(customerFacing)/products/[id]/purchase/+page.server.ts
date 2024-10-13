import { error } from '@sveltejs/kit';
import { db } from '../../../../../hooks.server';
import Stripe from 'stripe';
import { STRIPE_SECRETE_KEY } from '$env/static/private';


const stripe = new Stripe(STRIPE_SECRETE_KEY)

export const load = async ({ params: { id } }) => {
	const product = await db.product.findUnique({
		where: { id }
	});

	if (!product) error(404, 'not found');
	const payementIntent = await stripe.paymentIntents.create({
		amount:product.priceInCents,
		currency:'USD',
		metadata:{
			productId : product.id
		},
		automatic_payment_methods:{
			enabled:true
		}
	})

	if(payementIntent.client_secret === null){
		throw Error('Failed to create payment intent')
	}

	return {
		product,
		clientSecrete : payementIntent.client_secret
	};
};
