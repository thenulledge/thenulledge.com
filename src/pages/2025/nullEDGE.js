import * as meta from '../../_data/meta.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Parses a CSV line respecting quoted fields
 */
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current);
  return result;
}

/**
 * Parses a chat CSV file and returns an array of message objects
 */
function parseChatFile(filename) {
  if (!filename) {
    return [];
  }

  const chatDir = path.join(__dirname, 'chats');
  const filePath = path.join(chatDir, filename);
  
  if (!fs.existsSync(filePath)) {
    console.warn(`Chat file not found: ${filename}`);
    return [];
  }
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n').filter(line => line.trim());
    
    if (lines.length < 2) {
      return [];
    }
    
    // Parse header
    const headers = parseCSVLine(lines[0]);
    const timeIndex = headers.indexOf('Time');
    const firstNameIndex = headers.indexOf('First Name');
    const lastNameIndex = headers.indexOf('Last Name');
    const textIndex = headers.indexOf('Text');
    const linkedinIndex = headers.indexOf('Linkedin');
    
    // Parse messages
    const messages = [];
    for (let i = 1; i < lines.length; i++) {
      const fields = parseCSVLine(lines[i]);
      
      const text = fields[textIndex] || '';
      
      // Only add messages with text
      if (text && text.trim()) {
        messages.push({
          time: fields[timeIndex] || '',
          firstName: fields[firstNameIndex] || '',
          lastName: fields[lastNameIndex] || '',
          text: text,
          linkedin: fields[linkedinIndex] || ''
        });
      }
    }
    
    return messages;
  } catch (error) {
    console.error(`Error parsing chat file ${filename}:`, error);
    return [];
  }
}

export default async function () {
    return {
        id: "2025-nulledge",
        name: "nullEDGE",
        when: {
            start: "2025-10-17T09:00:00-04:00",
            end: "2025-10-17T17:00:00-04:00"
        },
        type: "full-day",
        url: "/2025/conference",
        registrationUrl: "https://events.ringcentral.com/events/nulledge",
        sponsorUrl: `mailto:${meta.email}?subject=nullEDGE%202025%20Sponsorship`,
        description: "The flagship nullEDGE conference returns for 2025. A full day of deep technical sessions, networking, and knowledge sharing for the global ServiceNow community.",
        duration: "8 hours",
        sessionCount: 37,
        timezone: "America/New_York",
        niceDatesTimes: {
            atlanta: "9:00 AM - 5:00 PM EDT",
            london: "2:00 PM - 10:00 PM BST",
            india: "6:30 PM - 2:30 AM IST",
            sydney: "12:00 AM - 8:00 AM AEDT"
        },
        faqs: [],
        featuredSpeakers: [
            {
                name: "Jace Benson",
                title: "Founder",
                company: "nullEDGE, AI In A Box",
                image: "/assets/images/speakers/jace-benson.jpg",
                bio: "I make the things I want to exist."
            }
        ],
        stats: {
            attendees: "1,000+",
            sessions: "37",
            sponsors: "13"
        },
        sponsors: [
            {
                "name": "AI In A Box",
                "website": "https://getaiinabox.com",
                "logo": "/expoBooths/aiinabox-logo.png"
            },
            {
                "name": "BizSolutions.Tech",
                "website": "https://BizSolutions.Tech",
                "logo": "/expoBooths/bizsolutionstech-logo.png"
            },
            {
                "name": "Kinetic Data",
                "website": "https://kineticdata.com/schedule-a-demo",
                "logo": "/expoBooths/kinetic_data_logo_square.webp"
            },
            {
                "name": "Apricot Jam Technologies",
                "website": "https://apricotjam.com/",
                "logo": "/expoBooths/apricot-jam-logo.jpg"
            },
            {
                "name": "CitrusFlows",
                "website": "https://www.citrusflows.com",
                "logo": "/expoBooths/citrisflows-logo.png"
            },
            {
                "name": "SNow Pro Consultants",
                "website": "https://snowproconsultants.com",
                "logo": "/expoBooths/snow_pro_consultants_logo.png"
            },
            {
                "name": "Genus Technologies",
                "website": "https://www.genustechnologies.com",
                "logo": "/expoBooths/genus.png"
            },
            {
                "name": "ShareLogic",
                "website": "https://sharelogic.com",
                "logo": "/expoBooths/ShareLogic-Logo.png"
            },
            {
                "name": "Serenity EHS",
                "website": "https://serenityehs.com",
                "logo": "/expoBooths/serenity.jpg"
            },
            {
                "name": "Echelon AI",
                "website": "https://www.echelonai.com",
                "logo": "/expoBooths/echelonai.png"
            },
            {
                "name": "ChecklistPRO",
                "website": "https://checklistpro.com",
                "logo": "/expoBooths/checklistpro.png"
            },
            {
                "name": "Intellective",
                "website": "https://www.intellective.com",
                "logo": "/expoBooths/intellective.png"
            },
            {
                "name": "CJ & The Duke",
                "website": "https://www.cjandtheduke.com",
                "logo": "/expoBooths/cjandtheduke.webp"
            }
        ],
        sessions: [
            {
                "id": "dU6JY136vTg",
                "duration": 15,
                "published": "2025-10-17T10:00:00-04:00",
                "title": "Opening Remarks",
                "speakers": ["Jace Benson", "Carleen Carter", "Justin Meadows", "Chuck Tomasi"],
                "chatFile": "Session 'Opening' chat.csv"
            },
            {
                "id": "R_CTelKp320",
                "duration": 30,
                "published": "2025-10-17T10:15:00-04:00",
                "title": "Showcasing Xplore",
                "speakers": ["James Neale"],
                "chatFile": "Session 'Showcasing Xplore' chat.csv"
            },
            {
                "id": "D26D5djayYI",
                "duration": 30,
                "published": "2025-10-17T10:15:00-04:00",
                "title": "Performance Tuning",
                "speakers": ["Pawan Kumar Singh"],
                "chatFile": "Session 'Servicenow Performance tuning' chat.csv"
            },
            {
                "id": "u5UN53t_LkM",
                "duration": 15,
                "published": "2025-10-17T10:45:00-04:00",
                "title": "Avoiding Data Migration Pitfalls",
                "speakers": ["Slava Savitsky"],
                "chatFile": "Session 'Data migration pitfalls and how to avoid them' chat.csv"
            },
            {
                "id": "IcoUhnoQoiY",
                "duration": 15,
                "published": "2025-10-17T10:45:00-04:00",
                "title": "Showcasing Health Sentinel",
                "speakers": ["Maik Skoddow"],
                "chatFile": "Session 'Showcasing HealthSentienal' chat.csv"
            },
            {
                "id": "NdZQxb_vtiI",
                "duration": 15,
                "published": "2025-10-17T11:00:00-04:00",
                "title": "Being a Good ServiceNow Dev",
                "speakers": ["Ekta Sharma"],
                "chatFile": "Session 'Being a Good ServiceNow Dev' chat.csv"
            },
            {
                "id": "jJPNIrXe4Lk",
                "duration": 20,
                "published": "2025-10-17T11:00:00-04:00",
                "title": "Turning Data into Trust: The Role of Data Certification",
                "speakers": ["Shreya Wani"],
                "chatFile": "Session 'Turning Data into Trust The Role of Data Certification' chat.csv"
            },
            {
                "id": "3860UkCIepg",
                "duration": 15,
                "published": "2025-10-17T11:15:00-04:00",
                "title": "2 Week Upgrades",
                "speakers": ["Chris Schuh"],
                "chatFile": "Session 'How to attach 2-Week Upgrades' chat.csv"
            },
            {
                "id": "xC_qxPKFJm8",
                "duration": 30,
                "published": "2025-10-17T11:30:00-04:00",
                "title": "Modern Web Development in ServiceNow",
                "speakers": ["Andrew Pischulin"],
                "chatFile": "Session 'Modern Web Development in ServiceNow' chat.csv"
            },
            {
                "id": "NM06lBC5Dxk",
                "duration": 30,
                "published": "2025-10-17T11:30:00-04:00",
                "title": "Showcasing SNUtils",
                "speakers": ["Arnoud Kooi"],
                "chatFile": "Session 'Showcasing SN Utils' chat.csv"
            },
            {
                "id": "uCsnTHfsDYE",
                "duration": 15,
                "published": "2025-10-17T12:00:00-04:00",
                "title": "Microsoft Graph API without IntegationHub",
                "speakers": ["Anvesh Kumar Mupparaju"],
                "chatFile": "Session 'Microsoft Graph API without IntegationHub' chat.csv"
            },
            {
                "id": "KD2TQNrABZk",
                "duration": 15,
                "published": "2025-10-17T12:00:00-04:00",
                "title": "ReleaseOps: Confident QC & Automated Releases in ServiceNow",
                "speakers": ["Robert Fedoruk"],
                "chatFile": "Session 'ReleaseOps Confident QC & Automated Releases in ServiceNow' chat.csv"
            },
            {
                "id": "CnILTeGW50g",
                "duration": 30,
                "published": "2025-10-17T12:15:00-04:00",
                "title": "How is CRM different from S2P and what features come from AI",
                "speakers": ["Shanma Negi"],
                "chatFile": "Session 'How is CRM different from S2P and what features come from AI' chat.csv"
            },
            {
                "id": "bqxEgz5gBh8",
                "duration": 30,
                "published": "2025-10-17T12:30:00-04:00",
                "title": "Best Practices for HRSD",
                "speakers": ["Sabrina Ethridge"],
                "chatFile": "Session 'Best Practices for HRSD' chat.csv"
            },
            {
                "id": "hhsr2rOCalE",
                "duration": 30,
                "published": "2025-10-17T12:30:00-04:00",
                "title": "A11y and Localization Features in NowAssist + Free Open Source Tool",
                "speakers": ["Alaina Beaver"],
                "chatFile": "Session 'A11y and I18n Features in NowAssist + Free Open Source Tool' chat.csv"
            },
            {
                "id": null,
                "duration": 60,
                "published": "2025-10-17T13:00:00-04:00",
                "title": "Networking",
                "speakers": ["You"],
                "chatFile": null
            },
            {
                "id": "CrVeL8kFZ7w",
                "duration": 15,
                "published": "2025-10-17T14:00:00-04:00",
                "title": "Jumpstart AI",
                "speakers": ["Mo Fagir"],
                "chatFile": "Session 'Jumpstart Your AI Journey with ServiceNow' chat.csv"
            },
            {
                "id": "0kEVWwlKvgY",
                "duration": 15,
                "published": "2025-10-17T14:00:00-04:00",
                "title": "Beating the Complexity of Approval Flows",
                "speakers": ["Jan Procházka"],
                "chatFile": "Session 'Beyond the approval policies tricks beating the complexity' chat.csv"
            },
            {
                "id": "EsIBWaqS7Z8",
                "duration": 15,
                "published": "2025-10-17T14:15:00-04:00",
                "title": "Why Foundational Data for AI",
                "speakers": ["Gregory Yuh"],
                "chatFile": "Session 'Foundational Data and why it matters for AI' chat.csv"
            },
            {
                "id": "BfHBHE81t-Q",
                "duration": 15,
                "published": "2025-10-17T14:15:00-04:00",
                "title": "The Silent Killer: How Poor Governance Breaks Your Platform",
                "speakers": ["Dr.Atul Grover"],
                "chatFile": "Session 'The Silent Killer How Poor Governance Breaks Your Platform' chat.csv"
            },
            {
                "id": "Ck1_O-9Nq5U",
                "duration": 15,
                "published": "2025-10-17T14:30:00-04:00",
                "title": "Showcasing SNDEVTOOLS",
                "speakers": ["Jai Babbar"],
                "chatFile": "Session 'Showcasing SNDEVTOOLS (npm)' chat.csv"
            },
            {
                "id": "e0ZyEY-Hfhg",
                "duration": 15,
                "published": "2025-10-17T14:30:00-04:00",
                "title": "Keeping ServiceNow platform healthy",
                "speakers": ["Swapna Abburi"],
                "chatFile": "Session 'Regular platform tuning and maintenance ensure optimal SN' chat.csv"
            },
            {
                "id": "EhwuEUeCmfc",
                "duration": 15,
                "published": "2025-10-17T14:45:00-04:00",
                "title": "Practical Technical Governance",
                "speakers": ["Jacques Clement"],
                "chatFile": "Session 'Practical Technical Governance' chat.csv"
            },
            {
                "id": "PqXMEEVELKY",
                "duration": 15,
                "published": "2025-10-17T14:45:00-04:00",
                "title": "Tracking AI Spend using Cloud Cost Management (CCM)",
                "speakers": ["Ian Cahall"],
                "chatFile": "Session 'Tracking AI Spend with Cloud Cost Management (CCM)' chat.csv"
            },
            {
                "id": "Sp0KbdMF2_c",
                "duration": 30,
                "published": "2025-10-17T15:00:00-04:00",
                "title": "Beyond the Basics: UI Builder Tricks for Workspace Customizations you're missing",
                "speakers": ["Jillian Howell"],
                "chatFile": "Session 'Beyond Basics UI Builder' chat.csv"
            },
            {
                "id": "F-YVb0CTnVU",
                "duration": 30,
                "published": "2025-10-17T15:00:00-04:00",
                "title": "ServiceNow Mobile App Builder: Use Cases and Workarounds for Input Form Screens",
                "speakers": ["Jean Emmanual"],
                "chatFile": "Session 'Mobile App Builder' chat.csv"
            },
            {
                "id": "Qu3qaekUWjs",
                "duration": 15,
                "published": "2025-10-17T15:30:00-04:00",
                "title": "ServiceNow Studio",
                "speakers": ["Ishaan Shoor"],
                "chatFile": "Session 'Showcasing the New SN Studio' chat.csv"
            },
            {
                "id": "1RQHPa23iR8",
                "duration": 15,
                "published": "2025-10-17T15:30:00-04:00",
                "title": "Creator Catalyst: Human Centered Design + Agile",
                "speakers": ["Michael Slabodnick"],
                "chatFile": "Session 'Creator Catalyst Human Centered Design + Agile' chat.csv"
            },
            {
                "id": "eVvCRg86hIo",
                "duration": 15,
                "published": "2025-10-17T15:30:00-04:00",
                "title": "Flexible Flows using Decision Builder and Dynamic Flow Launcher",
                "speakers": ["Dan Menter"],
                "chatFile": "Session 'Flow Templates + Dynamic Flows = Access Management' chat.csv"
            },
            {
                "id": "eAjt2FbS3j0",
                "duration": 15,
                "published": "2025-10-17T15:45:00-04:00",
                "title": "Freelancing to get your in on ServiceNow",
                "speakers": ["Mike Roberts"],
                "chatFile": "Session 'Freelancing' chat.csv"
            },
            {
                "id": "K8crp6Vlcpc",
                "duration": 15,
                "published": "2025-10-17T15:45:00-04:00",
                "title": "Better User Experience using AI",
                "speakers": ["Ritesh Dalal"],
                "chatFile": "Session 'Better UX & Design Using AI' chat.csv"
            },
            {
                "id": "knUqfCuOhkw",
                "duration": 15,
                "published": "2025-10-17T16:00:00-04:00",
                "title": "ServiceNow Protection Policies - Protecting Your Intellectual Property",
                "speakers": ["Ty Roach"],
                "chatFile": "Session 'ServiceNow Protection Policies - Protecting Your Intellectua' chat.csv"
            },
            {
                "id": "K4Dd1weTET0",
                "duration": 15,
                "published": "2025-10-17T16:00:00-04:00",
                "title": "5 Things I do to New Many to Many Tables",
                "speakers": ["Chuck Tomasi"],
                "chatFile": "Session '5 Things I do to New Many to Many Tables' chat.csv"
            },
            {
                "id": "H9cpET2csVs",
                "duration": 15,
                "published": "2025-10-17T16:15:00-04:00",
                "title": "Reporting using Platform Analytics with Rafael Cardoso",
                "speakers": ["Rafael Cardoso"],
                "chatFile": "Session 'Turn data into decisions, master Platform Analytics' chat.csv"
            },
            {
                "id": "Zws3iz84l6s",
                "duration": 15,
                "published": "2025-10-17T16:15:00-04:00",
                "title": "Pro-code Performance Missedsteaks & Omissons",
                "speakers": ["Tim Woodruff"],
                "chatFile": "Session 'Pro-code Performance Missedsteaks & Omissons' chat.csv"
            },
            {
                "id": "THlKFi5Gtgw",
                "duration": 15,
                "published": "2025-10-17T16:30:00-04:00",
                "title": "Fred's Final Business Rule",
                "speakers": ["Kevin Clark"],
                "chatFile": "Session 'Fred's Final Rule' chat.csv"
            },
            {
                "id": "G-wn7WYRYe8",
                "duration": 15,
                "published": "2025-10-17T16:30:00-04:00",
                "title": "From Chaos to Clarity Employee Center",
                "speakers": ["Sarah Toulson"],
                "chatFile": "Session 'Architecting Scalable Taxonomies for Employee Center' chat.csv"
            },
            {
                "id": "I3hwsT1tD48",
                "duration": 15,
                "published": "2025-10-17T16:45:00-04:00",
                "title": "Closing Remarks",
                "speakers": ["Jace Benson", "Carleen Carter", "Chuck Tomasi", "Jeff Jessie"],
                "chatFile": "Session 'Closing' chat.csv"
            }
        ].map(session => ({
            ...session,
            chatMessages: parseChatFile(session.chatFile)
        }))

    };
}