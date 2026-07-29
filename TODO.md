# Portfolio follow-up

- [ ] **Finish contact form setup when back at the main laptop**
  1. Open the Make.com scenario used by the portfolio contact form.
  2. Create or regenerate the webhook because the old URL was previously exposed in client-side code.
  3. In the portfolio hosting dashboard, add an environment variable named `CONTACT_WEBHOOK_URL`.
  4. Paste the new Make.com webhook URL as the value.
  5. Redeploy the portfolio.
  6. Submit a test message and confirm it reaches Make.com.

Do not place the real webhook URL in `.env.example`, `README.md`, or any committed file.
