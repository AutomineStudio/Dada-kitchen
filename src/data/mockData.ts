import { Dada, MenuItem, Address, Order } from '../types';

export const INITIAL_DADAS: Dada[] = [
  {
    id: 'dada-1',
    name: 'Dada Malika',
    type: 'dada',
    rating: 4.9,
    reviewCount: 156,
    experienceYears: 25,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyZgV2oYIQNWmNres-liEnpl1Dw9HKRjha91U5BJt83K3UwAq05apqX5a7O8rkso4yZBCCLbLuTUui-2_LUSAJovbVpflwqji135vLkEbaKjvqhTu-C9MO1c_Ipx6oKrB45BAVGugx4-kcyUpf4ZIjStdm24HTpwe-wm4rlZ0I471QYrPS5xHo7WwIugwiirHoGJQ19vtNpoAyZjvWFMOl-4Bb4NrasgwMO4_fvIbgliu1Bn3-TbCijAnAkig6iLR9LQuIyKIT-nc',
    specialty: 'Tagines traditionnels & Pastillas Fassi',
    location: 'Maarif, Casablanca',
    bio: "La cuisine est une transmission d'amour et de générosité. Depuis plus de 25 ans, je perpétue les recettes ancestrales transmises dans ma famille à Fès."
  },
  {
    id: 'dada-2',
    name: 'Dada Fatima',
    type: 'dada',
    rating: 4.8,
    reviewCount: 198,
    experienceYears: 30,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXarc-HYGLw9BvYS4AijpVAP-q8HZk2t2KTKwS-0jlJ1QinbfdJ-97AIOf1a7wqlfyTM__MiEHySBALfT6EgyYyYcA8nv52brvm7CMKYs7l1lxyIkkme72bO2Z3z5jHgM67cVpwHja-rBznD79WA0LLhvRuyS2l7_zAgTpFgaP1vy8FuTC9cXdSMjP_xxmp_qOgBuMCjdlbyjQoSSns17zO7mLZ6fCwU92ok0flhQReNsGKQo_YaQ0FMSYAgcfsZ37HAQkIFpiIrg',
    specialty: 'Couscous royal & Rfissa au poulet beldi',
    location: 'Gauthier, Casablanca',
    bio: "Fière de partager les saveurs de la vraie cuisine marocaine préparée avec des ingrédients frais du marché chaque matin."
  },
  {
    id: 'dada-3',
    name: 'Dada Rachida',
    type: 'dada',
    rating: 4.7,
    reviewCount: 112,
    experienceYears: 18,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqbbWp3lx_S7I1QjjAbWbl3jL5NF4XkYVet6AM5tohGQoIzmgpdxKapYezpXCWqhU60UkIL7C4mtl4fn5NFYzu-nEW1QHroV0zn8P7nrOJPQmbm8bFtUXGBPQ3DFiiVhENM-B3ZrxnymtDQkZ2Vife6AhwwpuffJALTSnRGxCC8WLfmNNQ3dH1tNPoIuKyOqy2lhqUJfE5ylVd2XzYu-Re2t9VCLuovxJ0aqlHnWr2MFubW4ooDBIZlXPFyr2Vn4dn7Sx-z-cK9lk',
    specialty: 'Pastilla Poulet & Desserts traditionnels',
    location: 'Sidi Maarouf, Casablanca',
    bio: "Une passion transmise de mère en fille pour ravir vos papilles lors des déjeuners quotidiens."
  },
  {
    id: 'dada-4',
    name: 'Dada Amina',
    type: 'dada',
    rating: 4.9,
    reviewCount: 124,
    experienceYears: 22,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwBmQdaXykA3KXbNc5LF7w56kFWjYGsMCyMArP-EnLaa0sezuh8L_D25IahG0fsDtBztQpZqMZBzBJtiJxl-bc7WWDICcbF09DqzogMPWoPpvzJdjVEF2zLCbm_A8Yxtjv31Q2T2OeyL86ur6nD1yV_FRHA96Pm5lBv2lFnTBHn_SnCawLs_VQtBJ3F2C1npFfSHsVd5kEK6jr0EOUdXXZrYVQpRCEpYUAehWQXfvCcXwG-JeeSiM2OlY0RrKIG1rv0jI7q5Vk0IE',
    specialty: 'Agneau aux pruneaux & Mechoui',
    location: 'Californie, Casablanca',
    bio: "Cooking is the language of my heart. For over 30 years, I've been perfecting the traditional recipes passed down through my family in Fes. My kitchen in Maarif is where I blend ancient spices with modern techniques to bring you the true taste of Moroccan hospitality."
  }
];

export const INITIAL_TRAITEURS: Dada[] = [
  {
    id: 'traiteur-1',
    name: 'Traiteur Malika',
    type: 'traiteur',
    rating: 4.9,
    reviewCount: 210,
    experienceYears: 25,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyZgV2oYIQNWmNres-liEnpl1Dw9HKRjha91U5BJt83K3UwAq05apqX5a7O8rkso4yZBCCLbLuTUui-2_LUSAJovbVpflwqji135vLkEbaKjvqhTu-C9MO1c_Ipx6oKrB45BAVGugx4-kcyUpf4ZIjStdm24HTpwe-wm4rlZ0I471QYrPS5xHo7WwIugwiirHoGJQ19vtNpoAyZjvWFMOl-4Bb4NrasgwMO4_fvIbgliu1Bn3-TbCijAnAkig6iLR9LQuIyKIT-nc',
    specialty: 'Grands événements & Réceptions familiales',
    location: 'Casablanca & Régions',
    bio: "Service traiteur haut de gamme pour vos événements, mariages, baptêmes et grandes réceptions d'entreprise."
  },
  {
    id: 'traiteur-2',
    name: 'Traiteur Fatima',
    type: 'traiteur',
    rating: 4.8,
    reviewCount: 180,
    experienceYears: 30,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXarc-HYGLw9BvYS4AijpVAP-q8HZk2t2KTKwS-0jlJ1QinbfdJ-97AIOf1a7wqlfyTM__MiEHySBALfT6EgyYyYcA8nv52brvm7CMKYs7l1lxyIkkme72bO2Z3z5jHgM67cVpwHja-rBznD79WA0LLhvRuyS2l7_zAgTpFgaP1vy8FuTC9cXdSMjP_xxmp_qOgBuMCjdlbyjQoSSns17zO7mLZ6fCwU92ok0flhQReNsGKQo_YaQ0FMSYAgcfsZ37HAQkIFpiIrg',
    specialty: 'Buffets marocains prestige & Pastillas géantes',
    location: 'Casablanca & Régions',
    bio: "Spécialiste des grands plats de fêtes: Demi mouton rôti, Pastillas de mer 10p, Salades royales."
  },
  {
    id: 'traiteur-3',
    name: 'Traiteur Rachida',
    type: 'traiteur',
    rating: 4.7,
    reviewCount: 95,
    experienceYears: 18,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqbbWp3lx_S7I1QjjAbWbl3jL5NF4XkYVet6AM5tohGQoIzmgpdxKapYezpXCWqhU60UkIL7C4mtl4fn5NFYzu-nEW1QHroV0zn8P7nrOJPQmbm8bFtUXGBPQ3DFiiVhENM-B3ZrxnymtDQkZ2Vife6AhwwpuffJALTSnRGxCC8WLfmNNQ3dH1tNPoIuKyOqy2lhqUJfE5ylVd2XzYu-Re2t9VCLuovxJ0aqlHnWr2MFubW4ooDBIZlXPFyr2Vn4dn7Sx-z-cK9lk',
    specialty: 'Cocktails dînatoires & Pâtisserie marocaine',
    location: 'Casablanca & Régions',
    bio: "Des réceptions sur mesure alliant modernité et traditions authentiques."
  },
  {
    id: 'traiteur-4',
    name: 'Traiteur Amina',
    type: 'traiteur',
    rating: 4.9,
    reviewCount: 124,
    experienceYears: 22,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwBmQdaXykA3KXbNc5LF7w56kFWjYGsMCyMArP-EnLaa0sezuh8L_D25IahG0fsDtBztQpZqMZBzBJtiJxl-bc7WWDICcbF09DqzogMPWoPpvzJdjVEF2zLCbm_A8Yxtjv31Q2T2OeyL86ur6nD1yV_FRHA96Pm5lBv2lFnTBHn_SnCawLs_VQtBJ3F2C1npFfSHsVd5kEK6jr0EOUdXXZrYVQpRCEpYUAehWQXfvCcXwG-JeeSiM2OlY0RrKIG1rv0jI7q5Vk0IE',
    specialty: 'Bastilla Poisson & Mouton Rôti aux amandes',
    location: 'Casablanca & Régions',
    bio: "Cooking is the language of my heart. For over 30 years, I've been perfecting the traditional recipes passed down through my family in Fes."
  }
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // Dada Amina Items (Day Menu)
  {
    id: 'menu-1',
    dadaId: 'dada-4',
    name: 'Lamb & Prune Tagine',
    subtitle: 'Spécialité de la maison',
    description: 'Agneau, pruneaux, amandes, épices',
    price: 120,
    remainingCount: 20,
    category: 'Plats principaux',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBujIGY0lLIFpZ0SYOrPs30j4xwwH8ystH_TtmpjkG04noMcEmbIlvU4017QrhvC3yPJEyU_9HgamFxFC3ZYkfGDSs66r0NyMgOytAP00pF9ZwHZXc8FBn9oQUuOP7LR0j95VUxuCC2MA0t-SoV08FjtbOTCKuOaw5MhF1UOxYpsmUFX7Vt41p9T7ghy--opSI5KIKkVME1yxSi1_SsO65UhPJT_TfQNiwgsbbjh8svbfYbaiY8Gu0in01nfpVkEM0kjS1UTv7veo',
    day: 'Lundi'
  },
  {
    id: 'menu-2',
    dadaId: 'dada-4',
    name: 'Royal Couscous',
    subtitle: 'Légumes frais du marché',
    description: 'Semoule, sept légumes, pois chiches, raisins secs',
    price: 85,
    remainingCount: 20,
    category: 'Plats principaux',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzOW2lRPttLk0sA4tkkB2IfyuUicQM2LLMpJaWAfPG-qQ8QwVDyyUXT2hU8r1enXQ88tKiGY9di6srR1JbqqbLij4cgcIG8OBwD6abvzxdGXWUzhnAFgnPESDhwZQqQdQB2gT-ew5DveOsYwCx1PwbfvGhz17wJFMU7iaI4mCy4BQnql1ezBGCpbXkK0Fo7BMX2AoXWK1KkKtD_IcQ_wWl6UHEoVbDi0gD92UERmFJjXZS_H7dug4fA-ngrbOYqVAa8Fdr8-PK6C8',
    day: 'Lundi'
  },
  {
    id: 'menu-3',
    dadaId: 'dada-4',
    name: 'Poulet au Citron Confit',
    subtitle: 'Poulet beldi mhamer',
    description: 'Poulet doré au four, olives vertes, citron confit et frites maison',
    price: 95,
    remainingCount: 15,
    category: 'Plats principaux',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBh-sHgbq1OYkl7OCOg-Zg5tAC2f7qbWA4-9pcGeBY10ubjHLHNNVlMLi8b1dCEclenHen19P0m5Qqrfr_VOpK6Y_-aF8CCb8b_Pzv2DP3IPbVspKkbo0fPN1y9P9M9f3reuxZXov0WZS6pnumtx05R5sNgWhf1mucLl_APr3LHV3Zd7w7pDlkEyMa1UoYmegMQxTs0nC3KcezDDPwdLK1xBWt0boBmkZhuEGpWm35nPmLXrYMTvaVv',
    day: 'Mardi'
  },
  {
    id: 'menu-4',
    dadaId: 'dada-4',
    name: 'Pastilla Poulet Individuelle',
    subtitle: 'Feuilleté sucré-salé',
    description: 'Poulet effiloché, amandes grillées concassées, cannelle et sucre glace',
    price: 75,
    remainingCount: 18,
    category: 'Entrées & Pastillas',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLudnMJZJMKq_9Lwvs9fcziTz-ZBZ8D_hhVxsS1JdOwNsK-dvjahEK8QZWKdrf5a-Za6NUbCFunif-JzAU7TDURLBlEw3gvUDnOg3pk9VC9LE9c4pCG73Fs6eNTH6KOHRzUcFC26H6XN64pxwLmrZfgvTh8XxJV3BFIRhbzG79IwucbUvuAS8zA1WayaZw02MEBP66wNbV15LHjv5iPtwNfHpCQ5WhuC6MHxf902Aju_EwNXw5tzHlEQ9YY',
    day: 'Mercredi'
  },

  // Traiteur Amina Items
  {
    id: 'menu-traiteur-1',
    dadaId: 'traiteur-4',
    name: 'Bastilla Poisson',
    subtitle: 'Spécialité de la maison aux fruits de mer',
    description: 'Crevettes, calamars, poisson blanc, vermicelle chinoise, épices marocaines',
    price: 450,
    category: 'Traiteur grands plats',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLttZTqQrEYKNilW3-FUpkMA8V8RP193llwzOlKs9jYNOGWoVI0KCy2IPNnucBEpz53Ut8wZLzbtaxL-glTNQHOCa_ZVjgF0ZluegMUG4wSO5PhViTH87JUw9RUMDncyOpAzGJ9Yk7KxyHp2uLmGDnKuxeD4AptmAGECm4aiaiNzfkz6Heo0pOyZuJBR5uMdOWslhoYFbTYS2-LJosfnCkXHtntLr7mRooF1b58Q0o_sV5rNY8RMW_x0rQ'
  },
  {
    id: 'menu-traiteur-2',
    dadaId: 'traiteur-4',
    name: 'Bastilla Poulet',
    subtitle: 'Spécialité traditionnelle au poulet et amandes',
    description: 'Poulet mijoté aux herbes, amandes caramélisées, cannelle et fleur d\'oranger',
    price: 350,
    category: 'Traiteur grands plats',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLudnMJZJMKq_9Lwvs9fcziTz-ZBZ8D_hhVxsS1JdOwNsK-dvjahEK8QZWKdrf5a-Za6NUbCFunif-JzAU7TDURLBlEw3gvUDnOg3pk9VC9LE9c4pCG73Fs6eNTH6KOHRzUcFC26H6XN64pxwLmrZfgvTh8XxJV3BFIRhbzG79IwucbUvuAS8zA1WayaZw02MEBP66wNbV15LHjv5iPtwNfHpCQ5WhuC6MHxf902Aju_EwNXw5tzHlEQ9YY'
  },
  {
    id: 'menu-traiteur-3',
    dadaId: 'traiteur-4',
    name: 'Demi Mouton Rôti',
    subtitle: 'Spécialité festive décorée d\'amandes',
    description: 'Mouton entier mijoté et rôti au four avec sa sauce dghimsa riches en pruneaux et amandes',
    price: 1200,
    category: 'Traiteur grands plats',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLv21iTVCVblHJXiwmin_U6Cnz9F-ByV8rfYvbkvPtgCm3zRGCndq-UL-gPmZBx3ChATXIP8uNUIgFMNm_4o1i2jTkyMTQRVEL4PFNYK3ojfQfzmS0jX6yAb46_8b7zo7d1dFp_pJMi3eGVCZ5r-Itn3VRWcdSFhkY9tE9qcF_4_6BF4XV6LOT6517u5YeMG0L1gqVd3__e9njrEmiLuhL_FaHdOk2hDZsSgI-QdH2BRJyhgDiBxo96z3zY'
  },
  {
    id: 'menu-traiteur-4',
    dadaId: 'traiteur-4',
    name: 'Bastilla 6p',
    subtitle: 'Format familial 6 personnes',
    description: 'Recette royale au choix (Fruits de mer ou Poulet amandes)',
    price: 490,
    category: 'Traiteur grands plats',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLtj-3kQyy_Q2xtScdVgJfYJYZsBDCMgsb1f5-hQsvkMDFG14D4xYPwZ8fwOGXOCCzh3AJFVcdO4JRKcAGTXXH0-CSLHXmx8pVUrcEz9d610LFqDhpefAYMvkqfPZpRF5tEu54-cId02QEN3Ym1_IUSNb8Yj7bYwJn6Ik_jnmeDaVm8ZFxwGoquMBbSiKa7BSNg7ofMrXM3obbn4FCezWQnaNjl8HhMRAMeSGtN3h_cqgnzRzYSNYI2IJA'
  }
];

export const INITIAL_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    name: 'Adresse 1',
    city: 'Casablanca',
    district: 'Gauthier',
    fullAddress: "Appartement 12, Résidence Les Almohades, Boulevard d'Anfa, Quartier Gauthier, Casablanca, 20000",
    isDefault: true,
    type: 'home'
  },
  {
    id: 'addr-2',
    name: 'Adresse 2',
    city: 'Casablanca',
    district: 'Sidi Maarouf',
    fullAddress: 'Tour Casa Nearshore, 5ème étage, Sidi Maarouf, Casablanca, 20270',
    type: 'work'
  },
  {
    id: 'addr-3',
    name: 'Adresse 3',
    city: 'Casablanca',
    district: 'Californie',
    fullAddress: 'Villa 45, Rue des Oliviers, Quartier Californie, Casablanca, 20150',
    hasSpecialInstructions: true,
    specialInstructions: 'Déposer auprès du garde de la résidence',
    type: 'family'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-8942',
    date: 'Aujourd\'hui',
    deliverySlot: 'Mardi à 13:00',
    dadaName: 'Dada Amina',
    dadaAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBm6UkXd8aB8AOUkL0VWxe-kFfol8MYR4eLsymEerWN0eJ_XYnfMy1qomjiFhWriE7o_FH4IoAUHvlZSBBh34iIukJJqbtNCC0ttlH81BHJ0mLYzIBvboZkdflotbq__H9OB2iFBGKaqdCBtaKwMrP7AlC1i_PIMjnoASRv458FeoVs42AlxGSVUnx5VIHFRzwbE866Rg60psKMD86Z7pm2PTP2PE8ajOriacaXP-ColUemmo1ikuo6VZksVWAxPZxA0eFsOFb23zc',
    status: 'CONFIRMED',
    totalPrice: 85,
    items: [
      {
        id: 'cart-init-1',
        dadaName: 'Dada Amina',
        deliverySlot: '12h - 13h',
        quantity: 1,
        menuItem: {
          id: 'menu-1',
          dadaId: 'dada-4',
          name: 'Lamb & Prune Tagine',
          subtitle: 'Spécialité de la maison',
          description: 'Agneau, pruneaux, amandes, épices',
          price: 85,
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBujIGY0lLIFpZ0SYOrPs30j4xwwH8ystH_TtmpjkG04noMcEmbIlvU4017QrhvC3yPJEyU_9HgamFxFC3ZYkfGDSs66r0NyMgOytAP00pF9ZwHZXc8FBn9oQUuOP7LR0j95VUxuCC2MA0t-SoV08FjtbOTCKuOaw5MhF1UOxYpsmUFX7Vt41p9T7ghy--opSI5KIKkVME1yxSi1_SsO65UhPJT_TfQNiwgsbbjh8svbfYbaiY8Gu0in01nfpVkEM0kjS1UTv7veo',
          category: 'Plats principaux'
        }
      }
    ]
  },
  {
    id: 'ORD-7210',
    date: '15 Octobre 2023',
    deliverySlot: '13:30',
    dadaName: 'Dada Malika',
    dadaAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyZgV2oYIQNWmNres-liEnpl1Dw9HKRjha91U5BJt83K3UwAq05apqX5a7O8rkso4yZBCCLbLuTUui-2_LUSAJovbVpflwqji135vLkEbaKjvqhTu-C9MO1c_Ipx6oKrB45BAVGugx4-kcyUpf4ZIjStdm24HTpwe-wm4rlZ0I471QYrPS5xHo7WwIugwiirHoGJQ19vtNpoAyZjvWFMOl-4Bb4NrasgwMO4_fvIbgliu1Bn3-TbCijAnAkig6iLR9LQuIyKIT-nc',
    status: 'DELIVERED',
    totalPrice: 180,
    rated: false,
    items: [
      {
        id: 'cart-init-2',
        dadaName: 'Dada Malika',
        deliverySlot: '13h - 14h',
        quantity: 2,
        menuItem: {
          id: 'menu-2',
          dadaId: 'dada-1',
          name: 'Royal Couscous',
          subtitle: 'Légumes frais du marché',
          description: 'Semoule, sept légumes, pois chiches, raisins secs',
          price: 90,
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzOW2lRPttLk0sA4tkkB2IfyuUicQM2LLMpJaWAfPG-qQ8QwVDyyUXT2hU8r1enXQ88tKiGY9di6srR1JbqqbLij4cgcIG8OBwD6abvzxdGXWUzhnAFgnPESDhwZQqQdQB2gT-ew5DveOsYwCx1PwbfvGhz17wJFMU7iaI4mCy4BQnql1ezBGCpbXkK0Fo7BMX2AoXWK1KkKtD_IcQ_wWl6UHEoVbDi0gD92UERmFJjXZS_H7dug4fA-ngrbOYqVAa8Fdr8-PK6C8',
          category: 'Plats principaux'
        }
      }
    ]
  }
];
