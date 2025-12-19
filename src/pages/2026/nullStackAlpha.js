import * as meta from '../../_data/meta.js';
export default async function () {
    return {
  id: "2026-nullstack-alpha",
  name: "nullStack Alpha",
  when: {
    start: "2026-04-16T14:00:00+01:00",
    end: "2026-04-16T15:30:00+01:00"
  },
  type: "sessions",
  url: "/2026/nullstack-alpha",
  registrationUrl: "https://events.ringcentral.com/events/nullstack-alpha-2026",
  speakerRegistrationUrl: "https://events.ringcentral.com/events/nullstack-alpha-2026/speakers",
  registrationWidgetId: "jnRRO1a1NaAslxvWaGqy1nG83",
  registrationIframeSrc: "https://registration.events.ringcentral.com/widgets/registration/nullstack-alpha",
  speakerSubmissionStart: "2026-01-15T00:00:00Z",
  speakerSubmissionEnd: "2026-03-31T23:59:59Z",
  sponsorUrl: `mailto:${meta.email}?subject=nullSTACK%20Alpha%202026%20Sponsorship`,
  description: "Virtual sessions and networking. Learn from others and connect with peers across the region.",
  duration: "3 hours",
  sessionCount: 5,
  timezone: "Europe/London",
  niceDatesTimes: {
    atlanta: "9:00 AM EDT",
    london: "2:00 PM BST",
    india: "6:30 PM IST",
    sydney: "11:00 PM AEST"
  },
  region: "EMEA",
  faqs: [
    {
      question: "How many sessions will there be?",
      answer: "We're planning 8-10 technical sessions covering various ServiceNow topics including development, architecture, and best practices. The final schedule will be announced closer to the event date."
    },
    {
      question: "Will sessions be recorded?",
      answer: "Yes! All sessions will be recorded and made available to registered attendees within 48 hours after the event."
    },
    {
      question: "Can I submit a session proposal?",
      answer: "Yes! We're accepting session proposals until March 31, 2026. Click the 'Submit a Session Proposal' button above to share your knowledge with the community."
    },
    {
      question: "What topics are you looking for?",
      answer: "We're interested in real-world implementations, lessons learned, technical deep-dives, and best practices. Both technical and process-oriented topics are welcome."
    },
    {
      question: "Is there a cost to attend?",
      answer: "No! All nullEDGE events are completely free, thanks to our generous sponsors."
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