# CricPro Academy Backend - Implementation Todo

**Project:** Next Gen Cricket Academy Backend
**Frontend:** Already built (Next.js App Router)
**Backend:** Next.js API Routes + Supabase

---

## What You Need to Provide (Before We Start)

### 1. Supabase Setup (REQUIRED)
- [ ] Create a new Supabase project: https://supabase.com
- [ ] Get these credentials:
  - `SUPABASE_URL` - Project URL
  - `SUPABASE_ANON_KEY` - Settings → API → anon public key
  - `SUPABASE_SERVICE_ROLE_KEY` - Settings → API → service_role key (keep secret!)

### 2. Stripe Setup (Optional - Can Enable Later)
- [ ] Create Stripe account: https://stripe.com
- [ ] Get API keys: Developers → API keys
  - `STRIPE_SECRET_KEY` - Secret key (starts with sk_)
  - `STRIPE_WEBHOOK_SECRET` - After creating webhook
- [ ] Create webhook:
  - URL: `https://your-domain.com/api/webhooks/stripe`
  - Events: `checkout.session.completed`, `payment_intent.payment_failed`, `charge.refunded`

### 3. Resend Setup (Optional - Can Enable Later)
- [ ] Create Resend account: https://resend.com
- [ ] Get API key: Settings → API Keys
  - `RESEND_API_KEY` - API key starting with re_

### 4. Upstash Redis (Optional - For Rate Limiting)
- [ ] Create Upstash account: https://upstash.com
- [ ] Create a Redis database
- [ ] Get credentials:
  - `UPSTASH_REDIS_REST_URL`
  - `UPSTASH_REDIS_REST_TOKEN`

### 5. Environment File Template
Create a `.env.local` file in `apps/web/`:

```env
# Supabase (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
DATABASE_URL=your_supabase_connection_string

# App (REQUIRED)
NEXT_PUBLIC_APP_URL=http://localhost:3005

# Payments (OPTIONAL - Set to false for now)
PAYMENTS_ENABLED=false
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Email (OPTIONAL)
RESEND_API_KEY=
EMAIL_FROM=noreply@nextgencricket.co.uk

# Redis (OPTIONAL - Can skip for now)
# UPSTASH_REDIS_REST_URL=
# UPSTASH_REDIS_REST_TOKEN=
```

---

## Implementation Todo List

### Phase 1: Database & Auth Setup
**Duration:** 1-2 days

| Task | Description | Dependency |
|------|-------------|------------|
| [x] 1.1 Supabase Schema | Create all tables (users, resources, bookings, etc.) | Supabase project |
| [x] 1.2 Enable Extensions | Run: btree_gist, pgcrypto | Supabase SQL editor |
| [x] 1.3 RLS Policies | Set up row-level security | Supabase |
| [ ] 1.4 Drizzle Setup | Configure Drizzle ORM | None |
| [ ] 1.5 Auth Setup | Configure Supabase Auth | Supabase Auth settings |

**What you need:** Supabase project created

---

### Phase 2: Core APIs
**Duration:** 2-3 days

| Task | Description | Dependency |
|------|-------------|------------|
| [ ] 2.1 Availability API | GET `/api/availability` - fetch slots, blocked, booked | Phase 1 complete |
| [ ] 2.2 Availability Logic | Calculate peak/off-peak pricing | Phase 1 |
| [ ] 2.3 Booking API - Create | POST `/api/bookings` with transaction safety | Phase 1 |
| [ ] 2.4 Double-Booking Prevention | PostgreSQL exclusion constraint | Phase 1 |
| [ ] 2.5 Booking API - Get/Cancel | GET/cancel endpoints | Phase 2.3 |
| [ ] 2.6 Inquiry API | POST `/api/inquiries` for coaching/parties | Phase 1 |

**What you need:** Nothing new - use Supabase from Phase 1

---

### Phase 3: Admin Dashboard Backend
**Duration:** 2-3 days

| Task | Description | Dependency |
|------|-------------|------------|
| [x] 3.1 Admin Auth Middleware | Protect `/api/admin/*` routes | Phase 1 |
| [x] 3.2 Admin Booking Management | CRUD for bookings | Phase 2 |
| [x] 3.3 Resource Management | CRUD for lanes/machines | Phase 2 |
| [x] 3.4 Slot Blocking System | Admin block dates | Phase 2 |
| [x] 3.5 Group Sessions | CRUD + player bookings | Phase 1 |
| [x] 3.6 Customer Management | View booking history | Phase 2 |

**What you need:** Nothing new

---

### Phase 4: Payments (Toggle-Ready)
**Duration:** 1-2 days

| Task | Description | Dependency |
|------|-------------|------------|
| [ ] 4.1 Payment Service | Toggle system (PAYMENTS_ENABLED) | None |
| [ ] 4.2 Stripe Session API | POST `/api/payments/create-session` | Stripe account |
| [ ] 4.3 Stripe Webhook | POST `/api/webhooks/stripe` | Stripe webhook setup |
| [ ] 4.4 Payment Flow | Pending → Confirmed flow | Stripe |
| [ ] 4.5 Refund Support | POST `/api/payments/refund` | Stripe |

**What you need:** Stripe account & webhook configured (can skip initially)

---

### Phase 5: Email System
**Duration:** 1 day

| Task | Description | Dependency |
|------|-------------|------------|
| [ ] 5.1 Email Jobs Table | Queue table for async sending | Phase 1 |
| [ ] 5.2 Email Service | Resend integration | Resend account |
| [ ] 5.3 Booking Confirmation | Send on booking created | Phase 2 |
| [ ] 5.4 Admin Notifications | New booking alerts | Resend |
| [ ] 5.5 Background Worker | Process email queue | None |

**What you need:** Resend account (can skip initially, emails log to console)

---

### Phase 6: Polish & Optimization
**Duration:** 1-2 days

| Task | Description | Dependency |
|------|-------------|------------|
| [ ] 6.1 Rate Limiting | Protect booking APIs | Upstash (optional) |
| [ ] 6.2 Caching | Cache availability lookups | None |
| [ ] 6.3 Scheduled Jobs | Expiry cleanup, reminders | None |
| [ ] 6.4 Error Handling | Consistent API responses | None |
| [ ] 6.5 Testing | Manual testing of flows | All phases |

**What you need:** Nothing - can use in-memory fallback

---

## Quick Start Checklist

Before we begin, do these 3 things:

1. ☐ Create Supabase project
2. ☐ Create `.env.local` with Supabase credentials
3. ☐ Give me the credentials

Then we'll start with Phase 1.

---

## What Can Be Skipped Initially

| Feature | Can Skip Until | Impact |
|---------|----------------|--------|
| Stripe Payments | Phase 4 | Bookings confirm instantly without payment |
| Resend Emails | Phase 5 | Emails log to console, no real sending |
| Redis Rate Limiting | Phase 6 | No rate limiting (acceptable for MVP) |
| Upstash Cache | Phase 6 | Slightly slower availability lookups |

**Minimum viable backend:** Phase 1 + Phase 2 = Functional booking system

---

## Summary

| Phase | Duration | Your Requirements |
|-------|----------|-------------------|
| Phase 1: DB & Auth | 1-2 days | Supabase project |
| Phase 2: Core APIs | 2-3 days | Nothing |
| Phase 3: Admin | 2-3 days | Nothing |
| Phase 4: Payments | 1-2 days | Stripe (optional) |
| Phase 5: Emails | 1 day | Resend (optional) |
| Phase 6: Polish | 1-2 days | Nothing |

**Total estimated:** 8-13 days (can do concurrently)

Ready? Provide Supabase credentials and we'll start Phase 1!