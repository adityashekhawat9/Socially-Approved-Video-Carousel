const mongoose = require('mongoose');
const Video = require('../models/Video');
require('dotenv').config();

const videosData = [
  {
    title: "Amazing Sunset at Beach",
    description: "Watch the most beautiful sunset captured in 4K. Perfect evening vibes with relaxing music.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Sunset+1",
    duration: 180,
    likes: 1523,
    shares: 234,
    creator: "Travel Vlogger",
    uploadedAt: new Date("2024-01-15")
  },
  {
    title: "Urban Street Photography",
    description: "Exploring the vibrant streets of the city at night. Beautiful lights and architecture.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Urban+1",
    duration: 220,
    likes: 892,
    shares: 156,
    creator: "Photography Pro",
    uploadedAt: new Date("2024-01-16")
  },
  {
    title: "Mountain Hiking Adventure",
    description: "Epic hiking journey through mountain trails. Stunning views and wildlife encounters.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Mountain+1",
    duration: 450,
    likes: 2341,
    shares: 523,
    creator: "Adventure Seeker",
    uploadedAt: new Date("2024-01-17")
  },
  {
    title: "Delicious Food Preparation",
    description: "Learn how to prepare this amazing dish in just 15 minutes. Easy and tasty!",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Food+1",
    duration: 900,
    likes: 3456,
    shares: 789,
    creator: "Chef Master",
    uploadedAt: new Date("2024-01-18")
  },
  {
    title: "Ocean Waves and Marine Life",
    description: "Underwater documentary featuring colorful fish and coral reefs. Peaceful and relaxing.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Ocean+1",
    duration: 600,
    likes: 1876,
    shares: 342,
    creator: "Ocean Explorer",
    uploadedAt: new Date("2024-01-19")
  },
  {
    title: "Fitness Workout Routine",
    description: "Full body workout at home. No equipment needed. 30 minutes daily challenge.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Fitness+1",
    duration: 1800,
    likes: 2987,
    shares: 654,
    creator: "Fitness Coach",
    uploadedAt: new Date("2024-01-20")
  },
  {
    title: "Musical Performance Live",
    description: "Amazing live performance of original music. Raw and emotional vocals.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Music+1",
    duration: 300,
    likes: 4123,
    shares: 912,
    creator: "Musician",
    uploadedAt: new Date("2024-01-21")
  },
  {
    title: "Pet Moments Compilation",
    description: "Cute and funny moments with pets. Guaranteed to make you smile!",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Pets+1",
    duration: 240,
    likes: 5234,
    shares: 1203,
    creator: "Pet Lover",
    uploadedAt: new Date("2024-01-22")
  },
  {
    title: "Tech Gadget Review",
    description: "Unboxing and reviewing the latest tech gadgets. Pros and cons explained.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Tech+1",
    duration: 1200,
    likes: 1654,
    shares: 423,
    creator: "Tech Reviewer",
    uploadedAt: new Date("2024-01-23")
  },
  {
    title: "Travel Guide to Paris",
    description: "Complete travel guide to Paris. Tips, tricks, and must-visit places.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Paris+1",
    duration: 1500,
    likes: 2876,
    shares: 756,
    creator: "Travel Guide",
    uploadedAt: new Date("2024-01-24")
  },
  {
    title: "DIY Home Improvement",
    description: "Transform your home with these simple DIY tips. Budget-friendly solutions.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=DIY+1",
    duration: 1800,
    likes: 1432,
    shares: 312,
    creator: "DIY Expert",
    uploadedAt: new Date("2024-01-25")
  },
  {
    title: "Fashion Style Tips",
    description: "Learn fashion styling tips from a professional stylist. Mix and match guide.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Fashion+1",
    duration: 480,
    likes: 3214,
    shares: 645,
    creator: "Fashion Expert",
    uploadedAt: new Date("2024-01-26")
  },
  {
    title: "Gardening Tips and Tricks",
    description: "Learn how to grow vegetables and flowers in your garden. Beginner friendly.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Garden+1",
    duration: 900,
    likes: 876,
    shares: 234,
    creator: "Gardener",
    uploadedAt: new Date("2024-01-27")
  },
  {
    title: "Car Racing Documentary",
    description: "Behind the scenes of professional car racing. Speed and adrenaline.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Racing+1",
    duration: 1200,
    likes: 2345,
    shares: 567,
    creator: "Auto Enthusiast",
    uploadedAt: new Date("2024-01-28")
  },
  {
    title: "Meditation and Mindfulness",
    description: "Guided meditation for stress relief and inner peace. 20 minutes session.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Meditation+1",
    duration: 1200,
    likes: 1987,
    shares: 456,
    creator: "Wellness Coach",
    uploadedAt: new Date("2024-01-29")
  },
  {
    title: "Photography Editing Tutorial",
    description: "Complete guide to editing photos using Lightroom and Photoshop.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Edit+1",
    duration: 1500,
    likes: 1543,
    shares: 389,
    creator: "Photo Editor",
    uploadedAt: new Date("2024-01-30")
  },
  {
    title: "Gaming Stream Highlights",
    description: "Best moments from gaming streams. Epic plays and fails.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Gaming+1",
    duration: 900,
    likes: 3876,
    shares: 923,
    creator: "Gamer Pro",
    uploadedAt: new Date("2024-01-31")
  },
  {
    title: "Language Learning Course",
    description: "Learn Spanish basics in 30 minutes. Pronunciation and vocabulary.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Language+1",
    duration: 1800,
    likes: 876,
    shares: 234,
    creator: "Language Teacher",
    uploadedAt: new Date("2024-02-01")
  },
  {
    title: "Business Startup Tips",
    description: "Expert advice for starting a business. Marketing and sales strategies.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Business+1",
    duration: 2100,
    likes: 2123,
    shares: 567,
    creator: "Entrepreneur",
    uploadedAt: new Date("2024-02-02")
  },
  {
    title: "Nature Documentary",
    description: "Explore the wonders of nature. Wildlife and natural landscapes.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Nature+1",
    duration: 1500,
    likes: 4321,
    shares: 1023,
    creator: "Nature Doc",
    uploadedAt: new Date("2024-02-03")
  },
  {
    title: "Home Yoga Session",
    description: "Relaxing yoga practice for flexibility and strength. 45 minutes.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Yoga+1",
    duration: 2700,
    likes: 1654,
    shares: 412,
    creator: "Yoga Instructor",
    uploadedAt: new Date("2024-02-04")
  },
  {
    title: "Coffee Making Tutorial",
    description: "Learn to make the perfect espresso and cappuccino at home.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Coffee+1",
    duration: 600,
    likes: 987,
    shares: 256,
    creator: "Barista",
    uploadedAt: new Date("2024-02-05")
  },
  {
    title: "Film Analysis and Review",
    description: "In-depth analysis of popular films. Direction, cinematography, and storytelling.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Film+1",
    duration: 1800,
    likes: 1876,
    shares: 534,
    creator: "Film Critic",
    uploadedAt: new Date("2024-02-06")
  },
  {
    title: "Basketball Skills Training",
    description: "Learn basketball fundamentals. Shooting, dribbling, and defense.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Basketball+1",
    duration: 1200,
    likes: 2543,
    shares: 678,
    creator: "Sports Coach",
    uploadedAt: new Date("2024-02-07")
  },
  {
    title: "Cooking Pasta from Scratch",
    description: "Make fresh pasta at home. Authentic Italian recipe.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Pasta+1",
    duration: 1500,
    likes: 3214,
    shares: 789,
    creator: "Italian Chef",
    uploadedAt: new Date("2024-02-08")
  },
  {
    title: "Web Development Course",
    description: "Learn HTML, CSS, and JavaScript from scratch. Beginner to advanced.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Web+Dev+1",
    duration: 3600,
    likes: 2876,
    shares: 645,
    creator: "Web Developer",
    uploadedAt: new Date("2024-02-09")
  },
  {
    title: "Space Documentary",
    description: "Explore the universe. Stars, planets, and galaxies explained.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Space+1",
    duration: 2400,
    likes: 3421,
    shares: 823,
    creator: "Astronomer",
    uploadedAt: new Date("2024-02-10")
  },
  {
    title: "Makeup Tutorial",
    description: "Learn professional makeup application. Step by step guide.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Makeup+1",
    duration: 900,
    likes: 4567,
    shares: 1234,
    creator: "Makeup Artist",
    uploadedAt: new Date("2024-02-11")
  },
  {
    title: "Drone Footage Collection",
    description: "Beautiful aerial views captured with drone. Cinematic quality.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Drone+1",
    duration: 1200,
    likes: 2345,
    shares: 567,
    creator: "Drone Pilot",
    uploadedAt: new Date("2024-02-12")
  },
  {
    title: "Guitar Lessons for Beginners",
    description: "Learn basic guitar chords and songs. Easy exercises included.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Guitar+1",
    duration: 1800,
    likes: 1876,
    shares: 423,
    creator: "Guitar Teacher",
    uploadedAt: new Date("2024-02-13")
  },
  {
    title: "Healthy Smoothie Recipes",
    description: "5 delicious and healthy smoothie recipes. Perfect for breakfast.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Smoothie+1",
    duration: 600,
    likes: 2134,
    shares: 512,
    creator: "Nutritionist",
    uploadedAt: new Date("2024-02-14")
  },
  {
    title: "Product Photography Tips",
    description: "Professional product photography techniques. Lighting and composition.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Product+1",
    duration: 1200,
    likes: 1543,
    shares: 389,
    creator: "Photographer",
    uploadedAt: new Date("2024-02-15")
  },
  {
    title: "Parkour Basics Tutorial",
    description: "Learn parkour movement basics safely. Beginner friendly.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Parkour+1",
    duration: 900,
    likes: 1876,
    shares: 456,
    creator: "Parkour Coach",
    uploadedAt: new Date("2024-02-16")
  },
  {
    title: "Interior Design Ideas",
    description: "Modern interior design ideas for small spaces. Budget-friendly.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Interior+1",
    duration: 1200,
    likes: 2765,
    shares: 634,
    creator: "Interior Designer",
    uploadedAt: new Date("2024-02-17")
  },
  {
    title: "Data Science Explained",
    description: "Introduction to data science and machine learning concepts.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Data+Science+1",
    duration: 1800,
    likes: 1456,
    shares: 378,
    creator: "Data Scientist",
    uploadedAt: new Date("2024-02-18")
  },
  {
    title: "Wildlife Photography Safari",
    description: "Safari adventure capturing wildlife. Rare animal encounters.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Safari+1",
    duration: 1500,
    likes: 3245,
    shares: 789,
    creator: "Safari Guide",
    uploadedAt: new Date("2024-02-19")
  },
  {
    title: "Piano Lessons Masterclass",
    description: "Advanced piano techniques. Playing classical pieces.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Piano+1",
    duration: 2100,
    likes: 1654,
    shares: 456,
    creator: "Piano Teacher",
    uploadedAt: new Date("2024-02-20")
  },
  {
    title: "Cryptocurrency Basics",
    description: "Understand Bitcoin and blockchain technology. Investing guide.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Crypto+1",
    duration: 1800,
    likes: 2134,
    shares: 567,
    creator: "Crypto Expert",
    uploadedAt: new Date("2024-02-21")
  },
  {
    title: "Calligraphy Art Techniques",
    description: "Learn beautiful calligraphy. Step by step guide for beginners.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Calligraphy+1",
    duration: 900,
    likes: 987,
    shares: 245,
    creator: "Artist",
    uploadedAt: new Date("2024-02-22")
  },
  {
    title: "Podcast Production Guide",
    description: "Complete guide to starting and running a successful podcast.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    thumbnail: "https://via.placeholder.com/300x168?text=Podcast+1",
    duration: 1500,
    likes: 1765,
    shares: 423,
    creator: "Podcaster",
    uploadedAt: new Date("2024-02-23")
  }
];

const seedDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/carousel-videos';
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✓ Connected to MongoDB');

    // Check if videos already exist
    const existingCount = await Video.countDocuments();
    if (existingCount > 0) {
      console.log(`⚠ Database already contains ${existingCount} videos. Skipping seed.`);
      console.log('  To reset, delete the database and run again.');
      await mongoose.disconnect();
      return;
    }

    // Insert videos
    const result = await Video.insertMany(videosData);
    console.log(`✓ Successfully inserted ${result.length} videos into the database`);

    await mongoose.disconnect();
    console.log('✓ Database connection closed');
  } catch (error) {
    console.error('✗ Error seeding database:', error.message);
    process.exit(1);
  }
};

// Run the seed
seedDatabase();
