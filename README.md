# NexRTech-project
A final year project for IT students On the Topic Commerce orchastration platform
<br>

# Commerce Orchestration Platform

**Replacing cash with itemised commerce across the Australia – Kenya diaspora corridor.**

Industry-sponsored capstone project with **Group Remit** (Final-Year IT Engineering cohort). Launch: August 2026.

> A shopping basket with a real merchant becomes a payment link that a trusted family member reviews and pays. The order is fulfilled locally — no cash ever changes hands.

## The Problem

Remittances usually arrive as cash, so senders have no visibility into what it's spent on and recipients absorb the friction of turning it into goods. This project replaces the cash step with a purchase step, built on a behaviour people already use in WhatsApp: asking a relative overseas to "send money for groceries."

## Core Mechanic

Either the **recipient** builds a basket and sends a payment request to the **payer**, or the **payer** browses the merchant's catalogue directly and pays. Both paths hit the same order/basket → payment → fulfilment flow, and rely on trust that already exists (recipient↔merchant, payer↔recipient) rather than asking either side to trust the platform.

## Roadmap

| Phase | Focus | Core Question |
|---|---|---|
| **1 — MVP** | One merchant, one city (Lusaka), one corridor. WhatsApp + Stripe payment links, manual fulfilment. | Will a payer pay for a specific basket via WhatsApp, and will the merchant fulfil it? |
| **2 — Growth** | Multiple merchants, categories, lighter-weight onboarding. | Does the model hold with merchant variety and organic growth? |
| **3 — Ecosystem** | Automated delivery dispatch, merchant self-service portal, multi-city, bounded AI, formal compliance. | Can the platform run as durable, scalable infrastructure? |

## Engineering Principles

- Cloud-native, API-first backend
- Event-driven integration (WhatsApp Cloud API, Stripe)
- Security, observability, and resilience from day one
- Automated testing & CI/CD baked in, not bolted on
- WhatsApp is just the first interface — the platform is the product

## Key Terms

- **Corridor** — the country pair money/goods move between (Australia → Kenya)
- **Payment link** — a time-limited Stripe checkout page for one itemised order
- **Ledger** — single source of truth for order/payment/fulfilment state
- **KYC/KYB** — identity and business verification required by regulators/providers

## Status

🚧 **Phase 1 (MVP) — in development.**

## License

_Add license information here._
