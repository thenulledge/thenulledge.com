let emailSponsorSection = `--- SPONSOR INFO ---
Company name:
Company logo (attach or link):
Event to sponsor: [ ] nullSTACK Alpha (May) [ ] nullSTACK Beta (Aug) [ ] nullEDGE (Oct)
`;
let emailPaymentSection = `--- PAYMENT ---
[ ] I'll pay online at shop.thenulledge.com
[ ] I need an invoice

If invoice needed:
  Invoice recipient name:
  Invoice email:
`;



const items = [
  {
    "slug": "sponsor-minimum",
    "label": "Minimum",
    "order": 1,
    "email-subject": "Sponsor Inquiry: Minimum Sponsorship ($1,000)",
    "email-body": `Hi nullEDGE team!
I'm interested in the Minimum sponsorship package.

${emailSponsorSection}
${emailPaymentSection}

--- ANYTHING ELSE? ---
`
  },
  {
    "slug": "sponsor-premium",
    "label": "Premium",
    "order": 2,
    "bestValue": true,
    "email-subject": "Sponsor Inquiry: Premium Sponsorship ($2,000)",
    "email-body": `Hi nullEDGE team!

I'm interested in the Premium sponsorship package.

${emailSponsorSection}

--- 15-MIN SESSION ---
(If you know it, great! If not, we can work together to find a topic that fits your expertise and interests.)
Presenter name:
Presenter email:
Session title:

${emailPaymentSection}

--- ANYTHING ELSE? ---
`
  },
  {
    "slug": "sponsor-elite",
    "label": "Elite",
    "order": 3,
    "email-subject": "Sponsor Inquiry: Elite Sponsorship ($5,000)",
    "email-body": `Hi nullEDGE team!

I'm interested in the Elite sponsorship package.

${emailSponsorSection}

--- SESSION (YOUR TOPIC) ---
Presenter name:
Presenter email:
Session title:
Session description (2-3 sentences):

${emailPaymentSection}

--- ANYTHING ELSE? ---
`
  }
]

export default items;
