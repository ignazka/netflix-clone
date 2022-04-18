import {
  createCheckoutSession,
  getStripePayments,
} from '@stripe/firestore-stripe-payments'
import { getFunctions, httpsCallable } from '@firebase/functions'
import app from '../lib/firebase'

const payments = getStripePayments(app, {
  customersCollection: 'customers',
  productsCollection: 'products',
})

const loadCheckout = async (priceId: string) => {
  //actual domain value
  const ORIGIN = window.location.origin
  await createCheckoutSession(payments, {
    price: priceId,
    success_url: ORIGIN,
    cancel_url: ORIGIN,
  })
    .then((snapshot) => window.location.assign(snapshot.url))
    .catch((error) => console.log(error.message))
}

export { loadCheckout }
export default payments
