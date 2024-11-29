import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import { Star, StarHalf, StarBorder } from '@mui/icons-material';
import Button from '@mui/material/Button';

const breakfastCardData = [[
  {
    title: 'Deluxe Blueberry Pancakes',
    tags: [ 'Main Courses', 'Fruit', 'Breakfast & Brunch' ],
    description: 'Fresh fruit and a diner trick take the most beloved of flapjacks to the next level.',
    imageurl: 'https://res.cloudinary.com/hksqkdlah/image/upload/ar_1:1,c_fill,dpr_2.0,f_auto,fl_lossy.progressive.strip_profile,g_faces:auto,q_auto:low,w_344/SFS_Buttermilk_Blueberry_Pancakes_428_bnruvy',
    rating: '4.5',
    ratingcount: '139',
    timeAndServings: 'SERVES: 4 (Makes 12 pancakes)\nTIME: 45 minutes',
    ingredients: [
      '2 tablespoons unsalted butter,  plus 3 tablespoons melted and cooled slightly',
      '2 cups (10 ounces/283 grams) all-purpose flour',
      '3 tablespoons malted milk powder',
      '2 tablespoons sugar',
      '2 teaspoons baking powder ',
      '½ teaspoon baking soda',
      '½ teaspoon table salt',
      '2 cups buttermilk',
      '1  large egg',
      '7½ ounces (213 grams/1½ cups) blueberries',
      '½ teaspoon vegetable oil '
    ],
    steps: [
      'If planning on serving all pancakes at once, set wire rack in rimmed baking sheet and heat oven to 200 degrees',
      'Cut 2 tablespoons butter into ½-tablespoon pieces and set aside',
      'Whisk flour, milk powder, sugar, baking powder, baking soda, and salt together in medium bowl',
      "Whisk buttermilk, egg, and melted butter together in second medium bowl (it's OK if butter forms clumps)",
      'Make well in center of flour mixture and add buttermilk mixture; whisk until just combined (a few lumps should remain)',
      'Fold in blueberries.',
      'Heat oil in 12-inch nonstick skillet over medium-low heat until shimmering',
      'Using paper towels, carefully wipe out oil, leaving thin film on bottom and sides of skillet',
      'Drop 1 tablespoon batter in center of skillet',
      'If pancake is pale golden brown after 1 minute, skillet is ready',
      'If it is too light or too dark, adjust heat accordingly',
      'Discard pancake.',
      'Melt ½ tablespoon butter in now-empty skillet and use spatula to spread over surface',
      'When butter is sizzling, use ⅓-cup dry measuring cup or slightly mounded 2-ounce (#16) portion scoop to portion batter into skillet in 3 places',
      'Using back of cup or scoop, gently spread each portion into 4½-inch round',
      'Cook until edges are set and first side is deep golden brown (coloring will not be even), 2 to 3 minutes',
      'Using thin, wide spatula, flip pancakes and continue to cook until bottoms are just set, about 1 minute longer',
      'Gently slide pancakes around skillet to collect butter',
      'Cook until second sides are deep golden brown, 1 to 1½ minutes',
      'Serve pancakes immediately, or transfer to prepared wire rack and place in oven to keep warm',
      'Repeat with remaining butter and batter in 3 batches.'
    ],
    recipeUrl: 'https://www.americastestkitchen.com/recipes/14903'
  },
  {
    title: 'Leek and Goat Cheese Quiche',
    tags: [
      'Main Courses',
      'Europe',
      'French',
      'Fruits & Vegetables',
      'Eggs & Dairy',
      'Vegetables',
      'Eggs',
      'Cheese',
      'Vegetarian',
      'Breakfast & Brunch',
      'Savory Pies & Tarts'
    ],
    description: 'By using the proper combination of heavy cream, milk, whole eggs, and egg yolks, you can produce a custard that makes quiche worth eating once again.',
    imageurl: 'https://res.cloudinary.com/hksqkdlah/image/upload/ar_1:1,c_fill,dpr_2.0,f_auto,fl_lossy.progressive.strip_profile,g_faces:auto,q_auto:low,w_344/35610_sfs-quiche-with-leeks-and-goat-cheese-014',
    rating: '4.5',
    ratingcount: '101',
    timeAndServings: 'SERVES: 8\nTIME: 1 hour',
    ingredients: [
      '2  medium leeks white and light-green parts only, halved lengthwise, cut into 1/2-inch pieces, and washed thoroughly (about 2 cups)',
      '2 tablespoons unsalted butter',
      '2  large eggs',
      '2  large egg yolks',
      '¾ cup whole milk',
      '¾ cup heavy cream',
      '½ teaspoon table salt',
      '½ teaspoon ground white pepper',
      'pinch fresh grated nutmeg',
      '1  Prebaked Pie Shell (warm), baked until light golden brown, 5 to 6 minutes',
      '4 ounces mild goat cheese broken into 1/2-inch pieces'
    ],
    steps: [
      'Adjust oven rack to center position and heat oven to 375 degrees',
      'Sauté white parts leeks in butter over medium heat until soft, 5–7 minutes',
      'Meanwhile, whisk all remaining ingredients except goat cheese in medium bowl.',
      'Spread goat cheese and leeks evenly over bottom of warm pie shell and set shell on oven rack',
      'Pour in custard mixture to 1/2-inch below crust rim',
      'Bake until lightly golden brown and a knife blade inserted about one inch from the edge comes out clean, and center feels set but soft like gelatin, 32 to 35 minutes',
      'Transfer quiche to rack to cool',
      'Serve warm or at room temperature.'
    ],
    recipeUrl: 'https://www.americastestkitchen.com/recipes/1335'
  },
]];

const lunchCardData = [[
  {
    title: 'Chicken and Dumplings',
    tags: [
      'Main Courses',
      'US & Canada',
      'American',
      'Southern',
      'Poultry',
      'Chicken',
      'Stews'
    ],
    description: 'Our goal was to develop a dumpling that was light, substantial, tender, and durable. We also wanted to make a complete meal in one dish.',
    imageurl: 'https://res.cloudinary.com/hksqkdlah/image/upload/ar_1:1,c_fill,dpr_2.0,f_auto,fl_lossy.progressive.strip_profile,g_faces:auto,q_auto:low,w_344/1337_cvr-sfs-bstchixdumpsup-col0018-article',
    rating: '4',
    ratingcount: '202',
    timeAndServings: 'SERVES: Serve 6 to 8',
    ingredients: [
      '5 pounds bone-in, skin-on chicken thighs',
      '4 teaspoons vegetable oil ',
      '4 tablespoons unsalted butter (1/2 stick)',
      '4  carrots,  peeled and sliced 1/4 inch thick',
      '2 ribs celery,  sliced 1/4 inch thick',
      '1  large onion,  minced',
      '6 tablespoon unbleached all-purpose flour',
      '¼ cup dry sherry ',
      '4 ½ cups low-sodium chicken broth',
      '¼ cup heavy cream',
      '1 teaspoon minced fresh thyme leaves',
      '2  bay leaves',
      '1 cup frozen green peas',
      '3 tablespoons minced fresh parsley leaves',
      '2 cups unbleached all-purpose flour',
      '1 tablespoon baking powder ',
      '1 teaspoon table salt',
      '1 cup whole milk',
      '3 tablespoons reserved chicken fat (or unsalted butter)'
    ],
    steps: [
      'FOR THE STEW: Pat the chicken dry with paper towels, then season with salt and pepper',
      'Heat 2 teaspoons of the oil in a large Dutch oven over medium-high heat until just smoking',
      'Add half of the chicken and cook until golden on both sides, about 10 minutes',
      'Transfer the chicken to a plate and remove the browned skin',
      'Pour off the chicken fat and reserve',
      'Return the pot to medium-high heat and repeat with the remaining 2 teaspoons oil and the remaining chicken',
      'Pour off and reserve any chicken fat.',
      'Add the butter to the Dutch oven and melt over medium-high heat',
      'Add the carrots, celery, onion, and 1/4 teaspoon salt and cook until softened, about 7 minutes',
      'Stir in the flour',
      'Whisk in the sherry, scraping up any browned bits',
      'Stir in the broth, milk, thyme, and bay leaves',
      'Nestle the chicken, with any accumulated juices, into the pot',
      'Cover and simmer until the chicken is fully cooked and tender, about 1 hour.',
      'Transfer the chicken to a cutting board',
      'Discard the bay leaves',
      'Allow the sauce to settle for a few minutes, then skim the fat from the surface using a wide spoon',
      'Shred the chicken, discarding the bones, then return it to the stew.',
      'FOR THE DUMPLINGS: Stir the flour, baking powder, and salt together',
      'Microwave the milk and fat in a microwave-safe bowl on high until just warm (do not over-heat), about 1 minute',
      'Stir the warmed milk mixture into the flour mixture with a wooden spoon until incorporated and smooth.',
      'Return the stew to a simmer, stir in the peas and parsley, and season with salt and pepper',
      'Following the photos below, drop golf-ball-sized dumplings over the top of the stew, about 1/4 inch apart (you should have about 18 dumplings)',
      'Reduce the heat to low, cover, and cook until the dumplings have doubled in size, 15 to 18 minutes',
      'Serve.'
    ],
    recipeUrl: 'https://www.americastestkitchen.com/recipes/2295'
  },
  {
    title: 'Quesabirria Tacos',
    tags: [
      'Main Courses',
      'Latin America & Caribbean',
      'Mexican',
      'Fruits & Vegetables',
      'Meat',
      'Vegetables',
      'Beef'
    ],
    description: 'A Tucson original with its own spin.',
    imageurl: 'https://res.cloudinary.com/hksqkdlah/image/upload/ar_1:1,c_fill,dpr_2.0,f_auto,fl_lossy.progressive.strip_profile,g_faces:auto,q_auto:low,w_344/SFS_QuesabirriaTacos-102_mdfc7i',
    rating: '4',
    ratingcount: '269',
    timeAndServings: 'SERVES: 4 to 6\nTIME: 4 hours, plus 30 minutes resting',
    ingredients: [
      '3½ pounds boneless beef chuck roast or short ribs, untrimmed, cut into 2- to 3-inch pieces',
      '2 quarts water',
      '1½ ounces  dried guajillo chiles,  stemmed and seeded',
      '1  onion,  quartered',
      '¼ cup vegetable oil ',
      '8  garlic cloves,  smashed and peeled',
      '2 tablespoons paprika ',
      '4 teaspoons onion powder',
      '4 teaspoons granulated garlic',
      '4 teaspoons table salt',
      '1 tablespoon Mexican oregano',
      '1 tablespoon ground coriander',
      '2 teaspoons pepper',
      '½ teaspoon ground cinnamon ',
      '4  bay leaves',
      '1 teaspoon vegetable oil ',
      '12 (6-inch) yellow corn tortillas ',
      '12 ounces block mozzarella cheese,  shredded (3 cups)',
      '1 cup chopped red onion',
      '1 cup coarsely chopped fresh cilantro,  plus extra for serving'
    ],
    steps: [
      'FOR THE BIRRIA: Combine all ingredients in Dutch oven and bring to boil over high heat',
      'Cover; reduce heat to medium-low; and simmer until meat is tender, about 2½ hours',
      'Off heat, let meat rest in broth for 30 minutes',
      'Using ladle, skim fat from surface of birria broth and transfer it to shallow dish or wide-mouthed bowl; set aside.',
      'Using tongs or slotted spoon, transfer meat to large bowl',
      'Using tongs or potato masher, smash meat until finely shredded; set aside.',
      'Using immersion blender, process birria broth mixture until smooth, about 3 minutes',
      '(If using jar blender, fill only halfway for each batch, especially if broth is hot',
      'Process until smooth, about 20 seconds per batch.) Strain processed broth through fine-mesh strainer set over large saucepan; discard solids.',
      'Stir 2 cups birria broth into shredded birria meat',
      'Season with salt and pepper to taste and cover with aluminum foil to keep warm',
      'Season remaining broth with salt and pepper to taste and place over low heat to keep warm.',
      'FOR THE TACOS: Heat oil in 12-inch nonstick skillet over medium heat until shimmering',
      'Drag 1 side of 3 tortillas through reserved birria fat and place tortillas in skillet, fat side down (tortillas will overlap slightly)',
      'Top each tortilla evenly with ¼ cup mozzarella',
      'Spread scant ¼ cup birria meat over half of each tortilla',
      'Cook until most of cheese has melted, 2 to 3 minutes.',
      'Sprinkle red onion and cilantro to taste over each taco, then fold nonmeat half of tortilla over meat using spatula and tongs',
      'Cook tacos until crisp on both sides, 1 to 2 minutes per side',
      'Transfer tacos to serving dishes',
      'Wipe skillet clean with paper towels',
      'Repeat with remaining tortillas, fat, mozzarella, meat, red onion, and cilantro',
      "(You needn't reapply vegetable oil to skillet.) (Extra meat can be refrigerated for up to 4 days.)",
      'Portion ½ cup warm birria broth into each of 4 to 6 small crocks (1 for each person) and sprinkle with cilantro to taste',
      '(Extra broth can be refrigerated for up to 4 days.) Serve tacos with broth; dunk tacos in broth before each bite.'
    ],
    recipeUrl: 'https://www.americastestkitchen.com/recipes/15407'
  },
]];

const dinnerCardData = [[
  {
    title: 'Murgh Makhani (Indian Butter Chicken)',
    tags: [ 'Main Courses', 'Asia', 'Indian', 'Poultry', 'Chicken' ],
    description: 'Of course it should be rich and creamy. But for a version of this restaurant classic that’s vibrant and complex, there’s more to consider than the namesake ingredient.  ',
    imageurl: 'https://res.cloudinary.com/hksqkdlah/image/upload/ar_1:1,c_fill,dpr_2.0,f_auto,fl_lossy.progressive.strip_profile,g_faces:auto,q_auto:low,w_344/43960-sfs-indian-butter-chicken-for-two-35-1',
    rating: '4.5',
    ratingcount: '1075',
    timeAndServings: 'SERVES: 4 to 6\nTIME: 1 hour',
    ingredients: [
      '4 tablespoons unsalted butter,  cut into 4 pieces and chilled, divided',
      '1  onion,  chopped fine',
      '5  garlic cloves,  minced',
      '4 teaspoons grated fresh ginger',
      '1  serrano chile,  stemmed, seeded, and minced',
      '1 tablespoon garam masala ',
      '1 teaspoon ground coriander',
      '½ teaspoon ground cumin ',
      '½ teaspoon pepper',
      '1 ½ cups water',
      '½ cup tomato paste ',
      '1 tablespoon sugar',
      '2 teaspoons table salt,  divided',
      '1 cup heavy cream',
      '2 pounds boneless, skinless chicken thighs,  trimmed',
      '½ cup plain Greek yogurt ',
      '3 tablespoons chopped fresh cilantro,  divided'
    ],
    steps: [
      'Melt 2 tablespoons butter in large saucepan over medium heat',
      'Add onion, garlic, ginger, and serrano and cook, stirring frequently, until mixture is softened and onion begins to brown, 8 to 10 minutes',
      'Add garam masala, coriander, cumin, and pepper and cook, stirring frequently, until fragrant, about 3 minutes',
      'Add water and tomato paste and whisk until no lumps of tomato paste remain',
      'Add sugar and 1 teaspoon salt and bring to boil',
      'Off heat, stir in cream',
      'Using immersion blender or blender, process until smooth, 30 to 60 seconds',
      'Return sauce to simmer over medium heat and whisk in remaining 2 tablespoons butter',
      'Remove saucepan from heat and cover to keep warm',
      '(Sauce can be refrigerated for up to 4 days; gently reheat sauce before adding hot chicken.)',
      'Adjust oven rack 6 inches from broiler element and heat broiler',
      'Combine chicken, yogurt, and remaining 1 teaspoon salt in bowl and toss well to coat',
      'Using tongs, transfer chicken to wire rack set in aluminum foil—lined rimmed baking sheet',
      'Broil until chicken is evenly charred on both sides and registers 175 degrees, 16 to 20 minutes, flipping chicken halfway through broiling.',
      'Let chicken rest for 5 minutes',
      'While chicken rests, warm sauce over medium-low heat',
      'Cut chicken into ¾-inch chunks and stir into sauce',
      'Stir in 2 tablespoons cilantro and season with salt to taste',
      'Transfer to serving dish, sprinkle with remaining 1 tablespoon cilantro, and serve.'
    ],
    recipeUrl: 'https://www.americastestkitchen.com/recipes/11519'
  },
  {
    title: 'Salmon Piccata',
    tags: [ 'Main Courses', 'Italian', 'Fish & Seafood', 'Weeknight' ],
    description: 'This classic savory sauce takes salmon in a fresh new direction.',
    imageurl: 'https://res.cloudinary.com/hksqkdlah/image/upload/ar_1:1,c_fill,dpr_2.0,f_auto,fl_lossy.progressive.strip_profile,g_faces:auto,q_auto:low,w_344/SFS_SalmonPiccata_37_xwji2y',
    rating: '4',
    ratingcount: '345',
    timeAndServings: 'SERVES: 4\nTIME: 40 minutes',
    ingredients: [
      '1 (2-pound) center-cut skinless salmon fillet,  about 1½ inches thick',
      '1 teaspoon table salt,  divided',
      '1 teaspoon pepper,  divided',
      '1 tablespoon extra-virgin olive oil',
      '3  garlic cloves,  sliced thin',
      '2 teaspoons all-purpose flour',
      '½ cup dry white wine',
      '¼ cup water',
      '2 tablespoons capers,  rinsed',
      '1 teaspoon grated lemon zest plus 1 tablespoon juice',
      '4 tablespoons unsalted butter,  cut into 4 pieces',
      '3 tablespoons chopped fresh dill'
    ],
    steps: [
      'Cut salmon crosswise into 4 equal fillets',
      'Pat salmon dry with paper towels and sprinkle all over with ½ teaspoon salt and ½ teaspoon pepper.',
      'Heat oil in 12-inch nonstick skillet over medium-high heat until just smoking',
      'Add salmon flesh side down',
      'Cover and cook until browned on bottom and registering 125 degrees (for medium-rare), about 5 minutes, or 135 degrees (for medium), about 7 minutes',
      'Remove skillet from heat and transfer salmon, browned side up, to platter or individual plates.',
      'Return skillet to medium heat',
      'Add garlic and cook until fragrant, about 30 seconds',
      'Stir in flour and cook for 15 seconds',
      'Whisk in wine, water, capers, lemon zest and juice, remaining ½ teaspoon salt, and remaining ½ teaspoon pepper',
      'Bring to boil and cook for 30 seconds.',
      'Off heat, whisk in butter, 1 piece at a time, until combined',
      'Stir in dill',
      'Spoon sauce over salmon',
      'Serve.'
    ],
    recipeUrl: 'https://www.americastestkitchen.com/recipes/13772'
  },
]];

const dessertCardData = [[
  {
    title: 'French Apple Tart',
    tags: [
      'Desserts or Baked Goods',
      'Fruit',
      'Make Ahead',
      'Tarts',
      'Fruit Desserts'
    ],
    description: 'Classic form and good looks are compulsory for a holiday centerpiece, but they don’t matter if the dessert falls apart when you serve it. We wanted integrity with the beauty.',
    imageurl: 'https://res.cloudinary.com/hksqkdlah/image/upload/ar_1:1,c_fill,dpr_2.0,f_auto,fl_lossy.progressive.strip_profile,g_faces:auto,q_auto:low,w_344/22419_sfs-french-apple-tart-15',
    rating: '4.5',
    ratingcount: '96',
    timeAndServings: 'SERVES: 8\nTIME: 2½ hours, plus 1½ hours cooling',
    ingredients: [
      '1 ⅓ cups (6 2/3 ounces/189 grams) all-purpose flour',
      '5 tablespoons (2 1/4 ounces/64 grams) sugar',
      '½ teaspoon salt',
      '10 tablespoons unsalted butter,  melted',
      '10  Golden Delicious apples (8 ounces each), peeled and cored',
      '3 tablespoons unsalted butter',
      '1 tablespoon water',
      '½ cup apricot preserves',
      '¼ teaspoon salt'
    ],
    steps: [
      'FOR THE CRUST: Adjust 1 oven rack to lowest position and second rack 5 to 6 inches from broiler element',
      'Heat oven to 350 degrees',
      'Whisk flour, sugar, and salt together in bowl',
      'Add melted butter and stir with wooden spoon until dough forms',
      'Using your hands, press two-thirds of dough into bottom of 9-inch tart pan with removable bottom',
      'Press remaining dough into fluted sides of pan',
      'Press and smooth dough with your hands to even thickness',
      'Place pan on wire rack set in rimmed baking sheet and bake on lowest rack, until crust is deep golden brown and firm to touch, 30 to 35 minutes, rotating pan halfway through baking',
      'Set aside until ready to fill.',
      'FOR THE FILLING: Cut 5 apples lengthwise into quarters and cut each quarter lengthwise into 4 slices',
      'Melt 1 tablespoon butter in 12-inch skillet over medium heat',
      'Add apple slices and water and toss to combine',
      'Cover and cook, stirring occasionally, until apples begin to turn translucent and are slightly pliable, 3 to 5 minutes',
      'Transfer apples to large plate, spread into single layer, and set aside to cool',
      'Do not clean skillet.',
      'While apples cook, microwave apricot preserves until fluid, about 30 seconds',
      'Strain preserves through fine-mesh strainer into small bowl, reserving solids',
      'Set aside 3 tablespoons strained preserves for brushing tart.',
      'Cut remaining 5 apples into 1/2-inch-thick wedges',
      'Melt remaining 2 tablespoons butter in now-empty skillet over medium heat',
      'Add remaining apricot preserves, reserved apricot solids, apple wedges, and salt',
      'Cover and cook, stirring occasionally, until apples are very soft, about 10 minutes.',
      'Mash apples to puree with potato masher',
      'Continue to cook, stirring occasionally, until puree is reduced to 2 cups, about 5 minutes.',
      'Transfer apple puree to baked tart shell and smooth surface',
      'Select 5 thinnest slices of sautéed apple and set aside',
      'Starting at outer edge of tart, arrange remaining slices, tightly overlapping, in concentric circles',
      'Bend reserved slices to fit in center',
      'Bake tart, still on wire rack in sheet, on lowest rack, for 30 minutes',
      'Remove tart from oven and heat broiler.',
      'While broiler heats, warm reserved preserves in microwave until fluid, about 20 seconds',
      'Brush evenly over surface of apples, avoiding tart crust',
      'Broil tart, checking every 30 seconds and turning as necessary, until apples are attractively caramelized, 1 to 3 minutes',
      'Let tart cool for at least 1 1/2 hours',
      'Remove outer metal ring of tart pan, slide thin metal spatula between tart and pan bottom, and carefully slide tart onto serving platter',
      'Cut into wedges and serve.\n' +
        'TO MAKE AHEAD: The baked crust, apple slices, and apple puree can be made up to 24 hours in advance',
      'Apple slices and apple puree should be refrigerated separately in airtight containers',
      'Assemble tart with refrigerated apple slices and puree and bake as directed, adding 5 minutes to baking time.'
    ],
    recipeUrl: 'https://www.americastestkitchen.com/recipes/8114'
  },
  {
    title: "Millionaire's Shortbread",
    tags: [
      'Desserts or Baked Goods',
      'Great Britain',
      'Chocolate',
      'Make Ahead',
      'Brownies & Bars'
    ],
    description: 'Britain’s triple-decker combo of buttery cookie, sweet caramel, and dark chocolate makes a perfect holiday gift. But only if every layer is flawless.',
    imageurl: 'https://res.cloudinary.com/hksqkdlah/image/upload/ar_1:1,c_fill,dpr_2.0,f_auto,fl_lossy.progressive.strip_profile,g_faces:auto,q_auto:low,w_344/SFS_Millionaire_Shortbread_418_1_fi4esc',
    rating: '4.5',
    ratingcount: '583',
    timeAndServings: 'SERVES: Makes 40 cookies\nTIME: 1¾ hours, plus 1½ hours cooling',
    ingredients: [
      '2 ½ cups (12 1/2 ounces/354 grams) all-purpose flour',
      '½ cup (3 1/2 ounces/99 grams) granulated sugar',
      '¾ teaspoon salt',
      '16 tablespoons unsalted butter,  melted',
      '1  (14-ounce) can sweetened condensed milk',
      '1 cup packed (7 ounces/198 grams) brown sugar',
      '½ cup heavy cream',
      '½ cup corn syrup',
      '8 tablespoons unsalted butter',
      '½ teaspoon salt',
      '8 ounces (227 grams) bittersweet chocolate (6 ounces [170 grams] chopped fine, 2 ounces [57 grams] grated)'
    ],
    steps: [
      'FOR THE CRUST: Adjust oven rack to lower-middle position and heat oven to 350 degrees',
      'Make foil sling for 13 by 9-inch baking pan by folding 2 long sheets of aluminum foil; first sheet should be 13 inches wide and second sheet should be 9 inches wide',
      'Lay sheets of foil in pan perpendicular to each other, with extra foil hanging over edges of pan',
      'Push foil into corners and up sides of pan, smoothing foil flush to pan',
      'Combine flour, sugar, and salt in medium bowl',
      'Add melted butter and stir with rubber spatula until flour is evenly moistened',
      'Crumble dough evenly over bottom of prepared pan',
      'Using your fingertips and palm of your hand, press and smooth dough into even thickness',
      'Using fork, pierce dough at 1-inch intervals',
      'Bake until light golden brown and firm to touch, 25 to 30 minutes',
      'Transfer pan to wire rack',
      'Using sturdy metal spatula, press on entire surface of warm crust to compress (this will make finished bars easier to cut)',
      'Let crust cool until it is just warm, at least 20 minutes.',
      'FOR THE FILLING: Stir all ingredients together in large, heavy-bottomed saucepan',
      'Cook over medium heat, stirring frequently, until mixture registers between 236 and 239 degrees (temperature will fluctuate), 16 to 20 minutes',
      'Pour over crust and spread to even thickness (mixture will be very hot)',
      'Let cool completely, about 1 1/2 hours.',
      'FOR THE CHOCOLATE: Microwave chopped chocolate in bowl at 50 percent power, stirring every 15 seconds, until melted but not much warmer than body temperature (check by holding in palm of your hand), 1 to 2 minutes',
      'Add grated chocolate and stir until smooth, returning to microwave for no more than 5 seconds at a time to finish melting if necessary',
      'Spread chocolate evenly over surface of filling',
      'Refrigerate shortbread until chocolate is just set, about 10 minutes.',
      'Using foil overhang, lift shortbread out of pan and transfer to cutting board; discard foil',
      'Using serrated knife and gentle sawing motion, cut shortbread in half crosswise to create two 6 1/2 by 9-inch rectangles',
      'Cut each rectangle in half to make four 3 1/4 by 9-inch strips',
      'Cut each strip crosswise into 10 equal pieces',
      '(Shortbread can be stored at room temperature, between layers of parchment, for up to 1 week.)'
    ],
    recipeUrl: 'https://www.americastestkitchen.com/recipes/9253'
  },
]];



const allCategoryCardData = [[
  {
    title: 'Southern-Style Buttermilk Cornbread',
    tags: [ 'Main Courses', 'Grains', 'Quick Breads' ],
    description: 'Cornbread is not hard to make, but a little care and attention to detail will get you better results.',
    imageurl: 'https://res.cloudinary.com/hksqkdlah/image/upload/ar_1:1,c_fill,dpr_2.0,f_auto,fl_lossy.progressive.strip_profile,g_faces:auto,q_auto:low,w_344/SFS_SouthernStyleCastIronSkilletCornbread-28_fhvwze',
    rating: '3',
    ratingcount: '15',
    timeAndServings: 'SERVES: 8\nTIME: 1 hour',
    ingredients: [
      '1 tablespoon lard for pan, plus 8 tablespoons melted and cooled',
      '1½ cups (7½ ounces / 213 grams) cornmeal,  divided',
      '¾ cup (3¾ ounces / 106 grams) all-purpose flour',
      '2½ tablespoons sugar',
      '1½ teaspoons table salt',
      '1¼ teaspoons baking powder ',
      '¾ teaspoon baking soda',
      '1¾ cups buttermilk,  chilled, divided',
      '2  large eggs'
    ],
    steps: [
      'Adjust oven rack to upper-middle position and heat oven to 450 degrees',
      'Place 1 tablespoon lard in 10-inch cast-iron skillet and set on oven rack',
      'Whisk 1 cup cornmeal, flour, sugar, salt, baking powder, and baking soda together in medium bowl.',
      'Whisk 1 cup buttermilk and remaining ½ cup cornmeal together in large bowl and microwave for 1½ minutes',
      'Whisk thoroughly and continue to microwave, whisking every 30 seconds, until thickened to batter-like consistency (whisk will leave channel in bottom of bowl that slowly fills in), 1 to 3 minutes longer',
      'Whisk in melted lard until smooth, then whisk in remaining ¾ cup buttermilk until evenly combined',
      'Whisk in eggs until combined',
      'Fold in flour mixture until thoroughly combined.',
      'Using pot holders, remove skillet from oven and gently swirl to evenly coat pan with lard',
      'Carefully transfer batter to skillet, smooth top with spatula, and return skillet to oven',
      'Bake until top begins to crack, sides are golden brown, and toothpick inserted in center comes out clean, 16 to 18 minutes.',
      'Let cornbread cool in skillet for 5 minutes',
      'Using pot holders, carefully turn cornbread out of skillet onto wire rack, then gently flip cornbread right side up onto rack',
      'Let cool 15 minutes longer',
      'Serve'
    ],
    recipeUrl: 'https://www.americastestkitchen.com/recipes/16619'
  },
  {
    title: 'Steak Tips with Pumpkin Risotto',
    tags: [ 'Main Courses', 'Vegetables', 'Rice', 'Beef', 'Weeknight' ],
    description: 'Canned pumpkin adds flavor and color to this fall dinner.',
    imageurl: 'https://res.cloudinary.com/hksqkdlah/image/upload/ar_1:1,c_fill,dpr_2.0,f_auto,fl_lossy.progressive.strip_profile,g_faces:auto,q_auto:low,w_344/SFS_Steak_Tips_with_Pumpkin_Risotto-22919_wfokok',
    rating: '4',
    ratingcount: '108',
    timeAndServings: 'SERVES: 4\nTIME: 40 minutes',
    ingredients: [
      '4 cups chicken broth,  divided',
      '1 cup arborio rice',
      '6 tablespoons unsalted butter,  divided',
      '2 pounds sirloin steak tips,  trimmed and cut into 2-inch chunks',
      '1 3⁄4 teaspoons table salt,  divided',
      '1 teaspoon pepper',
      '1  onion, chopped fine',
      '2 tablespoons chopped fresh sage',
      '1 cup canned canned unsweetened pumpkin puree',
      '1 ounce Parmesan cheese,  grated (1⁄2 cup), plus extra for serving'
    ],
    steps: [
      'Microwave 3 cups broth, rice, and 2 tablespoons butter in very large bowl, covered, until most of liquid is absorbed, 12 to 16 minutes.',
      'Sprinkle steak tips with 1 teaspoon salt and pepper',
      'Melt 2 tablespoons butter in 12-inch nonstick skillet over medium-high heat',
      'Add steak tips and cook until browned on all sides and meat registers 120 to 125 degrees (for medium-rare), 7 to 10 minutes',
      'Transfer to plate and tent with foil',
      'Wipe skillet clean with paper towels.',
      'Melt 1 tablespoon butter in now-empty skillet over medium-high heat',
      'Add onion, sage, and remaining ¾ teaspoon salt and cook until softened, 3 to 5 minutes',
      'Stir in pumpkin and cook until simmering, about 2 minutes',
      'Add rice and remaining 1 cup broth',
      'Bring to simmer and cook, stirring constantly, until rice is al dente, 4 to 6 minutes',
      'Off heat, stir in Parmesan and remaining 1 tablespoon butter',
      'Season with salt to taste',
      'Sprinkle extra Parmesan over risotto, top with steak tips, and serve.'
    ],
    recipeUrl: 'https://www.americastestkitchen.com/recipes/16505'
  },
]];

const SyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: (theme.vars || theme).palette.background.paper,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
}));

const SyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

function getStarComponent(starType) {
  if (starType === "empty") return <StarBorder/>;
  if (starType === "half") return <StarHalf/>;
  return <Star/>;
}

function Stars({ starCount, ratings }) {
  let stars = starCount
  let starIcons = [];
  for (let i = 0; i < 5; i++) {
    if (starCount <= 0) starIcons.push("empty");
    else if (starCount < 0.5) starIcons.push("half");
    else starIcons.push("full");
    starCount -= 1;
  }

  return (
    <span>
      {starIcons.map((starType) => (
        getStarComponent(starType)
      ))}
      <Typography>{`${stars} stars from ${ratings} ratings`}</Typography>
    </span>
  )
}

export function Search() {
  return (
    <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search recipes"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: 'text.primary' }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search',
        }}
      />
    </FormControl>
  );
}

export default function MainContent() {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);
  const [cardData, setCardData] = React.useState(allCategoryCardData);
  const [cardCategory, setCardCategory] = React.useState("all categories");
  const [searchText, setSearchText] = React.useState("");
  const searchResults = [];

  const handleFocus = (index) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const handleClick = (category) => {
    switch (category) {
      case "breakfast":
        setCardData(breakfastCardData);
        setCardCategory("breakfast");
        break;
      case "lunch":
        setCardData(lunchCardData);
        setCardCategory("lunch");
        break;
      case "dinner":
        setCardData(dinnerCardData);
        setCardCategory("dinner");
        break;
      case "dessert":
        setCardData(dessertCardData);
        setCardCategory("dessert");
        break;
      default:
        setCardData(allCategoryCardData);
        setCardCategory("all categories");
        break;
    }
  };

  const searchForRecipes = async () => {
    try {
      const searchPhrase = {
          searchText: searchText
      };
      const response = await fetch('http://localhost:8080/api/search-recipes', {
      // const response = await fetch('http://172.26.0.79:8080/api/search-recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(searchPhrase),
      });
      const data = await response.json();
      console.log(data.message);






      // {
      //   img: 'https://res.cloudinary.com/hksqkdlah/image/upload/ar_1:1,c_fill,dpr_2.0,f_auto,fl_lossy.progressive.strip_profile,g_faces:auto,q_auto:low,w_344/SFS_Steak_Tips_with_Pumpkin_Risotto-22919_wfokok',
      //   tags: ['Main Courses', 'Vegetables', 'Rice', 'Beef', 'Weeknight'],
      //   title: "Steak Tips with Pumpkin Risotto",
      //   description:
      //     "Canned pumpkin adds flavor and color to this fall dinner.",
      //   stars: 4,
      //   ratings: 82,
      //   url: 'https://www.americastestkitchen.com/recipes/16505'
      // },

      // title TEXT,
      // description TEXT,
      // imageUrl TEXT,
      // rating TEXT,
      // ratingCount TEXT,
      // timeAndServings TEXT,
      // ingredients TEXT [],
      // steps TEXT [],
      // url TEXT

      let searchResults = data.message;

      setCardData(searchResults);
      setCardCategory("search");


    } catch (error) {
      console.error('Error searching recipes: ', error);
    }
  }


// these are the spices i have in my kitchen


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          flexDirection: 'row',
          gap: 1,
          width: { xs: '100%', md: 'fit-content' },
          overflow: 'auto',
        }}
      >
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          width: '100%',
          justifyContent: 'space-between',
          alignItems: { xs: 'start', md: 'center' },
          gap: 4,
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            flexDirection: 'row',
            gap: 3,
            overflow: 'auto',
          }}
        >
          <Chip 
            onClick={() => handleClick("all categories")} 
            size="medium" 
            label="All categories"
            sx={{
              backgroundColor: 'transparent',
              border: cardCategory === "all categories" ? '1px solid gray' : 'none'
            }} />
          <Chip
            onClick={() => handleClick("breakfast")}
            size="medium"
            label="Breakfast"
            sx={{
              backgroundColor: 'transparent',
              border: cardCategory === "breakfast" ? '1px solid gray' : 'none'
            }}
          />
          <Chip
            onClick={() => handleClick("lunch")}
            size="medium"
            label="Lunch"
            sx={{
              backgroundColor: 'transparent',
              border: cardCategory === "lunch" ? '1px solid gray' : 'none',
            }}
          />
          <Chip
            onClick={() => handleClick("dinner")}
            size="medium"
            label="Dinner"
            sx={{
              backgroundColor: 'transparent',
              border: cardCategory === "dinner" ? '1px solid gray' : 'none',
            }}
          />
          <Chip
            onClick={() => handleClick("dessert")}
            size="medium"
            label="Dessert"
            sx={{
              backgroundColor: 'transparent',
              border: cardCategory === "dessert" ? '1px solid gray' : 'none',
            }}
          />
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'row',
            gap: 1,
            width: { xs: '100%', md: 'fit-content' },
            overflow: 'auto',
          }}
        >
        <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
          <OutlinedInput
            size="small"
            id="search"
            placeholder="Search recipes"
            value={searchText}
            onChange={(e) => {setSearchText(e.target.value); console.log(searchText)}}
            sx={{ flexGrow: 1 }}
            startAdornment={
              <InputAdornment position="start" sx={{ color: 'text.primary' }}>
                <SearchRoundedIcon fontSize="small" />
              </InputAdornment>
            }
            inputProps={{
              'aria-label': 'search',
            }}
          />
        </FormControl>
            <Button size="small" color="info" variant="outlined"
            onClick={() => searchForRecipes()}>
              Search
            </Button>
        </Box>
      </Box>


    {cardData.map(([leftCard, rightCard]) => (
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, md: 6 }}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(0)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 0 ? 'Mui-focused' : ''}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              image={leftCard.imageurl}
              sx={{
                aspectRatio: '16 / 9',
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            />
            <SyledCardContent>
              <Box
                sx={{
                  display: 'inline-flex',
                  flexDirection: 'row',
                  gap: 3,
                  overflow: 'auto',
                }}
              >
                {leftCard.tags.map((tag) => (
                  <Chip
                    size="medium" 
                    label={tag}
                    sx={{
                      backgroundColor: 'light gray'
                    }} />
                ))}
              </Box>

              <Typography gutterBottom variant="h6" component="div">
                {leftCard.title}
              </Typography>
              <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                {leftCard.description}
              </StyledTypography>
              <Stars starCount={leftCard.rating} ratings={leftCard.ratingcount} />
              <Button variant="outlined"
                onClick={() => console.log("recipe selected - somehow send the RECIPE OBJECT (which is 'leftCard') to alena")}
              >Cook this recipe</Button>
            </SyledCardContent>
          </SyledCard>
        </Grid>
        {rightCard === null ? <p/> :
        <Grid size={{ xs: 12, md: 6 }}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(1)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 1 ? 'Mui-focused' : ''}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              image={rightCard.imageurl}
              aspect-ratio="16 / 9"
              sx={{
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            />
            <SyledCardContent>
              <Box
                sx={{
                  display: 'inline-flex',
                  flexDirection: 'row',
                  gap: 3,
                  overflow: 'auto',
                }}
              >
                {rightCard.tags.map((tag) => (
                  <Chip
                    size="medium" 
                    label={tag}
                    sx={{
                      backgroundColor: 'light gray'
                    }} />
                ))}
              </Box>
              <Typography gutterBottom variant="h6" component="div">
                {rightCard.title}
              </Typography>
              <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                {rightCard.description}
              </StyledTypography>
              <Stars starCount={rightCard.rating} ratings={rightCard.ratingcount} />
              <Button variant="outlined"
                onClick={() => console.log("recipe selected - somehow send the RECIPE OBJECT to alena")}
              >Cook this recipe</Button>
            </SyledCardContent>
          </SyledCard>
        </Grid>}
      </Grid>
    ))}
    </Box>
  );
}
