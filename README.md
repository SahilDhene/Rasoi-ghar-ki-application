# Ghar Ki Rasoi

Family grocery tracker PWA — React + Vite, backed by Supabase (Google login, Postgres, realtime, web push).

Source was reconstructed from the production bundle; behaviour matches the original build.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/ — deploy that folder
```

## Layout

- `src/App.jsx` — routes between login → onboarding → dashboard
- `src/hooks/useAuth.js` — Google sign-in, household membership, push subscription
- `src/hooks/useGroceryItems.js` — item CRUD + realtime sync
- `src/lib/` — Supabase client, theme, i18n (en / hi / mr in `translations.js`)
- `src/components/` — UI, one CSS module per component
- `public/sw-push.js` — push-notification handler imported by the generated service worker

## Design

Styled after Microsoft's Fluent 2 design language with Rasoi orange as the accent.
Icons: [Fluent System Icons](https://github.com/microsoft/fluentui-system-icons) (MIT).
3D item emoji in `public/emoji/`: [Fluent Emoji](https://github.com/microsoft/fluentui-emoji) (MIT).

## Backend (lives in Supabase, not in this repo)

Tables `households`, `household_members`, `grocery_items`, `push_subscriptions`; RPC `find_household_by_invite_code`; edge function `send-push`.
