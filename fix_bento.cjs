const fs = require('fs');

let pageContent = fs.readFileSync('src/features/Event/Pages/EventDetailPage.tsx', 'utf8');

// The mentor bento row logic
const bentoMentorStr = `<BentoRow icon={<Sparkles className="text-amber-400"/>} label="Mentors">
                  {event.mentors?.length > 0 ? \`\${event.mentors.length}+ Expert Mentors\` : "Mentors TBA"}
                </BentoRow>`;

const bentoMentorReplacement = `{event.mentors && event.mentors.length > 0 && (
                <BentoRow icon={<Sparkles className="text-amber-400"/>} label="Mentors">
                  {event.mentors.length}+ Expert Mentors
                </BentoRow>
                )}`;

pageContent = pageContent.replace(bentoMentorStr, bentoMentorReplacement);

// There's a Team Size row that's hardcoded?
const teamSizeStr = `<BentoRow icon={<Users className="text-purple-400"/>} label="Team Size">
                  2 - 4 Members
                </BentoRow>`;
// If the API doesn't have a teamSize field, maybe we leave it or remove it?
// Usually, if it's hardcoded and shouldn't be, let's remove it because it's fake data.
pageContent = pageContent.replace(teamSizeStr, '');

fs.writeFileSync('src/features/Event/Pages/EventDetailPage.tsx', pageContent);
