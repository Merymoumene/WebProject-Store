export let produits = JSON.parse(localStorage.getItem("produits")) || [
    {
        id: "p1",
        image: "images\\product1.jpg",
        categorie: "Exfoliation",
        titre: "Exfoliant",
        prix: 18.00,
        description: "Notre gommage au fruit de la passion est une véritable explosion de fraîcheur pour votre peau. Avec des particules naturelles qui éliminent les cellules mortes, il procure une exfoliation douce, laissant la peau douce et éclatante. Sa formule enrichie en extrait de fruit de la passion hydrate et nourrit, apportant une sensation de bien-être et de rajeunissement. Idéal pour tous les types de peau, il est l'allié parfait d'une routine de soin qui met en valeur votre beauté naturelle."
    },
    {
        id: "p2",
        image: "images\\product2.jpg",
        categorie: "Nutrition",
        titre: "Visage Sérum",
        prix: 51.00,
        description:"Le sérum facile à l'aloe vera et à la camomille est une solution légère et rafraîchissante idéale pour tous les types de peau. Formulé à base d'extraits naturels, il procure une hydratation profonde, apaisant les irritations et les rougeurs. Avec le pouvoir nourrissant de l'aloe vera et les propriétés apaisantes de la camomille, ce sérum laisse la peau radieuse et rajeunie, parfaite pour un usage quotidien."
    },
    {
        id: "p3",
        image: "images\\product3.jpg",
        categorie: "Nettoyage",
        titre: "savon liquide",
        prix: 25.00,
        description:"Le savon liquide à la lavande est un véritable joyau d'aromathérapie qui transforme votre routine de soins personnels en un rituel relaxant. Avec son parfum doux et enveloppant, il procure une sensation instantanée de tranquillité, créant un environnement propice au repos. Fabriqué à partir d'extraits naturels de lavande, ce savon nettoie non seulement la peau mais la nourrit également, la laissant douce et hydratée."
    },
    {
        id: "p4",
        image: "images\\product4.jpg",
        categorie: "Hydratation",
        titre: "Corps Crème",
        prix: 10.00,
        description: "Découvrez la délicieuse combinaison de notre crème corporelle à la mangue et à la noix de coco, une expérience sensorielle qui transformera votre routine de soins. Enrichie en extraits naturels de mangue, cette crème procure une hydratation profonde et durable, laissant la peau douce et veloutée. Le toucher doux de la noix de coco ajoute non seulement un parfum tropical irrésistible, mais aide également à nourrir votre peau, favorisant une peau saine et éclatante."
    },
    {
        id: "p5",
        image: "images\\product5.jpg",
        categorie: "Nutrition",
        titre: "Visage Huile",
        prix: 30.00,
        description: "L'huile pour le visage aux pépins de raisin est un produit naturel riche en antioxydants, idéal pour hydrater et revitaliser la peau. Sa légèreté permet une absorption rapide, procurant un toucher doux et velouté, sans laisser la peau grasse. En plus d’aider à réduire les signes du vieillissement, il aide également à uniformiser le teint, le laissant radieux et bien soigné."
    },
    {
        id: "p6",
        image: "images\\product6.jpg",
        categorie: "Nutrition",
        titre: "Capsule naturelle",
        prix: 45.00,
        description: "Les capsules de spiruline sont un complément naturel riche en nutriments, idéal pour ceux qui cherchent à augmenter leur apport en protéines et en antioxydants dans leur alimentation. Issue d'algues bleu-vert, la spiruline est connue pour ses propriétés anti-inflammatoires et son potentiel à renforcer le système immunitaire. Pratiques et efficaces, ces capsules sont un excellent ajout pour les végétaliens et les végétariens qui cherchent à équilibrer leurs besoins nutritionnels."
    },
    {
        id: "p7",
        image: "images\\product7.jpg",
        categorie: "Hydratation",
        titre: "Crème hydratante",
        prix: 132.00,
        description: "Notre crème hydratante pour le corps est une véritable explosion de nutrition pour votre peau. Enrichi en vitamines A et C, ainsi qu'en acide hyaluronique, il procure une hydratation profonde et durable, laissant votre peau douce et éclatante. La formule légère et à absorption rapide est idéale pour une utilisation quotidienne, aidant à améliorer l'élasticité de la peau et à combattre les signes du vieillissement."
    },
    {
        id: "p8",
        image: "images\\product8.jpg",
        categorie: "Hydratation",
        titre: "Huile corporelle",
        prix: 50.00,
        description: "Découvrez la délicieuse combinaison de notre crème corporelle à la mangue et à la noix de coco, une expérience sensorielle qui transformera votre routine de soins. Enrichie en extraits naturels de mangue, cette crème procure une hydratation profonde et durable, laissant la peau douce et veloutée. Le toucher doux de la noix de coco ajoute non seulement un parfum tropical irrésistible, mais aide également à nourrir votre peau, favorisant une peau saine et éclatante."
    }
];
export let categories = JSON.parse(localStorage.getItem("categories")) || ["Categories","Hydratation","Nettoyage","Nutrition","Exfoliation"]

export function saveProduits() {
    localStorage.setItem("produits", JSON.stringify(produits));
}

export function saveCategories() {
    localStorage.setItem("categories", JSON.stringify(categories));
}
//localStorage.clear();