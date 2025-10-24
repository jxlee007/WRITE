# AccountDialog Dashboard - Visual Structure Guide

## Layout Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     AccountDialog Component                      │
│ (max-width: 1200px, border: border/60, shadow-2xl)              │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────┐  ┌──────────────────────────────────────┐ │
│  │   SIDEBAR        │  │       MAIN CONTENT AREA              │ │
│  │  (width: 264px)  │  │                                      │ │
│  │                  │  │  ┌────────────────────────────────┐  │ │
│  │  Account         │  │  │  OVERVIEW (DEFAULT)            │  │ │
│  │  ────────────────│  │  │                                │  │ │
│  │  Navigate        │  │  │  ┌──────────────────────────┐  │  │ │
│  │  ┌────────────┐  │  │  │  │  Metric Cards (4-col)    │  │  │ │
│  │  │ Overview   │  │  │  │  │  - Monthly Usage (58%)   │  │  │ │
│  │  │ Profile    │  │  │  │  │  - Active Sessions (3)   │  │  │ │
│  │  │ Security   │  │  │  │  │  - API Requests (12.4K)  │  │  │ │
│  │  │ Billing    │  │  │  │  │  - Security Score (95)   │  │  │ │
│  │  │ API        │  │  │  │  └──────────────────────────┘  │  │ │
│  │  │ Sessions   │  │  │  │                                │  │ │
│  │  └────────────┘  │  │  │  ┌──────────────────────────┐  │  │ │
│  │                  │  │  │  │  Quick Actions (4-col)   │  │  │ │
│  │  Starter Plan    │  │  │  │  - Settings              │  │  │ │
│  │  $39/month       │  │  │  │  - Security              │  │  │ │
│  │  58% used [●]    │  │  │  │  - Billing               │  │  │ │
│  │                  │  │  │  │  - API Keys              │  │  │ │
│  │  ✓ Production    │  │  │  └──────────────────────────┘  │  │ │
│  │                  │  │  └────────────────────────────────┘  │  │
│  │  [Sign Out]      │  │                                      │  │
│  │                  │  │                                      │  │
│  └──────────────────┘  └──────────────────────────────────────┘ │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Tab Content Structures

### OVERVIEW Tab
```
┌─ Section Title (2xl bold)
│  "Dashboard Overview"
│  "Key metrics and account statistics"
│
├─ Metrics Grid (Responsive: 1/2/4 cols)
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  │ USAGE        │  │ SESSIONS     │  │ API REQUESTS │  │ SECURITY     │
│  │ 58%          │  │ 3            │  │ 12.4K        │  │ 95           │
│  │ of quota ↑   │  │ devices ↑    │  │ (30 days) ↓  │  │ Excellent ↑  │
│  │ +12.5%       │  │ +1 this mo   │  │ -8.2%        │  │ Excellent    │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
│
└─ Quick Actions (4-column grid)
   [Settings] [Security] [Billing] [API Keys]
```

### PROFILE Tab
```
┌─ Section Title
│  "Profile Settings"
│  "Manage your personal information and preferences"
│
└─ Clerk UserProfile Component
   ┌──────────────────────────────────────┐
   │     Identity Information Form        │
   │     + Connected Accounts             │
   │     + Communication Preferences      │
   └──────────────────────────────────────┘
```

### SECURITY Tab
```
┌─ Section Title
│  "Security Controls"
│  "Manage authentication, multi-factor verification, and device sessions"
│
├─ Card: Two-Factor Authentication
│  ├─ Title + Status Badge [ENABLED]
│  ├─ Description
│  └─ Authenticator App Row [Manage]
│
└─ Card: Account Recovery
   ├─ Title + Description
   ├─ Recovery Email Row [Update]
   └─ Sign-in Alerts Toggle [Enabled]
```

### BILLING Tab
```
┌─ Section Title
│  "Billing & Plans"
│  "Manage your subscription, payment method, and invoices"
│
├─ Grid: 2 Cards (side-by-side on desktop)
│  │
│  ├─ Card: Current Plan
│  │  ├─ Starter · $39/month
│  │  ├─ Features list (3 bullets)
│  │  ├─ Usage Bar [████░░░░] 58%
│  │  └─ [Upgrade Plan]
│  │
│  └─ Card: Payment Method
│     ├─ Visa ending ••42, expires 08/27
│     ├─ Security info
│     └─ [Update Payment Method]
│
└─ Card: Invoice History
   ├─ INV-2045 | Aug 2025  | $42.00 | [PAID] [Download]
   ├─ INV-2044 | Jul 2025  | $42.00 | [PAID] [Download]
   └─ INV-2043 | Jun 2025  | $38.00 | [PAID] [Download]
```

### API Tab
```
┌─ Section Title
│  "API & Integration"
│  "Manage access keys, webhooks, and integration settings"
│
├─ Card: API Keys
│  ├─ VITE_CLERK_PUBLISHABLE_KEY | pk_live_k9a2...sk0 | [Copy]
│  └─ VITE_CONVEX_URL | https://good-bloodhound-442... | [Copy]
│
├─ Card: Webhooks
│  ├─ Endpoint URL: [https://api.example.com/webhooks/clerk] [Update]
│  └─ Event Subscriptions: 12 events enabled [Manage]
│
└─ Card: Rate Limiting
   └─ Requests per minute: 1,000 RPM [Standard]
```

### SESSIONS Tab
```
┌─ Section Title
│  "Active Sessions"
│  "Monitor and control device access to your account"
│
├─ Card: Connected Devices
│  ├─ MacBook Pro · Safari | San Francisco, US | Active now | [Active]
│  ├─ iPhone 15 · Clerk App | San Francisco, US | 2h ago | [Revoke]
│  └─ Windows Desktop · Edge | Austin, US | Yesterday | [Revoke]
│
├─ Card: Session Settings
│  ├─ 24-hour inactivity timeout | Toggle [ON]
│  └─ Concurrent sessions limit: 5 devices | [Edit]
│
└─ Card: Danger Zone (Red Border)
   └─ Sign out all devices | Terminate all sessions | [Sign Out All]
```

---

## Responsive Breakpoints

### Mobile (< md)
```
┌─────────────────────┐
│  [Account ▼]        │  <- Dropdown
├─────────────────────┤
│   Metric Cards      │
│   (1 column)        │
│                     │
│   Quick Actions     │
│   (2 columns)       │
│                     │
│   Content Section   │
│   (Full width)      │
│                     │
└─────────────────────┘
```

### Tablet (md)
```
┌──────────┬────────────────────┐
│ Sidebar  │  Metric Cards      │
│ (264px)  │  (2 columns)       │
│          ├────────────────────┤
│ [Tab 1]  │  Content Area      │
│ [Tab 2]  │  (Responsive)      │
│ [Tab 3]  │                    │
│          │                    │
└──────────┴────────────────────┘
```

### Desktop (lg)
```
┌──────────┬────────────────────────────────┐
│ Sidebar  │  Metric Cards (4 columns)      │
│ (264px)  ├────────────────────────────────┤
│          │  Content Area (Full featured)  │
│ [Tab 1]  │                                │
│ [Tab 2]  │  - Grid layouts                │
│ [Tab 3]  │  - Multiple columns            │
│ [Tab 4]  │  - Better spacing              │
│ [Tab 5]  │                                │
│ [Tab 6]  │                                │
│          │                                │
└──────────┴────────────────────────────────┘
```

---

## Color Legend

```
┌─────────────────────────────────────────────────────┐
│ COLORS & STYLING                                    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Primary Accent       #a78bfa (Purple-300)         │
│  Success/Positive     #10b981 (Emerald-500)        │
│  Warning/Negative     #f97316 (Orange-500)         │
│  Destructive          #ef4444 (Red-500)            │
│                                                     │
│  Borders              border/60 (60% opacity)      │
│  Card Background      bg-card/70 (70% opacity)     │
│  Sidebar Background   bg-sidebar-bg/90             │
│  Hover State          bg-muted/40 (40% opacity)    │
│                                                     │
│  Text Primary         text-foreground              │
│  Text Secondary       text-muted-foreground        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Interactive Elements

### Buttons
```
┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│   Primary      │  │   Outline      │  │  Destructive   │
│  (Blue bg)     │  │ (Border only)  │  │  (Red bg)      │
│  [Upgrade]     │  │  [Manage]      │  │  [Revoke]      │
└────────────────┘  └────────────────┘  └────────────────┘
```

### Badges
```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ ✓ Enabled    │  │ ✓ Paid       │  │ ✓ Current    │  │ ◆ Standard   │
│ (Emerald)    │  │ (Emerald)    │  │ (Primary)    │  │ (Primary)    │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
```

### Switches
```
OFF State              ON State
┌─────────────┐       ┌─────────────┐
│ ○ ─────── │       │ ─────── ● │
└─────────────┘       └─────────────┘
(Gray)                (Primary/Blue)
```

---

## Spacing & Typography

### Margins/Padding
- Section gap: `gap-8`
- Card padding: `p-4` to `p-6`
- Sidebar padding: `p-6`
- Content padding: `p-6` to `p-8`

### Font Sizes
- Section Title: `text-2xl font-bold`
- Card Title: `text-base font-medium/semibold`
- Description: `text-sm text-muted-foreground`
- Small text: `text-xs text-muted-foreground`

### Line Heights
- Headings: `tracking-tight`
- Descriptions: `leading-tight`
- Body text: Normal

---

## Mobile Menu (Dropdown)

```
Dropdown opened (Mobile view)
┌────────────────┐
│ Choose Section ▼│
├────────────────┤
│ Overview       │
│ Profile        │
│ Security       │
│ Billing        │
│ API            │
│ Sessions       │
└────────────────┘
```

---

## Summary

This dashboard-style interface provides:
- **Professional appearance** with modern card-based layout
- **Intuitive navigation** with 6 organized tabs
- **Responsive design** that works on all device sizes
- **Clear visual hierarchy** with typography and color coding
- **Consistent dark mode** throughout all sections
- **Quick access** to common account tasks
- **Detailed management** for advanced settings

The component is production-ready and fully backward compatible with existing implementations.
