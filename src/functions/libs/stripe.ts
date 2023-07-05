import Stripe from 'stripe'

// NOTE: checkout
export type StripeCheckoutSession = Stripe.Checkout.Session
export type StripeCheckoutSessionCreateParams =
  Stripe.Checkout.SessionCreateParams

// NOTE:paymentIntent
export type StripePaymentIntent = Stripe.PaymentIntent
export type StripePaymentIntentCreateParams = Stripe.PaymentIntentCreateParams

// NOTE:customer
export type StripeCustomer = Stripe.Customer.Shipping
export type StripeAddress = Stripe.Address

// NOTE:webhook
export type StripeCharge = Stripe.Charge
export type StripeEvent = Stripe.Event

// NOTE:https://github.com/stripe/stripe-node#configuration
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-08-01'
})
