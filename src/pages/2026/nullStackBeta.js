import * as meta from '../../_data/meta.js';

export default async function () {
  return {
    id: "2026-nullstack-beta",
    name: "nullSTACK Beta",
    when: {
      start: "2026-07-23T14:00:00+05:30",
      end: "2026-07-23T17:00:00+05:30"
    },
    type: "sessions",
    url: "/2026/nullstack-beta",
    registrationUrl: "https://events.ringcentral.com/events/nullslice-india-2026",
    speakerRegistrationUrl: "https://events.ringcentral.com/events/nullslice-india-2026/speakers",
    speakerSubmissionStart: "2026-04-01T00:00:00Z",
    speakerSubmissionEnd: "2026-06-30T23:59:59Z",
    sponsorUrl: `mailto:${meta.email}?subject=nullSTACK%20Beta%202026%20Sponsorship`,
    description: "Virtual sessions and networking. Discover insights from experts and expand your network.",
    duration: "3 hours",
    sessionCount: 6,
    timezone: "Asia/Kolkata",
    niceDatesTimes: {
      atlanta: "4:30 AM EDT",
      london: "9:30 AM BST",
      india: "2:00 PM IST",
      sydney: "6:30 PM AEST"
    },
      featuredSpeakers: [
    {
      name: "Jace Benson",
      title: "Founder",
      company: "nullEDGE, AI In A Box",
      image: "/assets/images/speakers/jace-benson.jpg",
      bio: "I make the things I want to exist."
    }
  ],
    sponsors: [],
    sessions: []
  };
}