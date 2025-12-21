/**
 * Shuffles array in place using Fisher-Yates algorithm
 * @param {Array} array - The array to shuffle
 * @returns {Array} The shuffled array
 */
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const testimonials = [
  {
    name: 'Ty Roach',
    avatarImage: "/assets/images/speakers/ty-roach.jpg",
    quote: '344 people online 8 minutes in...awesome!',
    link: 'https://thenulledge.com/2025/conference/#event-chat',
  },
  {
    name: 'Gregory Yuh',
    avatarImage: "/assets/images/speakers/gregory-yuh.jpg",
    quote: 'Great format and speed dating kept the conversation on point',
    link: 'https://thenulledge.com/2025/conference/#event-chat',
  },
  {
    name: 'Michael Slabodnick',
    avatarImage: "/assets/images/testimonials/michael-slabodnick.jpeg",
    quote: 'Hey Jace! Love the Zurich shirt!!!',
    link: 'https://thenulledge.com/2025/conference/closing-remarks/#event-chat',
  },
  {
    name: 'Kalisha Moore',
    avatarImage: "/assets/images/testimonials/kalisha-moore.jpeg",
    quote: 'Awesome content like always!',
    link: 'https://thenulledge.com/2025/conference/5-things-i-do-to-new-many-to-many-tables/#event-chat',
  },
  {
    name: 'Casey Ferguson',
    avatarImage: "/assets/images/testimonials/casey-ferguson.jpeg",
    quote: 'Jace Benson the format, parallel chat, and pacing is perfect',
    link: 'https://thenulledge.com/2025/conference/#event-chat',
  },
  {
    name: 'Brad Hicks',
    avatarImage: "/assets/images/testimonials/brad-hicks.jpeg",
    quote: 'definitely recommend doing this again. This is extremely helpful! Thank you to everyone who made this happen.',
    link: 'https://thenulledge.com/2025/conference/closing-remarks/#event-chat',
  },
  {
    name: 'James Chang',
    quote: 'Really appreciate everyone who organized this great event!',
    link: 'https://thenulledge.com/2025/conference/#event-chat',
  },
  {
    name: 'Simone Williams',
    quote: 'Hello! Just want to say glad to be able to have access and experience this. Thanks to everyone for putting this together!',
    link: 'https://thenulledge.com/2025/conference/#event-chat',
  },
  {
    name: 'Sharon VanLuyn-Prater',
    avatarImage: "/assets/images/testimonials/Sharon-Van-Luyn-Prater.jpeg",
    quote: 'THANK YOU to all the presenters! What a great event...fast paced and FUN',
    link: 'https://thenulledge.com/2025/conference/closing-remarks/#event-chat',
  },
  {
    name: 'Jeff Jessie',
    avatarImage: "/assets/images/contributors/jeff-jessie.jpeg",
    quote: 'Networking has been awesome.',
    link: 'https://thenulledge.com/2025/conference/#event-chat',
  },
  {
    name: 'Naz Ashrafi',
    avatarImage: "/assets/images/testimonials/naz-ashrafi.jpg",
    quote: "Idek what this conference is about but I'm excited for you 😁🙌🙌",
    link: 'https://x.com/nazanin_ashrafi/status/1957500371108262325'
  },
  {
    name: "Kevin Clark",
    avatarImage: "/assets/images/testimonials/kevin-clark.jpeg",
    quote: "Year one nullEDGE attendance = 5% of a Knowledge… what growth curve will we see in future years?",
    link: 'https://www.linkedin.com/feed/update/urn:li:activity:7387614835640999936/?commentUrn=urn%3Ali%3Acomment%3A%28activity%3A7387614835640999936%2C7387666455959494656%29&dashCommentUrn=urn%3Ali%3Afsd_comment%3A%287387666455959494656%2Curn%3Ali%3Aactivity%3A7387614835640999936%29',
  },
  {
    name: "Jan Rijk",
    avatarImage: "/assets/images/testimonials/jan-rijk.jpeg",
    quote: `Today I attended the very first edition of NullEdge, a fantastic online community conference packed with insightful knowledge sessions covering a wide range of ServiceNow topics and perspectives. The event was organized by Jace Benson, with support from Chuck Tomasi, Carleen Carter, and Justin Meadows. 

While I took away valuable insights from many sessions, a few definitely stood out and left me wanting to explore their topics in more depth. I’m thinking in particular of James Neale’s session on Xplore, Chris Schuh - The ServiceNow Magician on 2-Week Upgrades, Arnoud Kooi on SN Utils, Jillian Howell on UI Builder, and Chuck Tomasi on Many-to-Many Tables.

There were a few minor technical hiccups here and there, and with so many great sessions running in parallel, choosing between them wasn’t always easy. Fortunately, all session recordings will be available later on the Nulledge YouTube channel (https://lnkd.in/eug-SAxM).

All in all, it was a highly valuable and inspiring evening. Many thanks to the organizers and speakers, I’m already looking forward to the next edition!`,
    link: "https://www.linkedin.com/posts/janrijk_today-i-attended-the-very-first-edition-of-activity-7385058126267363329-gzX8?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAGfKkYB3XFd0Ybegy4h2swmWmxgXj4HMN0"
  },
  {
    name: "Robert Fedoruk",
    avatarImage: "/assets/images/testimonials/robert-fedoruk.jpeg",
    quote: `If you weren’t lucky enough to attend the hashtag#servicenow nullEDGE conference, here’s the ultra fast 15 min demo of hashtag#ReleaseOps Jace asked me to do.

There’s SO much more to show. Hope you’re as excited about this feature as I am.

https://lnkd.in/gT-aZnxC`,
    link: "https://www.linkedin.com/posts/rfedoruk_releaseops-confident-qc-automated-releases-activity-7389300067968479233-IEoY?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAGfKkYB3XFd0Ybegy4h2swmWmxgXj4HMN0"
  },
  {
    name: "Cory Wesley",
    avatarImage: "/assets/images/testimonials/cory-wesley.jpeg",
    quote: `If you missed some of the hashtag#nullEDGE 2025 sessions like I did, you're in luck! Jace and crew have archived them all so you can catch up on all the sessions you missed! This is amazing work. Full Stop. I appreciate the ludicrous levels of time, effort, and dedication the team put into pulling this conference off, archiving it all for easy access, and bringing the community together. Well Done. 👏🏾🙌🏾 hashtag#ServiceNow hashtag#ServiceNowCommunity`,
    link: "https://www.linkedin.com/posts/cjwesley_nulledge-2025-retrospective-heres-all-activity-7388631241618731009-Lx9_?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAGfKkYB3XFd0Ybegy4h2swmWmxgXj4HMN0"
  },
  {
    name: "Simen Staaby Knudsen",
    avatarImage: "/assets/images/testimonials/simen-staaby-knedsen.jpeg",
    quote: `The nullEDGE conference is all about the tech side of ServiceNow - created by the community, not a marketing team.
The recordings just dropped, and they're packed with great insights. Definitely worth a watch! 🚀
https://lnkd.in/d4JzixGt`,
    link: "https://www.linkedin.com/posts/simen-staaby-knudsen-6715691b2_nulledge-activity-7388463135424282624-WwXl?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAGfKkYB3XFd0Ybegy4h2swmWmxgXj4HMN0"
  },
  {
    name: "Robert Fedoruk",
    avatarImage: "/assets/images/testimonials/robert-fedoruk.jpeg",
    quote: `I was there at the beginning. As good as today's hashtag#ServiceNow Knowledge conferences are (and they're amazing). There was a magic to the earliest ones. A sense that we were all building the ecosystem together. Nobody could read the future, but we all felt the vibe... the possibility of what could be. Peers sharing insights.

Jace Benson & his crew REALLY captured that with The nullEDGE conference.`,
    link: "https://www.linkedin.com/posts/rfedoruk_the-nulledge-conference-last-week-still-has-activity-7387093143072038913--bms?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAGfKkYB3XFd0Ybegy4h2swmWmxgXj4HMN0"
  },
  {
    name: "Robert Fedoruk",
    avatarImage: "/assets/images/testimonials/robert-fedoruk.jpeg",
    quote: "It's a whose who and then some of people who've always got valuable stuff to say.",
    link: "https://www.cjandtheduke.com/podcast/episode/1dfcf540/have-you-heard-of-the-servicenow-nulledge-conference"
  },
  {
    name: "Brian Rowland",
    avatarImage: "/assets/images/testimonials/brian-rowland.jpeg",
    quote: "The speakers and content were fantastic.  The organizers are awesome!",
    profile: "https://www.linkedin.com/in/brian-rowland-7151168/",
  },
  {
    name: "Nelu Tomsa",
    avatarImage: "/assets/images/testimonials/nelu-tomsa.jpeg",
    quote: "Everything was very well organized and the information was delivered in a very friendly manner, which was pleasant to see/hear.",
    profile: "https://www.linkedin.com/in/nelutomsa/",
  },
  {
    name: "Chuck Tomasi",
    avatarImage: "/assets/images/speakers/chuck-tomasi.jpg",
    quote: "The People"
  },
  {
    name: "Arnoud Kooi",
    avatarImage: "/assets/images/speakers/arnoud-kooi.jpg",
    quote: "Kudos for pulling this off, and actually doin it!"
  },
  {
    name: "Shauna Kenyon",
    avatarImage: "/assets/images/testimonials/shauna-kenyon.jpeg",
    quote: "Loved the short snippets of content and the networking opportunities. It was small enough to allow for interaction but still had the big names of DEVS throughout ServiceNow. "
  },
  {
    name: "Kevin Clark",
    avatarImage: "/assets/images/testimonials/kevin-clark.jpeg",
    quote: "super enthusiastic participants, amazing collection of content - best of the best."
  },
  {
    name: "James Neale",
    avatarImage: "/assets/images/speakers/james-neale.jpg",
    quote: "Great event!"
  },
  {
    name: "Revm Flythe",
    quote: "The concept is good, and the program is useful. Productive. Smart."
  },
  {
    name: "Trey Carroll",
    avatarImage: "/assets/images/testimonials/trey-carroll.jpeg",
    quote: "The freedom of the presenters to candidly say what they really thought.  The absence of the deluge of marketing information.  The actual focus on development.   The real-world applicability of the content"
  },
  {
    name: "Robert Fedoruk",
    avatarImage: "/assets/images/testimonials/robert-fedoruk.jpeg",
    quote: "Loved the interface and the chat.  In the future it would be awesome if sessions could be longer.  You'd have to make some sessions simultaneous, but I think the payoff is worth it."
  },
  {
    name: "Martin Reintgen",
    avatarImage: "/assets/images/testimonials/martin-reintgen.jpeg",
    quote: "Many different sessions for very different topics"
  },
  {
    name: "Chad Hayes",
    avatarImage: "/assets/images/testimonials/chad-hayes.jpeg",
    quote: "Everything."
  },
  {
    name: "Eli Makovetski",
    avatarImage: "/assets/images/testimonials/eli-makovetsky.jpeg",
    quote: "It was amazing!"
  },
  {
    name: "Mary Ann	Erskine Pourier",
    avatarImage: "/assets/images/testimonials/mary-ann-erskine-pourier.jpeg",
    quote: "The technical information shared."
  },
  {
    name: "Janet Pennel",
    avatarImage: "/assets/images/testimonials/janet-pennel.jpeg",
    quote: "Loved the sense of community! "
  },
  {
    name: "Queen Onyebuchi-Akunne",
    avatarImage: "/assets/images/testimonials/queen-onyebuchi-akunne.jpeg",
    quote: "The team"
  },
  {
    name: "Kevin Byrne",
    avatarImage: "/assets/images/testimonials/kevin-byrne.jpeg",
    quote: "I liked the published schedule so that I could pick the topics most relevant to my needs. I also liked the quality of the content. Well done!"
  },
  {
    name: "Vijay Reddy",
    quote: "Organised well and Neetworking is good"
  },
  {
    name: "Craig Talbert",
    avatarImage: "/assets/images/testimonials/craig-talbert.jpeg",
    quote: "Good timing and good platform."
  },
  {
    name: "brandon chung",
    quote: "very good informational presentation."
  },
  {
    name: "Pavel Mishev",
    avatarImage: "/assets/images/testimonials/pavel-mishev.jpeg",
    quote: "15 mins sessions - short, but useful enough. The vibe as well"
  },
  {
    name: "Viviane Brasil Roseira",
    avatarImage: "/assets/images/testimonials/viviane-brasil-roseira.jpeg",
    quote: "The demos and the technical tips, recommendations about practices, are really great!"
  }
];

export default shuffleArray(testimonials);
