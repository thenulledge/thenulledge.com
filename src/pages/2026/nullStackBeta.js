import * as meta from '../../_data/meta.js';
export default async function () {
  return {
    id: "2026-nullstack-beta",
    name: "nullSTACK Beta",
    when: {
      start: "2026-07-23T04:30:00-04:00",
      end: "2026-07-23T07:30:00-04:00"
    },
    type: "sessions",
    url: "/2026/nullstack-beta",
    registrationUrl: "https://events.ringcentral.com/events/nullstack-beta",
    speakerRegistrationUrl: "https://forms.office.com/Pages/ResponsePage.aspx?id=mveVCahapEaaoboD6HueK6O-tP9N2HBKraN2Rz16GXpURVVXVk5MU0lPRjUwVTFPTksxVEZBMjBLSS4u&r287d312e29d34ecca64b070a4a439b7b=%22nullSTACK%20Beta%22",
    speakerRegistrationIframeSrc: "https://forms.office.com/Pages/ResponsePage.aspx?id=mveVCahapEaaoboD6HueK6O-tP9N2HBKraN2Rz16GXpURVVXVk5MU0lPRjUwVTFPTksxVEZBMjBLSS4u&embed=true",
    speakerSubmissionStart: "2026-04-01T00:00:00Z",
    speakerSubmissionEnd: "2026-06-30T23:59:59Z",
    sponsorUrl: `mailto:${meta.email}?subject=Sponsor%20nullSTACK%20Beta%202026`,
    description: "Virtual sessions and networking. Discover insights from experts and expand your network.",
    duration: "3 hours",
    sessionCount: 5,
    timezone: "America/New_York",
    niceDatesTimes: {
      atlanta: "4:30 AM EDT",
      london: "9:30 AM BST",
      india: "2:00 PM IST",
      sydney: "6:30 PM AEST"
    },
    region: "APAC",
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
        answer: "Yes! We're accepting session proposals until June 30, 2026. Click the 'Submit a Session Proposal' button above to share your knowledge with the community."
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