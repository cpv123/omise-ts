# omise-ts

A modern-day version of the [omise-node](https://github.com/omise/omise-node) package, allowing you to easily use the [Omise APIs](https://www.omise.co/docs) with Node.js.

### What's wrong with the official version?

- It's not maintained (or at least very, very rarely maintained)
- It doesn't work with Next.js, explained in [this issue](https://github.com/omise/omise-node/issues/140)

### Why is this SDK better?

- It's maintained, and it works with Next.js (see the [example-app](https://github.com/cpv123/omise-ts/tree/main/example-app) in this repo)
- It's written in TypeScript
- It offers more than just basic CRUD operations per resource; it also includes slightly more complex functions such as deleting all _schedules_ for a _customer_

### Limitations of this SDK

- It doesn't support all Omise resources/actions, but it is very easy to add new ones
- It relies on the types from official omise-node library

## Usage

The [example-app](https://github.com/cpv123/omise-ts/tree/main/example-app) shows how to use this SDK with a Next.js application.

Install from npm

```bash
yarn add omise-ts
```

or

```bash
npm install omise-ts
```

Find your secret key on your Omise dashboard, and then you can do things like:

```ts
const Omise = new OmiseClient({
  apiSecretKey: YOUR_OMISE_SECRET_KEY,
})

// Create a charge for an existing customer
const charge = await Omise.charges.create({
  amount: 250 * 100, // 250 baht
  customer: 'cust_test_5soxme7qwp1fs0zljfx',
  currency: 'THB',
})

// Add a new card and set it as the default for a customer
const customerWithNewCard = await Omise.customers.updateDefaultCard(
  'cust_test_5soxme7qwp1fs0zljfx',
  'tokn_test_5soxo23uixfjgi0vazn'
)

// List all customers
await Omise.customers.list()

// Delete a schedule
await Omise.schedules.destroy('schd_test_5sqh1ofvhp6k9r0kxtp')
```
