import * as meta from '../../_data/meta.js';
export default async function () {
  return {
    id: "2026-nulledge",
    name: "nullEDGE",
    when: {
      start: "2026-10-16T09:00:00-04:00",
      end: "2026-10-16T17:00:00-04:00"
    },
    type: "full-day",
    url: "/2026/conference",
    registrationUrl: "https://events.ringcentral.com/events/nulledge-2026-10-17",
    speakerRegistrationUrl: "https://forms.office.com/Pages/ResponsePage.aspx?id=mveVCahapEaaoboD6HueK6O-tP9N2HBKraN2Rz16GXpURVVXVk5MU0lPRjUwVTFPTksxVEZBMjBLSS4u&r287d312e29d34ecca64b070a4a439b7b=%22nullEDGE%22",
    speakerRegistrationIframeSrc: "https://forms.office.com/Pages/ResponsePage.aspx?id=mveVCahapEaaoboD6HueK6O-tP9N2HBKraN2Rz16GXpURVVXVk5MU0lPRjUwVTFPTksxVEZBMjBLSS4u&embed=true",
    speakerSubmissionStart: "2026-02-01T00:00:00-05:00",
    speakerSubmissionEnd: "2026-08-31T23:59:59-04:00",
    sponsorUrl: `mailto:${meta.email}?subject=Sponsor%20nullEDGE%202026`,
    description: "The flagship nullEDGE conference returns for 2026. A full day of technical sessions, networking, and sharing.",
    duration: "8 hours",
    sessionCount: 40,
    timezone: "America/New_York",
  niceDatesTimes: {
    atlanta: "9:00 AM - 5:00 PM EDT",
    london: "2:00 PM - 10:00 PM BST",
    india: "6:30 PM - 2:30 AM IST",
    sydney: "12:00 AM - 8:00 AM AEDT"
  },
  faqs: [
    {
      question: "What makes nullEDGE different from other ServiceNow conferences?",
      answer: "nullEDGE is 100% free, community-driven, and focused on education over promotion. We feature real-world implementations and lessons learned rather than product pitches. Our speakers are folks sharing their actual experiences."
    },
    {
      question: "Will sessions be recorded?",
      answer: "Yes! All sessions will be recorded and made available to registered attendees. You'll be able to catch up on any sessions you missed or rewatch your favorites."
    },
    {
      question: "How do I become a speaker?",
      answer: "We'll open our Call for Papers in February 2026. Watch this space or follow us on social media for the announcement. We welcome both first-time and experienced speakers."
    },
    {
      question: "Can my company sponsor nullEDGE?",
      answer: "Yes! We'd love to talk about sponsorship opportunities. Reach out via the 'Become a Sponsor' button to learn more about how your organization can support the community."
    },
    {
      question: "What time zone is the event in?",
      answer: "The main conference is scheduled in Eastern Time (EDT) to maximize attendance from North America and Europe. Check the timezone display above to see what time it will be in your region."
    },
    {
      question: "Is there networking time?",
      answer: "Absolutely! We'll have dedicated networking sessions, breakout rooms between talks, and a virtual expo hall where you can connect with sponsors and fellow attendees."
    }
  ],
    featuredSpeakers: [
    {
      name: "Jace Benson",
      title: "Founder",
      company: "nullEDGE, AI In A Box",
      image: "/assets/images/speakers/jace-benson.jpg",
      bio: "I make the things I want to exist."
    }
  ],
  stats: {},
  sponsors: [],
  sessions: []
  };
}