import React from 'react';
import type { Park } from './types';
import { CastleIcon } from './components/icons/lands/CastleIcon';
import { PirateIcon } from './components/icons/lands/PirateIcon';
import { ShieldIcon } from './components/icons/lands/ShieldIcon';
import { BouncingBallIcon } from './components/icons/lands/BouncingBallIcon';
import { CompassIcon } from './components/icons/CompassIcon';
import { CowboyIcon } from './components/icons/lands/CowboyIcon';
import { RocketIcon } from './components/icons/lands/RocketIcon';
import { VictorianIcon } from './components/icons/lands/VictorianIcon';
import { CameraIcon } from './components/icons/lands/CameraIcon';
import { CrayonIcon } from './components/icons/lands/CrayonIcon';


export const ACCEPTANCE_RADIUS_METERS = 50;

export const PARKS: Park[] = [
  {
    id: 'dlp',
    name: 'Parc Disneyland',
    description: 'Le royaume enchanté où les contes de fées prennent vie.',
    grandQuest: {
      id: 'gq-dlp-1',
      title: "La Quête des Cinq Royaumes",
      description: "Un voyage épique à travers tous les lands pour restaurer la magie du parc.",
      icon: React.createElement(CompassIcon),
      narrator: "Merlin l'Enchanteur",
      prologue: "L'étoile des vœux a perdu son éclat ! Pour la raviver, vous devez retrouver les cinq fragments de magie, dispersés dans chaque royaume du parc. Seul un véritable héros peut accomplir cette quête.",
      epilogue: "Félicitations ! Grâce à vous, l'étoile des vœux brille de nouveau, et sa magie protège le parc. Vous êtes un véritable héros de Disneyland !",
      riddles: [
        { id: 'gq-r1', locationName: "Le Château de la Belle au Bois Dormant", question: "Je suis le cœur rose du royaume, où les rêves deviennent réalité. Qui suis-je ?", answer: "Château de la Belle au Bois Dormant", hint: "C'est le symbole iconique du parc.", location: { latitude: 48.8729, longitude: 2.7761 }, image: '/fantasyland1.jpg' },
        { id: 'gq-r2', locationName: "Big Thunder Mountain", question: "J'entends le train de la mine gronder sur mes flancs rouges. Où suis-je ?", answer: "Big Thunder Mountain", hint: "Le Far West vous appelle.", location: { latitude: 48.8723, longitude: 2.7738 }, image: '/frontierland1.jpg' },
        { id: 'gq-r3', locationName: "Pirates of the Caribbean", question: "Yo ho, yo ho! Une vie de pirate m'attend dans ce fort où les trésors sont cachés.", answer: "Pirates of the Caribbean", hint: "Cherchez le crâne et les os croisés.", location: { latitude: 48.8738, longitude: 2.7745 }, image: '/adventureland1.jpg' },
        { id: 'gq-r4', locationName: "Space Mountain", question: "Je vous propulse vers les étoiles depuis mon canon interstellaire. Qui suis-je ?", answer: "Space Mountain", hint: "Une aventure inspirée par Jules Verne.", location: { latitude: 48.8749, longitude: 2.7781 }, image: '/discoveryland1.jpg' },
        { id: 'gq-r5', locationName: "City Hall", question: "Je suis le premier bâtiment que vous voyez, où l'on répond à toutes vos questions. Qui suis-je ?", answer: "City Hall", hint: "C'est la mairie du parc.", location: { latitude: 48.8716, longitude: 2.7763 }, image: '/mainstreet1.jpg' },
      ],
    },
    lands: [
      {
        id: 'mainstreet',
        name: 'Main Street, U.S.A.',
        description: 'Le charme victorien d’une petite ville américaine du début du 20e siècle.',
        theme: { primary: '#be123c', accent: '#fefce8', text: '#fef2f2', containerBg: 'rgba(76, 20, 29, 0.6)', backgroundGradient: 'linear-gradient(to bottom right, #be123c, #fefce8)', buttonText: '#5b21b6' },
        quests: [],
      },
      {
        id: 'frontierland',
        name: 'Frontierland',
        description: "La conquête de l'Ouest et ses légendes.",
        theme: { primary: '#f97316', accent: '#eab308', text: '#fffbeb', containerBg: 'rgba(77, 39, 11, 0.6)', backgroundGradient: 'linear-gradient(to bottom right, #f97316, #eab308)', buttonText: '#422006' },
        quests: [],
      },
      {
        id: 'adventureland',
        name: 'Adventureland',
        description: "L'appel de l'aventure et des trésors exotiques.",
        theme: { primary: '#16a34a', accent: '#ca8a04', text: '#f0fdf4', containerBg: 'rgba(20, 35, 10, 0.6)', backgroundGradient: 'linear-gradient(to bottom right, #16a34a, #ca8a04)', buttonText: '#14532d' },
        quests: [
          {
            id: 'al-q1',
            title: "Le Trésor du Capitaine Crochet",
            description: 'Suivez la carte pour dénicher le butin des pirates.',
            icon: React.createElement(PirateIcon),
            narrator: "Capitaine Jack Sparrow",
            prologue: "Le Capitaine Crochet a caché son trésor ! Mais il a laissé derrière lui une série d'énigmes pour les pirates assez malins pour les résoudre. Serez-vous à la hauteur ?",
            epilogue: "Vous avez trouvé le trésor ! Vous êtes un vrai pirate d'Adventureland. Mais attention, le Capitaine Crochet reviendra sûrement pour se venger !",
            riddles: [
              { id: 'al-r1', locationName: "La Cabane des Robinson", question: "Je suis une maison dans les arbres, construite après un naufrage.", answer: "La Cabane des Robinson", hint: "Vous pouvez y grimper pour avoir une vue imprenable.", location: { latitude: 48.8732, longitude: 2.7743 }, image: '/adventureland2.jpg' },
              { id: 'al-r2', locationName: "Le Galion des Pirates", question: "Je suis un grand bateau de pirates amarré près d'un crâne de pierre.", answer: "Le Galion des Pirates", hint: "Il ne navigue plus, mais on peut monter à bord.", location: { latitude: 48.8736, longitude: 2.7748 }, image: '/adventureland3.jpg' },
            ],
          },
        ],
      },
      {
        id: 'fantasyland',
        name: 'Fantasyland',
        description: 'Là où les contes de fées prennent vie.',
        theme: { primary: '#e11d48', accent: '#fde047', text: '#fce7f3', containerBg: 'rgba(59, 7, 100, 0.6)', backgroundGradient: 'linear-gradient(to bottom right, #e11d48, #fde047)', buttonText: '#1e1b4b' },
        quests: [
          {
            id: 'fl-q1',
            title: 'Le Secret de la Rose Enchantée',
            description: 'Aidez Belle à percer les mystères du château de la Bête.',
            icon: React.createElement(CastleIcon),
            narrator: "Belle",
            prologue: "La Rose Enchantée perd ses pétales ! Retrouvez les objets magiques oubliés par les personnages de contes de fées pour lui redonner sa puissance.",
            epilogue: "Grâce à vous, la Rose est sauvée ! La magie de l'amour et de l'amitié triomphe toujours à Fantasyland.",
            riddles: [
              { id: 'fl-r1', locationName: "Labyrinthe d'Alice", question: "Pour trouver la Reine de Cœur, il faut se perdre. Où suis-je ?", answer: "Labyrinthe d'Alice", hint: "Attention à ne pas perdre la tête !", location: { latitude: 48.8737, longitude: 2.7770 }, image: '/fantasyland2.jpg' },
              { id: 'fl-r2', locationName: "Le Carrousel de Lancelot", question: "Je tourne en rond sur un cheval de bois, au son d'une musique joyeuse.", answer: "Carrousel de Lancelot", hint: "C'est un manège classique près du château.", location: { latitude: 48.8728, longitude: 2.7758 }, image: '/fantasyland3.jpg' },
            ],
          },
        ],
      },
      {
        id: 'discoveryland',
        name: 'Discoveryland',
        description: 'Les visions du futur, de Jules Verne à Star Wars.',
        theme: { primary: '#6366f1', accent: '#06b6d4', text: '#e0e7ff', containerBg: 'rgba(24, 24, 58, 0.6)', backgroundGradient: 'linear-gradient(to bottom right, #6366f1, #06b6d4)', buttonText: '#1e1b4b' },
        quests: [],
      },
    ],
  },
  {
    id: 'wds',
    name: 'Walt Disney Studios',
    description: "Passez derrière l'écran et découvrez la magie du cinéma.",
    lands: [
      {
        id: 'frontlot',
        name: 'Front Lot',
        description: "Les coulisses d'un studio hollywoodien des années 30.",
        theme: { primary: '#ca8a04', accent: '#f8fafc', text: '#fefce8', containerBg: 'rgba(28, 25, 23, 0.6)', backgroundGradient: 'linear-gradient(to bottom right, #ca8a04, #f8fafc)', buttonText: '#1c1917' },
        quests: [],
      },
      {
        id: 'toonstudio',
        name: 'Toon Studio',
        description: "Là où les personnages d'animation prennent vie.",
        theme: { primary: '#10b981', accent: '#f472b6', text: '#ecfdf5', containerBg: 'rgba(6, 41, 25, 0.6)', backgroundGradient: 'linear-gradient(to bottom right, #10b981, #f472b6)', buttonText: '#064e3b' },
        quests: [],
      },
      {
        id: 'pixar',
        name: 'Worlds of Pixar',
        description: 'Plongez dans les mondes colorés de Pixar.',
        theme: { primary: '#2563eb', accent: '#ef4444', text: '#dbeafe', containerBg: 'rgba(30, 27, 75, 0.6)', backgroundGradient: 'linear-gradient(to bottom right, #2563eb, #ef4444)', buttonText: '#1e3a8a' },
        quests: [
          {
            id: 'px-q1',
            title: 'Le Festival des Amis',
            description: 'Aidez Buzz et Woody à organiser une grande fête.',
            icon: React.createElement(BouncingBallIcon),
            narrator: "Buzz l'Éclair",
            prologue: "C'est le jour du grand Festival de l'Amitié, mais tous les jouets se sont éparpillés ! Retrouvez-les pour que la fête puisse commencer.",
            epilogue: "Mission accomplie ! Tous les amis sont réunis et la fête est un succès. Vers l'infini et au-delà !",
            riddles: [
              { id: 'px-r1', locationName: "Crush's Coaster", question: "Je surfe sur le courant Est-Australien dans une carapace qui tourne.", answer: "Crush's Coaster", hint: "Dude! C'est une attraction populaire avec une tortue.", location: { latitude: 48.8687, longitude: 2.7808 }, image: '/pixar1.jpg' },
              { id: 'px-r2', locationName: "Ratatouille: L'Aventure Totalement Toquée de Rémy", question: "Je suis un rat qui rêve de devenir un grand chef à Paris.", answer: "Ratatouille", hint: "L'attraction se trouve sur une place parisienne reconstituée.", location: { latitude: 48.8683, longitude: 2.7791 }, image: '/pixar2.jpg' },
            ],
          },
        ],
      },
      {
        id: 'avengers',
        name: 'Avengers Campus',
        description: 'Rejoignez les héros les plus puissants de la Terre.',
        theme: { primary: '#dc2626', accent: '#3b82f6', text: '#fee2e2', containerBg: 'rgba(76, 29, 29, 0.6)', backgroundGradient: 'linear-gradient(to bottom right, #dc2626, #3b82f6)', buttonText: '#991b1b' },
        quests: [
          {
            id: 'av-q1',
            title: 'Code Rouge',
            description: 'Aidez les Avengers à déjouer une menace imminente.',
            icon: React.createElement(ShieldIcon),
            narrator: "Tony Stark",
            prologue: "ALERTE ROUGE ! Une faille interdimensionnelle s'est ouverte au-dessus du Campus. Aidez Iron Man à trouver les régulateurs d'énergie pour la refermer.",
            epilogue: "Vous avez sauvé le Campus ! Les Avengers sont fiers de vous. Vous êtes officiellement une recrue d'honneur.",
            riddles: [
              { id: 'av-r1', locationName: "Spider-Man W.E.B. Adventure", question: "J'aide un jeune héros à capturer des robots-araignées devenus fous.", answer: "Spider-Man W.E.B. Adventure", hint: "Worldwide Engineering Brigade.", location: { latitude: 48.8699, longitude: 2.7816 }, image: '/avengers1.jpg' },
              { id: 'av-r2', locationName: "Avengers Assemble: Flight Force", question: "Je vole aux côtés d'Iron Man et Captain Marvel pour sauver le monde.", answer: "Avengers Assemble: Flight Force", hint: "C'est une montagne russe très rapide et dans le noir.", location: { latitude: 48.8704, longitude: 2.7811 }, image: '/avengers2.jpg' },
            ],
          },
        ],
      },
    ],
  }
];