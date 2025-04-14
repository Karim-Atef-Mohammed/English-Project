const questions = [
  {
    id: 'intro',
    type: 'information',
    title: 'Survey on Brand Logo Impressions',
    shortTitle: 'Introduction',
    description: 'In this short survey you will see examples of well‑known brands displayed in different colour styles. We would like to know your impressions. Your responses are anonymous and there are no right or wrong answers, and the survey should take about three minutes to complete.',
    noResponse: true
  },
  
  // First MCQ about color and trust
  {
    id: 'color_trust',
    type: 'multipleChoice',
    title: 'Color Associations',
    shortTitle: 'Color Trust',
    description: 'Please select the option that best matches your perception.',
    questions: [
      {
        id: 'trust_color',
        question: 'Which color do you associate most with trust and reliability?',
        options: ['Blue', 'Green', 'Red', 'Black', 'White']
      }
    ]
  },
  
  // Second MCQ about product choice influences
  {
    id: 'product_influence',
    type: 'multipleChoice',
    title: 'Product Choice Factors',
    shortTitle: 'Influences',
    description: 'Please tell us what factors influence your purchasing decisions.',
    questions: [
      {
        id: 'influence_factors',
        question: 'Which of these influences you the most when choosing a product? (Select all that apply)',
        options: ['Color', 'Logo design', 'Product packaging', 'Advertisements (Posters, Social Media Ads, TV Ads)', 'Font style and text design'],
        multiSelect: true
      }
    ],
    multiSelect: true  // Make sure this is added at both levels if needed
  },  
  
  // Third MCQ about advertisement preferences
  {
    id: 'ad_preference',
    type: 'multipleChoice',
    title: 'Advertisement Preferences',
    shortTitle: 'Ad Types',
    description: 'Please tell us about what advertising styles appeal to you.',
    questions: [
      {
        id: 'ad_attention',
        question: 'What type of advertisement is most likely to grab your attention?',
        options: ['Bright and colorful designs', 'Minimalist and simple designs', 'Dark and elegant themes', 'Animated or moving ads']
      }
    ]
  },
  
  /* ---------- BRAND‑COMPARISON ONE ---------- */
{
  id: 'vodafone_comparison',
  type: 'brandComparison',
  title: 'Brand Comparison One',
  shortTitle: 'Vodafone',
  description:
    'Compare these Vodafone logo versions. For each statement, rate Version A and Version B on a single 1‑to‑7 scale (1 = Strongly disagree … 7 = Strongly agree).',
  /* 1–7 key for the UI */
  scale: {
    min: 1,
    max: 7,
    minLabel: 'Strongly disagree',
    maxLabel: 'Strongly agree'
  },
  brandPairs: [
    {
      id: 'vodafone',
      brandName: 'Vodafone',
      brandType: 'Telecom',
      originalColor: '#FF0000',          // Red
      newColor: '#0000FF',               // Blue
      originalImageUrl: '/assets/images/vodafone_original.jpeg',
      newImageUrl: '/assets/images/vodafone_altered.jpeg',
      versionA: 'Original Red',
      versionB: 'Blue Version',
      statements: [
        'This version is easily recognisable as Vodafone.',
        'This version is visually appealing.',
        'This version conveys trustworthiness.',
        'This version evokes positive emotions.',
        'This version suggests high quality.',
        'I would be likely to purchase this version.'
      ]
    }
  ]
},

/* ---------- BRAND‑COMPARISON TWO ---------- */
{
  id: 'we_comparison',
  type: 'brandComparison',
  title: 'Brand Comparison Two',
  shortTitle: 'We',
  description:
    'Compare these We logo versions. For each statement, rate Version A and Version B on the same 1‑to‑7 scale (1 = Strongly disagree … 7 = Strongly agree).',
  scale: {
    min: 1,
    max: 7,
    minLabel: 'Strongly disagree',
    maxLabel: 'Strongly agree'
  },
  brandPairs: [
    {
      id: 'we',
      brandName: 'We',
      brandType: 'Telecom',
      originalColor: '#0000FF',          // Blue
      newColor: '#FF0000',               // Red
      originalImageUrl: '/assets/images/we_original.jpeg',
      newImageUrl: '/assets/images/we_altered.jpeg',
      versionA: 'Original Blue',
      versionB: 'Red Version',
      statements: [
        'This version is easily recognisable as We.',
        'This version is visually appealing.',
        'This version conveys trustworthiness.',
        'This version evokes positive emotions.',
        'This version suggests high quality.',
        'I would be likely to purchase this version.'
      ]
    }
  ]
},

  
  // Only keep the first open-ended question
  {
    id: 'open_ended_responses',
    type: 'openEndedQuestions',
    title: 'Your Thoughts',
    shortTitle: 'Feedback',
    description: 'Please share your thoughts on the following scenario.',
    questions: [
      {
        id: 'celebratory_event',
        question: 'Imagine you are choosing a mobile network provider for your new smartphone during a special occasion (e.g., graduation or starting a new job). Which version of Vodafone would you select—Version A or Version B—and why? How does each version align with the significance of such an occasion?'
      }
    ]
  },
  
  // Keep demographics as the last section
  {
    id: 'demographics',
    type: 'multipleChoice',
    title: 'Demographics and Contextual Factors',
    shortTitle: 'About You',
    description: 'Please tell us a bit about yourself to help us analyze our survey results.',
    questions: [
      {
        id: 'age',
        question: 'What is your age group?',
        options: ['18-', '18-24', '25-34', '35-44', '45-54', '55+']
      },
      {
        id: 'gender',
        question: 'What is your gender?',
        options: ['Male', 'Female', 'Non-binary', 'Prefer not to say']
      },
      {
        id: 'cultural_background',
        question: 'What is your cultural background or country of residence?',
        freeText: true
      },
      {
        id: 'brand_familiarity',
        question: 'How familiar are you with Vodafone and We as brands?',
        options: ['Not at all familiar', 'Somewhat familiar', 'Very familiar', 'Extremely familiar (e.g., regular consumer)']
      }
    ]
  }
];

export default questions;
