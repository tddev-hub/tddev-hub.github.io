# Privacy Policy for the WakeDeal App

Last updated: November 17, 2026 · [Deutsche Fassung](/wakedeal/datenschutz/)

## 1. Controller

DoLabst – owner and postal address: see [Legal notice](/impressum/)
Email: kontakt@dolabst.de

We do not have a data protection officer; we are not required to appoint one.

## 2. Summary

- WakeDeal works **without an account** as long as you don't put money on it ("word of honor"). In that case all data stays on your phone.
- You only need an account once you put money on an alarm. We then store on our server only what is needed for the pledge and its settlement.
- **Photos and camera images are never stored or uploaded.** Recognition runs on your phone.
- No tracking, no advertising, no analytics services.

## 3. Data that stays on your phone

The app stores this data locally. It is not transmitted to us and is removed when you delete the app:

- alarm settings (time, type of proof, pledge amount, number of steps)
- evening reminder (time, on/off)
- history and streak of word-of-honor days
- the saved barcode (only the character string, no image)
- the list of objects you have excluded
- a queue of reports that could not be sent yet without internet

### Permissions on your phone

| Permission | Purpose | What happens to the data |
|---|---|---|
| Camera | Photo proof (recognizing an object) and barcode scanning | Images are only analyzed live, not stored, not sent |
| Motion & Fitness / Physical activity | Steps proof | Steps are only counted during the proof, not stored, not sent |
| Notifications | Evening reminder | scheduled locally on the phone, without a server |
| Alarms (iPhone: AlarmKit) | setting the alarm | stays on the phone |

You can revoke any permission in your phone's settings. The affected feature is then no longer available.

### Image recognition (Google ML Kit)

For the photo proof the app uses Google's **ML Kit** library with a recognition model included in the app. Recognition runs entirely on your phone; camera images are not sent to Google or to us. ML Kit may, however, send technical usage and diagnostic data about the library itself (e.g. app and device information, performance metrics) to Google. Provider: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland. Legal basis: Art. 6(1)(f) GDPR (legitimate interest in a working, secure library).

## 4. Data on our server (only when money is at stake)

| Data | Purpose | Legal basis | Retention |
|---|---|---|---|
| Email address (with "Sign in with Apple" possibly an address relayed by Apple), account ID, sign-in times | Account, sign-in, contact regarding appeals | Art. 6(1)(b) GDPR (contract) | until the account is deleted |
| Pledges: date, alarm time, amount, type of proof, result (made it/overslept/cancelled), times of confirmation, proof and result, payment status | Carrying out and settling the pledge | Art. 6(1)(b) GDPR | until the account is deleted; billing records see section 8 |
| Appeals: reason, time, decision | Handling your appeal | Art. 6(1)(b) GDPR | until the account is deleted |
| Stripe customer number and payment IDs | Matching payments | Art. 6(1)(b) GDPR | until the account is deleted |
| Technical logs (e.g. IP address, time of requests) | Operating and securing the server | Art. 6(1)(f) GDPR | usually a few days |

What does **not** go to the server: pledges of €0 (word of honor), photos, camera images, step data, barcodes, alarm settings.

### Automated decision (Art. 22 GDPR)

If you do not deliver a proof by the end of the grace period, or if the app does not report back within 2 hours after the alarm time, our server automatically rates the pledge as "overslept"; without an appeal, the reserved amount is charged after 24 hours. This automated decision is necessary for performing the contract (Art. 22(2)(a) GDPR). You can file an **appeal** in the app within 24 hours at any time; appeals are decided by a human. You can also express your point of view and contest the decision.

## 5. Services we use

### Supabase (server and account)
Supabase, Inc. (USA). A data processing agreement (Art. 28 GDPR) is in place with Supabase. Where data is transferred to countries outside the EU, this is based on the EU Standard Contractual Clauses.

### Stripe (payments)
Stripe Payments Europe, Ltd., 1 Grand Canal Street Lower, Grand Canal Dock, Dublin, D02 H210, Ireland. When you put money on an alarm, Stripe only **reserves** the amount on your payment method; it is charged only if you oversleep. You enter your card details directly with Stripe or via Apple Pay / Google Pay; **we never see your full card details**. Stripe processes, among other things, payment data, amount, email address, and device and connection data for fraud prevention. Stripe is itself responsible for part of this processing (e.g. fraud prevention, legal obligations). Legal basis: Art. 6(1)(b) GDPR; fraud prevention Art. 6(1)(f) GDPR. Privacy at Stripe: https://stripe.com/privacy

### Apple Pay / Google Pay
If you use Apple Pay or Google Pay, the privacy policies of Apple (https://www.apple.com/legal/privacy/) or Google (https://policies.google.com/privacy) also apply. We do not receive any card data from them.

### Sign in with Apple
On iPhone you can sign in with your Apple Account. We receive an identifier and an email address; if you choose "Hide My Email", only an address relayed by Apple. Provider: Apple Distribution International Ltd., Hollyhill Industrial Estate, Hollyhill, Cork, Ireland. Legal basis: Art. 6(1)(b) GDPR.

### Email delivery (Resend and Supabase)
We use Supabase's email delivery for sign-in links and the Resend service (Resend, Inc., USA) for notifications (e.g. about appeals). Email address and message content are processed. A data processing agreement is in place with Resend; the transfer to the USA is based on appropriate safeguards under Art. 46 GDPR (EU Standard Contractual Clauses).

### Hosting of this website (GitHub Pages)
This website (dolabst.de) is hosted on GitHub Pages (GitHub B.V., Netherlands / GitHub, Inc., USA). When you visit it, GitHub processes your IP address and technical data to deliver the page and protect it against abuse. Legal basis: Art. 6(1)(f) GDPR. Privacy at GitHub: https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement

### App Store / Google Play
When you download the app, Apple or Google process data under their own responsibility. We have no influence on this.

## 6. No tracking

We do not use any analytics, advertising or tracking services and do not create profiles for advertising purposes.

## 7. Deleting your account

You can delete your account in the app at any time (Settings → Account → Delete account). This deletes your account and all associated data on our server. While a pledge is still running, deletion is blocked so that it can be completed properly. You remove local data by deleting the app.

## 8. Statutory retention

Payments that were actually charged are business transactions. We keep the related billing records (at Stripe) in accordance with tax and commercial law (usually 8 or 10 years, § 147 AO, § 257 HGB), even if you delete your account. Legal basis: Art. 6(1)(c) GDPR.

## 9. Your rights

You have the right to
- access your stored data (Art. 15 GDPR),
- rectification (Art. 16 GDPR),
- erasure (Art. 17 GDPR),
- restriction of processing (Art. 18 GDPR),
- data portability (Art. 20 GDPR),
- object to processing based on legitimate interests (Art. 21 GDPR),
- withdraw consent with effect for the future (Art. 7(3) GDPR), e.g. phone permissions.

Just write to us at kontakt@dolabst.de.

## 10. Right to lodge a complaint

You can lodge a complaint with a data protection supervisory authority, e.g. the one responsible for us:
State Commissioner for Data Protection and Freedom of Information North Rhine-Westphalia, https://www.ldi.nrw.de

## 11. Minimum age

Money pledges are only possible from the age of 18. We do not knowingly collect data from children under 16.

## 12. Changes

If the app or the services used change, we will update this policy. The version published here applies.
