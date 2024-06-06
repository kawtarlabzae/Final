const firebase = require("firebase/app");
require("firebase/firestore");


const firebaseConfig = {
  apiKey: "AIzaSyAGcmMph1RhNNhUlHOsaruXfDN5gZeUgWs",
  authDomain: "final-5dd18.firebaseapp.com",
  projectId: "final-5dd18",
  storageBucket: "final-5dd18.appspot.com",
  messagingSenderId: "170981709668",
  appId: "1:170981709668:web:ed0700f5e2f2628e4b4c71",
  measurementId: "G-C45Y4NDDPJ"
};
firebase.initializeApp(firebaseConfig);

// Access Firestore
const db = firebase.firestore();


const categories = [
  {
    nom: "Omnivore",
    recettes: [
      {
        nom: "Saumon Rôti aux Asperges Rôties",
        description: "Un plat délicieux et nutritif, facile à préparer",
        ingredients: [
          { nom: "Filets de saumon", quantité: 450, unité: "g" },
          { nom: "Asperges vertes", quantité: 250, unité: "g" },
          { nom: "Huile d'olive", quantité: "2 cuillères à soupe", unité: "" },
          { nom: "Sel et poivre", quantité: "au goût", unité: "" },
          { nom: "Citron, en jus", quantité: "1/2", unité: "unité" },
        ],
        instructions: [
          "Préchauffer le four à 200°C.",
          "Sécher les filets de saumon avec du papier absorbant et les assaisonner de sel, de poivre et d'herbes fraîches (facultatif).",
          "Disposer les filets de saumon sur une plaque de cuisson tapissée de papier sulfurisé.",
          "Laver et sécher les asperges vertes.",
          "Couper les extrémités dures des asperges et les enrober d'huile d'olive.",
          "Disposer les asperges autour des filets de saumon.",
          "Enfourner pendant 15-20 minutes, ou jusqu'à ce que le saumon soit cuit et que les asperges soient tendres.",
          "Servir immédiatement avec un jus de citron pressé.",
        ],
        temps_preparation: 10,
        temps_cuisson: 20,
     
        portions: 2,
        tags: ["facile", "rapide", "santé", "poisson"],
        image: "data:image/jpeg;base64,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",
      },
      {
        nom: "Poulet au Curry et Riz Basmati",
        description: "Un plat savoureux et parfumé, parfait pour un repas familial",
        ingredients: [
          { nom: "Cuisses de poulet désossées et sans peau", quantité: 600, unité: "g" },
          { nom: "Oignon rouge", quantité: "1", unité: "" },
          { nom: "Gousse d'ail", quantité:" 2", unité: "" },
          { nom: "Poudre de curry", quantité: "2 cuillères à soupe", unité: "" },
          { nom: "Lait de coco", quantité: "400 ml", unité: "" },
          { nom: "Riz basmati", quantité: "200 g", unité: "" },
          { nom: "Coriandre fraîche", quantité: "1 poignée", unité: "" },
          { nom: "Sel et poivre", quantité: "au goût", unité: "" },
        ],
        instructions: [
          "Couper le poulet en morceaux et les faire revenir dans une poêle avec un peu d'huile d'olive.",
          "Hacher l'oignon et l'ail et les ajouter à la poêle.",
          "Saupoudrer de poudre de curry et cuire pendant quelques minutes.",
          "Verser le lait de coco et porter à ébullition.",
          "Réduire le feu, couvrir et laisser mijoter pendant 20 minutes, ou jusqu'à ce que le poulet soit cuit.",
          "Cuire le riz basmati selon les instructions sur l'emballage.",
          "Servir le poulet au curry avec le riz basmati et garnir de coriandre fraîche.",
        ],
        temps_preparation: 15,
        temps_cuisson: 25,
      
        portions: 4,
        tags: ["facile", "familial", "curry", "riz"],
        image: "https://fr.frije.com/content/recipes/11470/800-1.jpg",
      },
    ],
  },
  {
    nom: "Végétarien",
    recettes: [
      {
        nom: "Lasagne aux Légumes et Fromage de Chèvre",
        description: "Un plat végétarien réconfortant et savoureux",
        ingredients: [
          { nom: "Lasagnes sèches", quantité: 250, unité: "g" },
          { nom: "Courgettes", quantité: 2, unité: "" },
          { nom: "Aubergines", quantité: 1, unité: "" },
          { nom: "Poivrons rouges", quantité: 1, unité: "" },
          { nom: "Tomates pelées en conserve", quantité: 400, unité: "g" },
          { nom: "Huile d'olive", quantité: "3 cuillères à soupe", unité: "" },
          { nom: "Basilic frais", quantité: "1 poignée", unité: "" },
          { nom: "Sel et poivre", quantité: "au goût", unité: "" },
          { nom: "Fromage de chèvre", quantité: 200, unité: "g" }
        ],
        instructions: [
          "Préchauffer le four à 180°C.",
          "Faire revenir les courgettes, aubergines et poivrons coupés en dés dans une poêle avec un peu d'huile d'olive.",
          "Ajouter les tomates pelées en conserve et le basilic frais, et laisser mijoter pendant 15 minutes.",
          "Assaisonner de sel et de poivre.",
          "Dans un plat à gratin, alterner des couches de lasagnes sèches, de sauce tomate aux légumes et de fromage de chèvre.",
          "Terminer par une couche de fromage de chèvre et enfourner pendant 30-35 minutes, ou jusqu'à ce que les lasagnes soient dorées et le fromage fondu.",
          "Laisser reposer quelques minutes avant de servir."
        ],
        temps_preparation: 20,
        temps_cuisson: 40,
      
        portions: 4,
        tags: ["facile", "familial", "légumes", "fromage"],
        image: "https://www.grazia.fr/wp-content/uploads/grazia/2013/08/Lasagnes-aux-legumes-et-fromage-de-chevre.jpg"
      },
      {
        nom: "Burger aux Pois Chiches et Légumes Grillés",
        description: "Un burger végétarien savoureux et nourrissant",
        ingredients: [
          { nom: "Pois chiches secs", quantité: 200, unité: "g" },
          { nom: "Oignon rouge", quantité: 1, unité: "" },
          { nom: "Gousse d'ail", quantité: 2, unité: "" },
          { nom: "Persil frais", quantité: "1 poignée", unité: "" },
          { nom: "Cumin en poudre", quantité: "1 cuillère à café", unité: "" },
          { nom: "Chapelure", quantité: "3 cuillères à soupe", unité: "" },
          { nom: "Aubergine", quantité: 1, unité: "" },
          { nom: "Poivron rouge", quantité: 1, unité: "" },
          { nom: "Pain à burger", quantité: 4, unité: "" },
          { nom: "Salade verte", quantité: "pour garnir", unité: "" },
          { nom: "Tomate", quantité: 1, unité: "" },
          { nom: "Oignon", quantité: 1, unité: "" },
          { nom: "Sauce au yaourt", quantité: "pour servir", unité: "" }
        ],
        instructions: [
          "Faire tremper les pois chiches dans l'eau pendant la nuit.",
          "Le lendemain, rincer les pois chiches et les cuire dans une casserole d'eau bouillante pendant 30 minutes.",
          "Égoutter les pois chiches et les écraser dans un bol.",
          "Hacher l'oignon et l'ail et les ajouter aux pois chiches.",
          "Hacher le persil et l'ajouter aux pois chiches.",
          "Ajouter le cumin en poudre, la chapelure, le sel et le poivre.",
          "Mélanger le tout jusqu'à obtenir une pâte homogène.",
          "Former des burgers avec la pâte de pois chiches.",
          "Faire chauffer un peu d'huile d'olive dans une poêle et faire cuire les burgers de pois chiches pendant 5 minutes de chaque côté, ou jusqu'à ce qu'ils soient dorés et croustillants.",
          "Couper l'aubergine et le poivron en tranches.",
          "Faire griller les tranches d'aubergine et de poivron dans la même poêle que les burgers, pendant 2-3 minutes de chaque côté.",
          "Couper la tomate et l'oignon en rondelles.",
          "Garnir les pains à burger de salade verte, de tomate, d'oignon, de burgers de pois chiches et de tranches d'aubergine et de poivron.",
          "Servir avec de la sauce au yaourt."
        ],
        temps_preparation: 30,
        temps_cuisson: 35,
      
        portions: 4,
        tags: ["facile", "familial", "végétarien", "burger", "légumes"],
        image: "https://images.ricardocuisine.com/services/recipes/4x3/vege-burger-portrait.jpg"
      }
    ]
  },
  {
    nom: "Végétalien",
    recettes: [
      {
        nom: "Curry de Lentilles et Légumes",
        description: "Un plat vegan riche en protéines et saveurs",
        ingredients: [
          { nom: "Lentilles corail", quantité: 200, unité: "g" },
          { nom: "Carottes", quantité: 2, unité: "" },
          { nom: "Courgette", quantité: 1, unité: "" },
          { nom: "Lait de coco", quantité: "400 ml", unité: "" },
          { nom: "Épinards frais", quantité: "1 poignée", unité: "" },
          { nom: "Oignon", quantité: 1, unité: "" },
          { nom: "Poudre de curry", quantité: "1 cuillère à soupe", unité: "" },
          { nom: "Gingembre frais râpé", quantité: "1 cuillère à café", unité: "" },
          { nom: "Ail", quantité: 2, unité: "gousses" },
          { nom: "Sel et poivre", quantité: "au goût", unité: "" },
          { nom: "Huile de coco", quantité: "1 cuillère à soupe", unité: "" }
        ],
        instructions: [
          "Faire chauffer l'huile de coco dans une grande casserole.",
          "Ajouter l'oignon émincé, l'ail haché et le gingembre râpé, faire revenir jusqu'à ce qu'ils soient dorés.",
          "Ajouter les carottes et la courgette coupées en dés, faire revenir quelques minutes.",
          "Ajouter la poudre de curry et mélanger.",
          "Ajouter les lentilles corail et le lait de coco, porter à ébullition.",
          "Réduire le feu et laisser mijoter pendant 20 minutes, ou jusqu'à ce que les lentilles soient tendres.",
          "Ajouter les épinards frais et laisser cuire encore 2 minutes.",
          "Assaisonner avec du sel et du poivre.",
          "Servir chaud."
        ],
        temps_preparation: 15,
        temps_cuisson: 25,
       
        portions: 4,
        tags: ["vegan", "santé", "curry", "légumes"],
        image: "https://www.bettybossi.ch/rdbimg/bb_gast151001_0144a/bb_gast151001_0144a_r01_v005_x0010.jpg"
      }
    ]
  },
  {
    nom: "Pescétarien",
    recettes: [
      {
        nom: "Tacos de Poisson Grillé",
        description: "Des tacos frais et savoureux avec du poisson grillé",
        ingredients: [
          { nom: "Filets de poisson blanc", quantité: 400, unité: "g" },
          { nom: "Tortillas de maïs", quantité: 8, unité: "" },
          { nom: "Chou rouge", quantité: "1/4", unité: "" },
          { nom: "Carotte", quantité: 1, unité: "" },
          { nom: "Citron vert", quantité: 1, unité: "" },
          { nom: "Coriandre fraîche", quantité: "1 poignée", unité: "" },
          { nom: "Épices pour poisson", quantité: "2 cuillères à soupe", unité: "" },
          { nom: "Sel et poivre", quantité: "au goût", unité: "" },
          { nom: "Huile d'olive", quantité: "2 cuillères à soupe", unité: "" }
        ],
        instructions: [
          "Assaisonner les filets de poisson avec les épices, le sel et le poivre.",
          "Faire chauffer l'huile d'olive dans une poêle et faire griller les filets de poisson pendant 3-4 minutes de chaque côté.",
          "Couper le chou rouge et la carotte en fines lanières.",
          "Réchauffer les tortillas de maïs dans une poêle chaude.",
          "Garnir les tortillas de poisson grillé, de chou rouge et de carotte.",
          "Ajouter un filet de jus de citron vert et parsemer de coriandre fraîche.",
          "Servir immédiatement."
        ],
        temps_preparation: 15,
        temps_cuisson: 10,
        
        portions: 4,
        tags: ["tacos", "poisson", "rapide", "santé"],
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP-rYgBd0IKisvaP9S-FAFETqn9MOeI25SJA&s"
      }
    ]
  },
  {
    nom: "Flexitarien",
    recettes: [
      {
        nom: "Bowl de Quinoa et Poulet Grillé",
        description: "Un bowl équilibré et savoureux",
        ingredients: [
          { nom: "Quinoa", quantité: 200, unité: "g" },
          { nom: "Blancs de poulet", quantité: 2, unité: "" },
          { nom: "Avocat", quantité: 1, unité: "" },
          { nom: "Tomate cerise", quantité: "1 poignée", unité: "" },
          { nom: "Épinards frais", quantité: "1 poignée", unité: "" },
          { nom: "Citron", quantité: 1, unité: "" },
          { nom: "Huile d'olive", quantité: "2 cuillères à soupe", unité: "" },
          { nom: "Sel et poivre", quantité: "au goût", unité: "" }
        ],
        instructions: [
          "Cuire le quinoa selon les instructions sur l'emballage.",
          "Assaisonner les blancs de poulet avec du sel et du poivre, puis les griller jusqu'à ce qu'ils soient bien cuits.",
          "Couper l'avocat en tranches et les tomates cerises en deux.",
          "Dans un bowl, disposer le quinoa, les épinards frais, les tomates cerises et l'avocat.",
          "Ajouter les blancs de poulet grillés coupés en tranches.",
          "Assaisonner avec du jus de citron et un filet d'huile d'olive.",
          "Servir immédiatement."
        ],
        temps_preparation: 15,
        temps_cuisson: 20,
      
        portions: 2,
        tags: ["équilibré", "santé", "poulet", "quinoa"],
        image: "https://static.750g.com/images/1200-675/f98b939acebd7ffc7c82aa407131bbaa/adobestock-190895226.jpeg"
      }
    ]
  },
  {
    nom: "Fruitarien",
    recettes: [
      {
        nom: "Salade de Fruits Frais",
        description: "Une salade rafraîchissante et nutritive",
        ingredients: [
          { nom: "Pommes", quantité: 2, unité: "" },
          { nom: "Bananes", quantité: 2, unité: "" },
          { nom: "Raisins", quantité: "1 tasse", unité: "" },
          { nom: "Oranges", quantité: 2, unité: "" },
          { nom: "Kiwi", quantité: 2, unité: "" },
          { nom: "Miel", quantité: "1 cuillère à soupe", unité: "" },
          { nom: "Jus de citron", quantité: "1 cuillère à soupe", unité: "" }
        ],
        instructions: [
          "Couper tous les fruits en morceaux de taille moyenne.",
          "Mélanger les fruits dans un grand bol.",
          "Arroser de miel et de jus de citron.",
          "Mélanger délicatement pour bien enrober les fruits.",
          "Servir immédiatement ou réfrigérer jusqu'à utilisation."
        ],
        temps_preparation: 10,
        temps_cuisson: 0,
       
        portions: 4,
        tags: ["fruits", "santé", "rapide", "rafraîchissant"],
        image: "https://assets.afcdn.com/recipe/20210215/117981_w1024h1024c1cx2652cy2652cxt0cyt0cxb5304cyb5304.webp"
      }
    ]
  },
  {
    nom: "Crudivore",
    recettes: [
      {
        nom: "Salade de Légumes Croquants",
        description: "Une salade croquante et colorée",
        ingredients: [
          { nom: "Carottes", quantité: 2, unité: "" },
          { nom: "Concombre", quantité: 1, unité: "" },
          { nom: "Poivron rouge", quantité: 1, unité: "" },
          { nom: "Chou rouge", quantité: "1/4", unité: "" },
          { nom: "Avocat", quantité: 1, unité: "" },
          { nom: "Graines de tournesol", quantité: "1 cuillère à soupe", unité: "" },
          { nom: "Citron", quantité: 1, unité: "" },
          { nom: "Huile d'olive", quantité: "2 cuillères à soupe", unité: "" },
          { nom: "Sel et poivre", quantité: "au goût", unité: "" }
        ],
        instructions: [
          "Râper les carottes et couper le concombre, le poivron rouge et le chou rouge en fines lamelles.",
          "Couper l'avocat en dés.",
          "Dans un grand bol, mélanger tous les légumes.",
          "Assaisonner avec du jus de citron, de l'huile d'olive, du sel et du poivre.",
          "Parsemer de graines de tournesol.",
          "Servir immédiatement."
        ],
        temps_preparation: 15,
        temps_cuisson: 0,
   
        portions: 2,
        tags: ["crudités", "santé", "rapide", "végétalien"],
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVAFvgLMPske-kY4_1L0vCSU9hDwFv20z8Xg&s"
      }
    ]
  },
  {
    nom: "Paleo",
    recettes: [
      {
        nom: "Poulet Grillé avec Légumes Rôtis",
        description: "Un plat simple et sain, parfait pour le régime paleo",
        ingredients: [
          { nom: "Blancs de poulet", quantité: 2, unité: "" },
          { nom: "Carottes", quantité: 2, unité: "" },
          { nom: "Brocoli", quantité: "1 tête", unité: "" },
          { nom: "Patate douce", quantité: 1, unité: "" },
          { nom: "Huile de coco", quantité: "2 cuillères à soupe", unité: "" },
          { nom: "Sel et poivre", quantité: "au goût", unité: "" },
          { nom: "Ail en poudre", quantité: "1 cuillère à café", unité: "" }
        ],
        instructions: [
          "Préchauffer le four à 200°C.",
          "Couper les carottes, le brocoli et la patate douce en morceaux.",
          "Mélanger les légumes avec l'huile de coco, le sel, le poivre et l'ail en poudre.",
          "Disposer les légumes sur une plaque de cuisson et les rôtir pendant 20-25 minutes.",
          "Assaisonner les blancs de poulet avec du sel et du poivre, puis les griller jusqu'à ce qu'ils soient bien cuits.",
          "Servir les blancs de poulet avec les légumes rôtis."
        ],
        temps_preparation: 15,
        temps_cuisson: 25,
      
        portions: 2,
        tags: ["paleo", "santé", "rapide", "poulet"],
        image: "https://lh4.googleusercontent.com/proxy/4RbIPegopOIAZ2uDQNTxR4j-yyo0T6cZyj9l3MNDHTwjVH6ZZMaXGbzgPPhF_U9BiVdTsPyYMPpSraHp6anvEekh8pzG5TdgTjlcLlpNZ7a0xLCZt6uINg"
      }
    ]
  },
  {
    nom: "Cétogène",
    recettes: [
      {
        nom: "Omelette aux Épinards et Champignons",
        description: "Une omelette faible en glucides, riche en saveurs",
        ingredients: [
          { nom: "Œufs", quantité: 3, unité: "" },
          { nom: "Épinards frais", quantité: "1 poignée", unité: "" },
          { nom: "Champignons", quantité: 100, unité: "g" },
          { nom: "Crème fraîche", quantité: "2 cuillères à soupe", unité: "" },
          { nom: "Fromage râpé", quantité: "50 g", unité: "" },
          { nom: "Beurre", quantité: "1 cuillère à soupe", unité: "" },
          { nom: "Sel et poivre", quantité: "au goût", unité: "" }
        ],
        instructions: [
          "Faire chauffer le beurre dans une poêle.",
          "Ajouter les champignons tranchés et les faire sauter jusqu'à ce qu'ils soient dorés.",
          "Ajouter les épinards et cuire jusqu'à ce qu'ils soient flétris.",
          "Battre les œufs avec la crème fraîche, le sel et le poivre.",
          "Verser le mélange d'œufs dans la poêle et cuire à feu moyen.",
          "Lorsque les œufs commencent à prendre, ajouter le fromage râpé.",
          "Poursuivre la cuisson jusqu'à ce que l'omelette soit bien prise.",
          "Servir immédiatement."
        ],
        temps_preparation: 10,
        temps_cuisson: 10,
      
        portions: 1,
        tags: ["keto", "faible en glucides", "rapide", "omelette"],
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8P9BkSci_ITixCW670UHC4J4aLsZr6sSScQ&s"
      }
    ]
  },
  {
    nom: "Sans gluten",
    recettes: [
      {
        nom: "Gâteau au Chocolat Sans Gluten",
        description: "Un délicieux gâteau au chocolat sans gluten",
        ingredients: [
          { nom: "Chocolat noir", quantité: 200, unité: "g" },
          { nom: "Beurre", quantité: 100, unité: "g" },
          { nom: "Sucre", quantité: 150, unité: "g" },
          { nom: "Œufs", quantité: 4, unité: "" },
          { nom: "Farine de riz", quantité: 100, unité: "g" },
          { nom: "Poudre d'amande", quantité: 50, unité: "g" },
          { nom: "Poudre à lever sans gluten", quantité: "1 cuillère à café", unité: "" }
        ],
        instructions: [
          "Préchauffer le four à 180°C.",
          "Faire fondre le chocolat et le beurre au bain-marie.",
          "Battre les œufs avec le sucre jusqu'à ce que le mélange blanchisse.",
          "Ajouter le mélange de chocolat fondu aux œufs et bien mélanger.",
          "Incorporer la farine de riz, la poudre d'amande et la poudre à lever.",
          "Verser la pâte dans un moule à gâteau beurré.",
          "Enfourner pendant 25-30 minutes.",
          "Laisser refroidir avant de démouler et de servir."
        ],
        temps_preparation: 15,
        temps_cuisson: 30,
    
        portions: 8,
        tags: ["sans gluten", "gâteau", "chocolat", "dessert"],
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGig6y9Pc4O0y270Bo1srEE9kmOqWNKjBGPg&s"
      }
    ]
  }
];





// Collection commentaires



// Function to add data to Firestore
//
//const addusersToFirestore = async (usersData) => {
 // try {
    // Loop through each post and add it to Firestore
  //  for (const user of usersData) {
      // Use set with merge to add or update the document
   //   await db
  //      .collection("users_forum")
        
  //      .add(user);
   // }
   // console.log("users added to Firestore successfully!");
//  } catch (error) {
 //   console.error("Error adding users to Firestore: ", error);
 // }
//};

// Call the function to add posts data to Firestore
//addusersToFirestore(usersData);

const addcatToFirestore = async (categories) => {
  try {
    // Loop through each post and add it to Firestore
    for (const user of categories) {
      // Use set with merge to add or update the document
      await db
        .collection("categories")
        
        .add(user);
    }
    console.log("users added to Firestore successfully!");
  } catch (error) {
    console.error("Error adding users to Firestore: ", error);
  }
};

// Call the function to add posts data to Firestore
addcatToFirestore(categories);