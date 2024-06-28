import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js';

export class StripeSetupService {
    setupStripe = async () => {
        try {
            const stripePromise = loadStripe(await this.getPublicKey());
            const stripe = await stripePromise;

            if (stripe) {
                return stripe
            }
            else {
                console.log('Failed to load Stripe')
            }
        }
        catch (err) {
            console.log("An error occured", err)
            return
        }

    }
    getPublicKey = async () => {
        try {
            const param = 'PublicStripeToken'
            const response = await axios.get(`http://localhost:5000/secret/${param}`);
            return response.data.secret;
        }
        catch (err) {
            console.log(err);
            return
        }
    }
}