import * as meta from '../../_data/meta.js';
export default async function () {
    return {
  id: "2026-nullhub",
  name: "nullHUB",
  when: {
    start: "2026-02-05T15:00:00-05:00",
    end: "2026-02-05T16:30:00-05:00"
  },
  type: "networking",
  url: "/2026/nullhub",
  registrationUrl: "https://events.ringcentral.com/events/nullhub",
  speakerRegistrationUrl: null,
  speakerSubmissionStart: null,
  speakerSubmissionEnd: null,
  sponsorUrl: `mailto:${meta.email}?subject=Sponsor%20nullHUB%202026`,
  description: "Connect with peers, share experiences, and build lasting relationships.",
  duration: "90 minutes",
  sessionCount: 0,
  timezone: "America/New_York",
  niceDatesTimes: {
    atlanta: "3:00 PM EST",
    london: "8:00 PM GMT",
    india: "1:30 AM IST (next day)",
    sydney: "7:00 AM AEDT (next day)"
  },
  faqs: [
    {
      question: "Is this event really free?",
      answer: "Yes! nullHUB and all nullEDGE events are 100% free to attend. We're supported by community sponsors who believe in growing the ServiceNow ecosystem."
    },
    {
      question: "Do I need to prepare anything?",
      answer: "Just bring yourself and be ready to connect! This is a casual networking event with no formal presentations. Come with questions, experiences to share, or just curiosity about the community."
    },
    {
      question: "Will the event be recorded?",
      answer: "No, nullHUB is not recorded to encourage open and candid networking conversations. However, we'll share any resources or links discussed in the event."
    },
    {
      question: "What platform will you use?",
      answer: "We'll be using RingCentral Events with breakout rooms for smaller group discussions. You'll receive connection details after registering."
    },
    {
      question: "Can I invite colleagues?",
      answer: "Absolutely! The more the merrier. Share the registration link with anyone interested in the ServiceNow community."
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