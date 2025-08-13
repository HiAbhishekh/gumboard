# Gumboard

Keep on top of your team's to-dos.

## Getting Started

### Prerequisites

- Docker Compose
- Node

### Install dependencies

```bash
npm install
```

### Database Setup

1. Create your environment variables file:

```bash
cp .env.example .env
```

2. Start the PostgreSQL database using Docker:

```bash
npm run docker:up
```

3. Push the database schema:

```bash
npm run db:push
```

### Development Server

First, run the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to access the application.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/antiwork/gumboard&env=DATABASE_URL,EMAIL_FROM,AUTH_RESEND_KEY,AUTH_SECRET)

## Database Commands

- `npm run docker:up` - Start PostgreSQL database
- `npm run docker:down` - Stop PostgreSQL database
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio (database GUI)
- `npm run db:reset` - Reset database and run migrations

### Schema Changes

When changing the database schema in `prisma/schema.prisma`, create and check in a new migration to apply the changes in production:

```bash
npm run db:migrate
```

## 🔐 Google OAuth Setup

To enable login with Google, follow these steps:

### 1. Create Google OAuth Credentials

1. Visit [Google Cloud Console](https://console.cloud.google.com/).
2. Navigate to:  
   `APIs & Services` → `Credentials` → `Create Credentials` → `OAuth Client ID`
3. Choose **Web Application** as the application type.
4. Add this to **Authorized redirect URIs**:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
   *(Replace with your production URL if deploying)*
---

### 2. Add Environment Variables

In your `.env.local` file, add:

```env
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
```

## 🔐 GitHub OAuth Setup

To enable login with GitHub, follow these steps:

### 1. Create GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **OAuth Apps** → **New OAuth App**
3. Fill in the application details:
   - **Application name**: Gumboard (or your preferred name)
   - **Homepage URL**: `http://localhost:3000` (for development)
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Click **Register application**
5. Copy the **Client ID** and **Client Secret**

### 2. Add Environment Variables

In your `.env.local` file, add:

```env
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

## 🔔 Slack Integration

Want to get Slack notifications when your team updates notes and checklists? Here's how to set it up.

### Setting up the Slack App

First, you'll need to create a Slack app. Head over to [api.slack.com/apps](https://api.slack.com/apps) and create a new app from scratch. Name it something like "Gumboard" and pick your workspace.

### Getting the Webhook URL

Once your app is created, you need to enable incoming webhooks:
- Go to "Incoming Webhooks" in the sidebar
- Flip the switch to activate them
- Add a new webhook to your workspace
- Pick which channel should get the notifications (I usually go with a dedicated #gumboard channel)
- Copy that webhook URL - you'll need it in the next step

### Connecting to Gumboard

For local development, just add the webhook URL to your `.env.local`:
```env
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX
```

If you're running this in production, log in as an admin and go to Settings → Organization. There's a Slack Integration section where you can paste the webhook URL.

### What gets sent to Slack?

The integration is pretty smart about what it sends. You'll get notifications for:
- New notes (but only if they have actual content)
- Checklist items being added, completed, or updated
- Notes getting archived

There's built-in deduplication so you won't get spammed if someone rapidly clicks checkboxes. Also, each board has its own toggle to enable/disable Slack updates, and anything starting with "Test" gets ignored automatically.

### Troubleshooting

If notifications aren't showing up, double-check your webhook URL and make sure the board has Slack updates enabled. The webhook needs permission to post in whatever channel you picked.

If you're getting too many notifications, you can disable them per board or just use a dedicated channel for Gumboard updates.

### Security Note

Keep your webhook URL private - it gives write access to your Slack channel. Don't commit it to version control, use environment variables instead.
