import Stripe from 'stripe'

// NOTE: checkout
export type StripeCheckoutSession = Stripe.Checkout.Session
export type StripeCheckoutSessionCreateParams =
  Stripe.Checkout.SessionCreateParams

// NOTE:paymentIntent
export type StripePaymentIntent = Stripe.PaymentIntent
export type StripePaymentIntentCreateParams = Stripe.PaymentIntentCreateParams

// NOTE:payment_methods
export type StripePaymentMethod = Stripe.PaymentMethod

// NOTE:customer
export type StripeCustomer = Stripe.Customer
export type StripeAddress = Stripe.Address
export type StripeCustomerUpdateParams = Stripe.CustomerUpdateParams

// NOTE:webhook
export type StripeCharge = Stripe.Charge
export type StripeEvent = Stripe.Event

// NOTE:https://github.com/stripe/stripe-node#configuration
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-08-01'
})
