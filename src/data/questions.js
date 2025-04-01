const questions = [
  {
    id: 'intro', // This ID is used to hide the Next Question button
    type: 'information',
    title: 'Chromatic Shift in Brand Identity: A Psychovisual Study of Perceptual Impact',
    shortTitle: 'Introduction',
    description: 'This survey examines how changes in brand colors affect consumer perception. You will be shown different versions of familiar beverage brands and asked for your reactions and giving ratings from 1 to 7.',
    noResponse: true
  },
  {
    id: 'vodafone_comparison',
    type: 'brandComparison',
    title: 'Brand Comparison One',
    shortTitle: 'Vodafone',
    description: 'Compare these Vodafone brand versions with their original and altered color schemes.',
    brandPairs: [
      {
        id: 'vodafone',
        brandName: 'Vodafone',
        brandType: 'Beverage',
        originalColor: '#FF0000', // Red
        newColor: '#0000FF', // Blue
        originalImageUrl: '/assets/images/vodafone_original.jpeg',
        newImageUrl: '/assets/images/vodafone_altered.jpeg',
        versionA: 'Original Red',
        versionB: 'Blue Version',
        statements: [
          'This version is easily recognizable as Vodafone.',
          'This version is visually appealing.',
          'This version conveys trustworthiness.',
          'This version evokes positive emotions.',
          'This version suggests high quality.',
          'I would be likely to purchase this version.'
        ]
      }
    ]
  },
  {
    id: 'we_comparison',
    type: 'brandComparison',
    title: 'Brand Comparison Two',
    shortTitle: 'We',
    description: 'Compare these We brand versions with their original and altered color schemes.',
    brandPairs: [
      {
        id: 'we',
        brandName: 'We',
        brandType: 'Beverage',
        originalColor: '#0000FF', // Blue
        newColor: '#FF0000', // Red
        originalImageUrl: '/assets/images/we_original.jpeg',
        newImageUrl: '/assets/images/we_altered.jpeg',
        versionA: 'Original Blue',
        versionB: 'Red Version',
        statements: [
          'This version is easily recognizable as We.',
          'This version is visually appealing.',
          'This version conveys trustworthiness.',
          'This version evokes positive emotions.',
          'This version suggests high quality.',
          'I would be likely to purchase this version.'
        ]
      }
    ]
  },
  {
    id: 'brand_rating',
    type: 'likert',
    title: 'Brand Version Ratings',
    shortTitle: 'Ratings',
    description: 'Please rate your agreement with the following statements about each brand version.',
    statements: [
      {
        id: 'vodafone_a_identity',
        statement: 'This version of Vodafone (Version A) effectively communicates the brand\'s unique identity.'
      },
      {
        id: 'vodafone_b_quality',
        statement: 'This version of Vodafone (Version B) feels consistent with my expectations of the brand\'s quality.'
      },
      {
        id: 'we_a_interest',
        statement: 'This version of We (Version A) enhances my interest in engaging with the brand.'
      },
      {
        id: 'we_b_identity',
        statement: 'This version of We (Version B) effectively communicates the brand\'s unique identity.'
      }
    ],
    scale: [1, 2, 3, 4, 5, 6, 7]
  },
  {
    id: 'open_ended_responses',
    type: 'openEndedQuestions',
    title: 'Your Thoughts',
    shortTitle: 'Feedback',
    description: 'Please share your thoughts on the following scenarios.',
    questions: [
      {
        id: 'celebratory_event',
        question: 'Imagine you are choosing a beverage for a celebratory event (e.g., a birthday party or holiday gathering). Which version of Vodafone would you select—Version A or Version B—and why? How does each version align with the mood or theme of such an event?'
      },
      {
        id: 'casual_setting',
        question: 'Now, imagine you are selecting a beverage for a casual, everyday setting (e.g., a regular meal or snack time). Which version of We would you choose—Version A or Version B—and why? How does each version fit into this more routine context?'
      },
      {
        id: 'brand_connection',
        question: 'If a brand you regularly use were to significantly change a key visual element (like its logo or packaging), how might that affect your connection to it? Reflect on the versions of Vodafone and We you\'ve seen.'
      }
    ]
  },
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
