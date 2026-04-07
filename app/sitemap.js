export default function sitemap() {
  const baseUrl = 'https://techverse.vercel.app';

  const topics = [
    'electricity','fan-motor','ac-fridge','mobile-calls','internet',
    'computer-language','chips','memory','lithography','websites',
    'ai-basic','llm','camera','video-audio','flights',
    'batteries','gps','bluetooth','wifi','satellites',
    'solar','touchscreens','speakers','evs','blockchain',
    '3d-printing','drones','rockets','cloud','cybersecurity',
    'search-engines','maps','nuclear','medical-imaging','trains',
  ];

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    ...topics.map(id => ({
      url: `${baseUrl}/#topic-${id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
  ];
}
