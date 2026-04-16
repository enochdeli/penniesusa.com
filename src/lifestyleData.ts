export interface LifestyleItem {
  icon: string;
  label: string;
  value: string;
}

export interface CountryLifestyle {
  items: LifestyleItem[];
  culturalInsight: string;
}

export const LIFESTYLE_DATA: Record<string, CountryLifestyle> = {
  HTG: {
    items: [
      { icon: 'Home', label: 'Luxury Stay', value: 'Villa in Pétion-Ville' },
      { icon: 'Utensils', label: 'Fine Dining', value: 'Griot & Lobster Feast' },
      { icon: 'Plane', label: 'Travel', value: 'Private Beach Charter' },
      { icon: 'MapPin', label: 'Experience', value: 'Citadelle Private Tour' }
    ],
    culturalInsight: "In Haiti, wealth is often expressed through grand hospitality and private retreats in the cool hills of Pétion-Ville, away from the bustling capital."
  },
  JPY: {
    items: [
      { icon: 'Home', label: 'Luxury Stay', value: 'Ryokan with Private Onsen' },
      { icon: 'Utensils', label: 'Fine Dining', value: 'Michelin Omakase' },
      { icon: 'Plane', label: 'Travel', value: 'Shinkansen Green Car' },
      { icon: 'MapPin', label: 'Experience', value: 'Private Tea Ceremony' }
    ],
    culturalInsight: "Japanese luxury is defined by 'Omotenashi' (wholehearted hospitality) and 'Wabi-sabi' (finding beauty in imperfection). Millionaires often invest in exclusive access to centuries-old traditions like private tea ceremonies and seasonal kaiseki dining."
  },
  CHF: {
    items: [
      { icon: 'Home', label: 'Luxury Stay', value: 'Alpine Chalet in Zermatt' },
      { icon: 'Utensils', label: 'Fine Dining', value: 'Fondue in the Clouds' },
      { icon: 'Plane', label: 'Travel', value: 'Glacier Express First Class' },
      { icon: 'MapPin', label: 'Experience', value: 'Private Ski Instructor' }
    ],
    culturalInsight: "Swiss wealth is famously discreet. The 'Millionaire' lifestyle here focuses on privacy, precision, and a deep connection to the Alpine environment, often centered around high-end outdoor pursuits and world-class banking heritage."
  },
  INR: {
    items: [
      { icon: 'Home', label: 'Luxury Stay', value: 'Heritage Palace Suite' },
      { icon: 'Utensils', label: 'Fine Dining', value: 'Royal Thali Experience' },
      { icon: 'Plane', label: 'Travel', value: "Maharajas' Express" },
      { icon: 'MapPin', label: 'Experience', value: 'Taj Mahal Sunrise Tour' }
    ],
    culturalInsight: "Luxury in India is deeply rooted in its royal history. Millionaires often live like modern-day Maharajas, with a focus on grand celebrations, heritage architecture, and a large staff to provide personalized service."
  },
  BRL: {
    items: [
      { icon: 'Home', label: 'Luxury Stay', value: 'Copacabana Beachfront' },
      { icon: 'Utensils', label: 'Fine Dining', value: 'Churrascaria VIP Table' },
      { icon: 'Plane', label: 'Travel', value: 'Helicopter over Rio' },
      { icon: 'MapPin', label: 'Experience', value: 'Private Carnival Box' }
    ],
    culturalInsight: "Brazilian high-life is vibrant and social. Wealth is often showcased through exclusive access to Carnival, beachfront properties in Rio, and a lifestyle that prioritizes leisure, music, and social gatherings."
  },
  AED: {
    items: [
      { icon: 'Home', label: 'Luxury Stay', value: 'Burj Al Arab Suite' },
      { icon: 'Utensils', label: 'Fine Dining', value: 'Gold-leaf Dinner' },
      { icon: 'Plane', label: 'Travel', value: 'Supercar Rental' },
      { icon: 'MapPin', label: 'Experience', value: 'Private Desert Safari' }
    ],
    culturalInsight: "In the UAE, luxury is synonymous with the 'biggest and best.' The millionaire lifestyle is characterized by ultra-modern architecture, high-tech amenities, and a culture of opulence that blends traditional desert hospitality with global luxury brands."
  },
  THB: {
    items: [
      { icon: 'Home', label: 'Luxury Stay', value: 'Overwater Villa in Phuket' },
      { icon: 'Utensils', label: 'Fine Dining', value: 'Private Chef Thai Feast' },
      { icon: 'Plane', label: 'Travel', value: 'Private Yacht Charter' },
      { icon: 'MapPin', label: 'Experience', value: 'Elephant Sanctuary VIP' }
    ],
    culturalInsight: "Thai luxury focuses on 'Sanuk' (fun) and 'Sabai' (comfort). Millionaires enjoy a lifestyle of tropical relaxation, world-class wellness retreats, and a deep respect for traditional Thai arts and cuisine."
  },
  EUR: {
    items: [
      { icon: 'Home', label: 'Luxury Stay', value: 'Chateau in Loire Valley' },
      { icon: 'Utensils', label: 'Fine Dining', value: 'Parisian Gastronomy' },
      { icon: 'Plane', label: 'Travel', value: 'TGV First Class' },
      { icon: 'MapPin', label: 'Experience', value: 'Private Louvre Tour' }
    ],
    culturalInsight: "European luxury is steeped in history and 'Art de Vivre' (the art of living). Wealth is often expressed through the appreciation of fine arts, historical preservation, and a sophisticated culinary culture."
  },
  GBP: {
    items: [
      { icon: 'Home', label: 'Luxury Stay', value: 'London Townhouse' },
      { icon: 'Utensils', label: 'Fine Dining', value: 'Afternoon Tea at The Ritz' },
      { icon: 'Plane', label: 'Travel', value: 'Bentley Chauffeur' },
      { icon: 'MapPin', label: 'Experience', value: 'Tower of London Tour' }
    ],
    culturalInsight: "British luxury is defined by tradition, understatement, and 'The Season.' Millionaires often participate in historical social events, value heritage brands, and maintain a balance between city sophistication and country estate life."
  },
  USD: {
    items: [
      { icon: 'Home', label: 'Luxury Stay', value: 'Manhattan Penthouse' },
      { icon: 'Utensils', label: 'Fine Dining', value: "Chef's Table in NYC" },
      { icon: 'Plane', label: 'Travel', value: 'Private Jet (Domestic)' },
      { icon: 'MapPin', label: 'Experience', value: 'VIP Broadway Access' }
    ],
    culturalInsight: "American luxury is often about convenience, scale, and 'The American Dream.' The millionaire lifestyle here is diverse, ranging from high-tech Silicon Valley minimalism to the classic opulence of New York City's Upper East Side."
  },
  MXN: {
    items: [
      { icon: 'Home', label: 'Luxury Stay', value: 'Tulum Beachfront Villa' },
      { icon: 'Utensils', label: 'Fine Dining', value: 'Gourmet Taco Tasting' },
      { icon: 'Plane', label: 'Travel', value: 'Private Cenote Tour' },
      { icon: 'MapPin', label: 'Experience', value: 'Chichen Itza VIP Access' }
    ],
    culturalInsight: "Mexican luxury blends vibrant colors, ancient history, and modern design. Wealthy individuals often invest in 'Haciendas,' value family-centric gatherings, and enjoy a lifestyle that celebrates Mexico's rich culinary and artistic heritage."
  },
  IDR: {
    items: [
      { icon: 'Home', label: 'Luxury Stay', value: 'Ubud Jungle Villa' },
      { icon: 'Utensils', label: 'Fine Dining', value: 'Balinese Royal Feast' },
      { icon: 'Plane', label: 'Travel', value: 'Private Island Hopping' },
      { icon: 'MapPin', label: 'Experience', value: 'Sunrise Volcano Trek' }
    ],
    culturalInsight: "Indonesian luxury, especially in Bali, is centered around spiritual well-being and nature. The millionaire lifestyle often involves stunning eco-luxury villas, private island escapes, and a deep appreciation for local craftsmanship."
  },
  EGP: {
    items: [
      { icon: 'Home', label: 'Luxury Stay', value: 'Nile View Suite' },
      { icon: 'Utensils', label: 'Fine Dining', value: 'Dinner by the Pyramids' },
      { icon: 'Plane', label: 'Travel', value: 'Private Felucca Cruise' },
      { icon: 'MapPin', label: 'Experience', value: 'Valley of Kings VIP' }
    ],
    culturalInsight: "Egyptian luxury is inextricably linked to its 5,000-year history. Millionaires often enjoy private access to ancient sites, Nile-side mansions, and a culture that values grand gestures and historical legacy."
  },
  ZAR: {
    items: [
      { icon: 'Home', label: 'Luxury Stay', value: 'Safari Lodge Suite' },
      { icon: 'Utensils', label: 'Fine Dining', value: 'Cape Winelands Lunch' },
      { icon: 'Plane', label: 'Travel', value: 'Blue Train Journey' },
      { icon: 'MapPin', label: 'Experience', value: 'Private Game Drive' }
    ],
    culturalInsight: "South African luxury is defined by 'The Great Outdoors' and world-class wildlife experiences. The millionaire lifestyle often revolves around private game reserves, the sophisticated wine culture of the Cape, and stunning coastal estates."
  },
  AUD: {
    items: [
      { icon: 'Home', label: 'Luxury Stay', value: 'Sydney Harbour View' },
      { icon: 'Utensils', label: 'Fine Dining', value: 'Opera House Dinner' },
      { icon: 'Plane', label: 'Travel', value: 'Great Barrier Reef Heli' },
      { icon: 'MapPin', label: 'Experience', value: 'Private Outback Tour' }
    ],
    culturalInsight: "Australian luxury is relaxed but high-end. Wealth is often expressed through 'barefoot luxury'—exclusive access to remote natural wonders, stunning waterfront properties, and a culture that values work-life balance and outdoor adventure."
  },
  CAD: {
    items: [
      { icon: 'Home', label: 'Luxury Stay', value: 'Banff Mountain Lodge' },
      { icon: 'Utensils', label: 'Fine Dining', value: 'Maple Syrup Gastronomy' },
      { icon: 'Plane', label: 'Travel', value: 'Rocky Mountaineer VIP' },
      { icon: 'MapPin', label: 'Experience', value: 'Niagara Falls Private Heli' }
    ],
    culturalInsight: "Canadian luxury is about space, wilderness, and seasonal living. Millionaires often value privacy in remote mountain retreats, high-end winter sports access, and a lifestyle that celebrates Canada's vast and diverse natural landscape."
  },
  CNY: {
    items: [
      { icon: 'Home', label: 'Luxury Stay', value: 'Shanghai Skyline Suite' },
      { icon: 'Utensils', label: 'Fine Dining', value: 'Peking Duck Banquet' },
      { icon: 'Plane', label: 'Travel', value: 'Maglev First Class' },
      { icon: 'MapPin', label: 'Experience', value: 'Great Wall Private Tour' }
    ],
    culturalInsight: "Chinese luxury is a blend of ancient tradition and rapid modernization. Wealth is often expressed through 'Mianzi' (face/prestige), with a focus on high-end technology, luxury brands, and exclusive access to historical landmarks."
  },
  SGD: {
    items: [
      { icon: 'Home', label: 'Luxury Stay', value: 'Marina Bay Sands Suite' },
      { icon: 'Utensils', label: 'Fine Dining', value: 'Michelin Hawker Feast' },
      { icon: 'Plane', label: 'Travel', value: 'Private Yacht Charter' },
      { icon: 'MapPin', label: 'Experience', value: 'Gardens by the Bay VIP' }
    ],
    culturalInsight: "Singaporean luxury is efficient, clean, and cosmopolitan. The millionaire lifestyle is characterized by high-rise living, world-class dining, and a culture that values order, innovation, and global connectivity."
  },
  HKD: {
    items: [
      { icon: 'Home', label: 'Luxury Stay', value: 'Victoria Harbour View' },
      { icon: 'Utensils', label: 'Fine Dining', value: 'Dim Sum Banquet' },
      { icon: 'Plane', label: 'Travel', value: 'Helicopter over Island' },
      { icon: 'MapPin', label: 'Experience', value: 'Private Peak Tram Access' }
    ],
    culturalInsight: "Hong Kong luxury is vertical and high-paced. Wealth is often showcased through prestigious addresses on 'The Peak,' exclusive club memberships, and a lifestyle that thrives on the city's energy and global financial status."
  },
  TRY: {
    items: [
      { icon: 'Home', label: 'Luxury Stay', value: 'Bosphorus Mansion' },
      { icon: 'Utensils', label: 'Fine Dining', value: 'Ottoman Palace Dinner' },
      { icon: 'Plane', label: 'Travel', value: 'Cappadocia Hot Air Balloon' },
      { icon: 'MapPin', label: 'Experience', value: 'Private Hamam Ritual' }
    ],
    culturalInsight: "Turkish luxury is where East meets West. The millionaire lifestyle often involves historical Bosphorus mansions, a deep appreciation for Ottoman-era arts and cuisine, and a culture of warm, grand-scale hospitality."
  }
};

export const DEFAULT_LIFESTYLE: CountryLifestyle = {
  items: [
    { icon: 'Home', label: 'Luxury Stay', value: 'Penthouse Suites' },
    { icon: 'Utensils', label: 'Fine Dining', value: 'Private Chef' },
    { icon: 'Plane', label: 'Travel', value: 'First Class' },
    { icon: 'MapPin', label: 'Experience', value: 'Elite Access' }
  ],
  culturalInsight: "Luxury is a universal language, but every culture speaks it with a unique accent. Explore the world and discover how wealth transforms into a unique art of living."
};

export function getLifestyleData(currencyCode: string): CountryLifestyle {
  return LIFESTYLE_DATA[currencyCode] || DEFAULT_LIFESTYLE;
}
