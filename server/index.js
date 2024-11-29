const express = require('express');
const app = express();
const axios = require("axios");
const { JSDOM } = require('jsdom');
const { Client } = require('pg');
const puppeteer = require('puppeteer');
const cors = require('cors');

app.use(cors({ origin: 'http://localhost:3000' })); // Replace with your frontend URL

// app.use(cors({ origin: 'http://172.26.0.79:3000/' }))


app.get('/', (req, res) => {
    res.send('Hello World!');
});

// app.listen(8080, () => {
//     console.log('server listening on port 8080');
// });


// const client = new Client({
//   user: 'heychef',
//   host: 'localhost',
//   database: 'heychefdb',
//   password: 'heychefdbpassword',
//   port: 5432, // Default PostgreSQL port
// });

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'mydb',
    password: 'Man-45663',
    port: 5432, // Default PostgreSQL port
  });

client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Error connecting to database:', err));


// const createTableQueryText = `
//     CREATE TABLE IF NOT EXISTS ${category}(
//     title TEXT,
//     tags TEXT [],
//     description TEXT,
//     imageUrl TEXT,
//     rating TEXT,
//     ratingCount TEXT,
//     timeAndServings TEXT,
//     ingredients TEXT [],
//     steps TEXT [],
//     url TEXT
//     );`;

const createTableQueryText = `
    CREATE TABLE IF NOT EXISTS testRecipes(
    title TEXT,
    tags TEXT [],
    description TEXT,
    imageUrl TEXT,
    rating TEXT,
    ratingCount TEXT,
    timeAndServings TEXT,
    ingredients TEXT [],
    steps TEXT [],
    url TEXT
    );`;

const addUrlConstraintQuery = `
    ALTER TABLE testRecipes
    ADD CONSTRAINT unique_url UNIQUE (url);`

let testRecipeData = [
    {
        title: "Aunt Jule's Pie",
        tags: [
          'Desserts or Baked Goods',
          'American',
          'Eggs & Dairy',
          'Dessert Pies'
        ],
        description: 'This southern treat is like a soft, gooey Fig Newton in pie form.',
        imageUrl: 'https://res.cloudinary.com/hksqkdlah/image/upload/ar_1:1,c_fill,dpr_2.0,f_auto,fl_lossy.progressive.strip_profile,g_faces:auto,q_auto:low,w_344/SFS_AuntJulesPie-105_o6cyjv',
        rating: '5',
        ratingCount: '3',
        timeAndServings: 'SERVES: 8\nTIME: 2 hours, plus 4 1⁄2 hours chilling and cooling',
        ingredients: [
          '1 recipe Classic Single-Crust Pie Dough ',
          '8 tablespoons unsalted butter',
          '½ cup golden raisins ',
          '½ cup pitted dates',
          '½ cup pecans,  toasted and roughly chopped',
          '3⁄4 teaspoon table salt,  divided',
          '1 cup packed (7 ounces) light brown sugar',
          '3 tablespoons all-purpose flour',
          '½ teaspoon ground nutmeg',
          '¼ teaspoon ground allspice',
          '5 large egg yolks',
          '1 1⁄4 cups heavy cream',
          '1 teaspoon cider vinegar '
        ],
        steps: [],
        recipeUrl: 'https://www.americastestkitchen.com/recipes/16624'
      },
      {
        title: 'Pasta alla Vodka',
        tags: [
          'Main Courses',
          'Italian',
          'Pork',
          'Pasta',
          'Eggs & Dairy',
          'Weeknight'
        ],
        description: "It's velvety. It's rosy. It's tomato-bright and savory, with just a flicker of heat. This is pasta alla vodka, perfected.",
        imageUrl: 'https://res.cloudinary.com/hksqkdlah/image/upload/ar_1:1,c_fill,dpr_2.0,f_auto,fl_lossy.progressive.strip_profile,g_faces:auto,q_auto:low,w_344/SFS_Pasta_alla_Vodka_9_bckc31',
        rating: '4.5',
        ratingCount: '197',
        timeAndServings: 'SERVES: 4 to 6\nTIME: 45 minutes',
        ingredients: [
          '2 tablespoons unsalted butter',
          '4 ounces pancetta,  chopped fine',
          '¼ teaspoon red pepper flakes',
          '2  garlic cloves,  minced to paste',
          '2 tablespoons tomato paste ',
          '½ cup vodka,  divided',
          '2 cups passata',
          '½ cup heavy cream',
          '¾ teaspoon table salt,  plus salt for cooking pasta',
          '½ teaspoon pepper',
          '1 pound rigatoni ',
          ' Grated Parmesan cheese '
        ],
        steps: [],
        recipeUrl: 'https://www.americastestkitchen.com/recipes/16489'
      },
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
        imageUrl: 'https://res.cloudinary.com/hksqkdlah/image/upload/ar_1:1,c_fill,dpr_2.0,f_auto,fl_lossy.progressive.strip_profile,g_faces:auto,q_auto:low,w_344/22419_sfs-french-apple-tart-15',
        rating: '4.5',
        ratingCount: '89',
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
        steps: [],
        recipeUrl: 'https://www.americastestkitchen.com/recipes/8114'
      },
      {
        title: 'Deluxe Blueberry Pancakes',
        tags: [ 'Main Courses', 'Fruit', 'Breakfast & Brunch' ],
        description: 'Fresh fruit and a diner trick take the most beloved of flapjacks to the next level.',
        imageUrl: 'https://res.cloudinary.com/hksqkdlah/image/upload/ar_1:1,c_fill,dpr_2.0,f_auto,fl_lossy.progressive.strip_profile,g_faces:auto,q_auto:low,w_344/SFS_Buttermilk_Blueberry_Pancakes_428_bnruvy',
        rating: '4.5',
        ratingCount: '133',
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
        steps: [],
        recipeUrl: 'https://www.americastestkitchen.com/recipes/14903'
      }
];

let moreTestRecipeData = [
    {
        title: 'Steak Tips with Pumpkin Risotto',
        tags: [ 'Main Courses', 'Vegetables', 'Rice', 'Beef', 'Weeknight' ],
        description: 'Canned pumpkin adds flavor and color to this fall dinner.',
        imageUrl: 'https://res.cloudinary.com/hksqkdlah/image/upload/ar_1:1,c_fill,dpr_2.0,f_auto,fl_lossy.progressive.strip_profile,g_faces:auto,q_auto:low,w_344/SFS_Steak_Tips_with_Pumpkin_Risotto-22919_wfokok',
        rating: '4',
        ratingCount: '104',
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
      {
        title: 'Slow-Cooker Chicken With Fennel and Tomato Couscous',
        tags: [ 'Main Courses', 'Chicken', 'Grains', 'Slow Cooker' ],
        description: 'For a simple braised chicken dinner with fresh Italian flavors, we combined bone-in chicken breasts with fennel and bright cherry tomatoes.',
        imageUrl: 'https://res.cloudinary.com/hksqkdlah/image/upload/ar_1:1,c_fill,dpr_2.0,f_auto,fl_lossy.progressive.strip_profile,g_faces:auto,q_auto:low,w_344/SFS_Chicken_with_Fennel_and_Tomato_Couscous-17_i0nhsx',
        rating: '3.5',
        ratingCount: '3',
        timeAndServings: 'SERVES: 4\nTIME: 2 to 3 hours on low\nSlow cooker size: 4 to 7 quarts',
        ingredients: [
          '1  fennel bulb,  stalks discarded, bulb halved, cored, and sliced thin',
          '5 tablespoons extra-virgin olive oil',
          '3  garlic cloves,  minced',
          ' Salt and pepper',
          '½ cup chicken broth',
          '4 (12-ounce) split bone-in chicken breasts,  skin removed, trimmed',
          '8 ounces cherry tomatoes,  halved',
          '1 cup couscous',
          '¼ cup chopped fresh basil',
          '2 tablespoons white wine vinegar ',
          '2 teaspoons honey',
          '½ teaspoon Dijon mustard '
        ],
        steps: [
          'Microwave fennel, 1 tablespoon oil, two-thirds of garlic, ½ teaspoon salt, and ½ teaspoon pepper in bowl, stirring occasionally, until fennel is tender, about 5 minutes; transfer to slow cooker',
          'Stir in broth',
          'Season chicken with salt and pepper and arrange, skinned side up, in even layer in slow cooker',
          'Sprinkle tomatoes over chicken, cover, and cook until chicken registers 160 degrees, 2 to 3 hours on low.',
          'Transfer chicken to serving dish and tent loosely with aluminum foil',
          'Strain cooking liquid into fat separator, reserving vegetables',
          'Return vegetables and 1 cup defatted liquid to now-empty slow cooker; discard remaining liquid',
          'Stir in couscous, cover, and cook on high until tender, about 15 minutes.',
          'Whisk remaining ¼ cup oil, remaining garlic, basil, vinegar, honey, and mustard together in bowl',
          'Season with salt and pepper to taste',
          'Add 3 tablespoons dressing to cooked couscous and fluff with fork to combine',
          'Drizzle chicken with remaining dressing and serve with couscous.'
        ],
        recipeUrl: 'https://www.americastestkitchen.com/recipes/10441'
      },
      {
        title: 'Stir-Fried Bok Choy with Soy Sauce and Ginger',
        tags: [ 'Side Dishes', 'Vegetables', 'Quick', 'Vegetarian' ],
        description: 'We separate the bok choy leaves and stalks to ensure that both parts cook perfectly.',
        imageUrl: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
        rating: '5',
        ratingCount: '4',
        timeAndServings: 'SERVES: 4 as a side dish\nTIME: 25 minutes',
        ingredients: [
          '2 tablespoons soy sauce',
          '1 teaspoon granulated sugar',
          '2 tablespoons peanut oil',
          '1 medium head bok choy (1 1/2 to 1 3/4 pounds), prepared according to illustrations below, (about 5 cups each sliced stalks and sliced greens)',
          '1 inch piece fresh ginger,  minced (about 1 tablespoon)'
        ],
        steps: [
          'Combine soy sauce and sugar in small bowl.',
          'Heat large nonstick skillet over high heat until hot, about 2 minutes',
          'Add oil, swirl to coat pan bottom',
          'Add bok choy stalks and cook, stirring frequently, until lightly browned, 5 to 7 minutes',
          'Add ginger and cook, stirring frequently, until fragrant, about 30 seconds',
          'Add bok choy greens and soy sauce mixture; cook, stirring frequently, until greens are wilted and tender, about 1 minute',
          'Serve immediately.'
        ],
        recipeUrl: 'https://www.americastestkitchen.com/recipes/366'
      },
      {
        title: 'Cranberry Curd Tart with Almond Crust',
        tags: [
          'Desserts or Baked Goods',
          'Fruit',
          'Vegetarian',
          'Gluten Free',
          'Tarts'
        ],
        description: 'Silky cranberry curd cradled in a nutty, buttery crust has the bracing punch of a lemon tart, but its vivid color makes it look downright regal.',
        imageUrl: 'https://res.cloudinary.com/hksqkdlah/image/upload/ar_1:1,c_fill,dpr_2.0,f_auto,fl_lossy.progressive.strip_profile,g_faces:auto,q_auto:low,w_344/20200519-CranberryCurdTart-1559_20200523-072513_ug4cac',
        rating: '4',
        ratingCount: '378',
        timeAndServings: 'SERVES: 8\nTIME: 1½ hours, plus 4 hours resting',
        ingredients: [
          '1 pound (454 grams/4 cups) fresh or frozen cranberries',
          '1 ¼ cups (8¾ ounces/248 grams) plus 1 tablespoon sugar,  divided',
          '½ cup water',
          'Pinch  table salt',
          '3  large egg yolks',
          '2 teaspoons cornstarch',
          '4 tablespoons unsalted butter,  cut into 4 pieces and softened',
          '1 cup (4 ounces/113 grams) almond flour',
          '½ cup (2 ounces/57 grams) cornstarch',
          '⅓ cup (2⅓ ounces/66 grams) sugar',
          '½ teaspoon table salt',
          '6 tablespoons unsalted butter,  melted and cooled',
          '¾ teaspoon almond extract ',
          '1 cup heavy cream'
        ],
        steps: [
          'FOR THE FILLING: Bring cranberries, 1¼ cups sugar, water, and salt to boil in medium saucepan over medium-high heat, stirring occasionally',
          'Adjust heat to maintain very gentle simmer',
          'Cover and cook until all cranberries have burst and started to shrivel, about 10 minutes',
          'While cranberries cook, whisk egg yolks and cornstarch in bowl until smooth',
          'Transfer hot cranberry mixture to food processor',
          'Immediately add yolk mixture and process until smooth (small flecks of cranberry skin will be visible), about 1 minute, scraping down sides of bowl as necessary',
          'Let mixture cool in processor bowl until skin forms and mixture registers 120 to 125 degrees, 45 minutes to 1 hour',
          'While mixture cools, make crust.',
          'FOR THE CRUST: Adjust oven rack to middle position and heat oven to 350 degrees',
          'Whisk flour, cornstarch, sugar, and salt in bowl until well combined',
          'Add melted butter and almond extract and stir with wooden spoon until uniform dough forms',
          'Crumble two-thirds of mixture over bottom of 9-inch tart pan with removable bottom',
          'Press dough to even thickness in bottom of pan',
          'Crumble remaining dough and scatter evenly around edge of pan',
          'Press crumbled dough into sides of pan',
          'Press edges to even thickness',
          'Place pan on rimmed baking sheet and bake until crust is golden brown, about 20 minutes, rotating pan halfway through baking.',
          'Add softened butter to cranberry puree and process until fully combined, about 30 seconds',
          'Strain mixture through fine-mesh strainer set over bowl, pressing on solids with rubber spatula to extract puree',
          'Transfer 2 tablespoons puree to medium bowl, then stir in cream and remaining 1 tablespoon sugar',
          'Cover and refrigerate',
          "Transfer remaining puree to crust (it's OK if crust is still warm) and smooth into even layer",
          'Let tart sit at room temperature for at least 4 hours',
          '(Cover tart with large bowl and refrigerate after 4 hours if making ahead.)',
          'Whisk cream mixture until stiff peaks form, 1 to 3 minutes',
          'Transfer to pastry bag fitted with pastry tip',
          'Pipe decorative border around edge of tart',
          'Transfer any remaining whipped cream to small serving bowl.'
        ],
        recipeUrl: 'https://www.americastestkitchen.com/recipes/13333'
      },
      {
        title: 'Beef Ho Fun (Gānchăo Niúhé 乾炒牛河)',
        tags: [ 'Main Courses', 'Chinese', 'Beef' ],
        description: 'This Cantonese dish is everything you’d want in a stir-fried noodle.',
        imageUrl: 'https://res.cloudinary.com/hksqkdlah/image/upload/ar_1:1,c_fill,dpr_2.0,f_auto,fl_lossy.progressive.strip_profile,g_faces:auto,q_auto:low,w_344/SFS_Beef_Ho_Fun_97241_gn3tpb',
        rating: '4',
        ratingCount: '20',
        timeAndServings: 'SERVES: 4 to 6\nTIME: 30 minutes, plus 30 minutes marinating',
        ingredients: [
          '6 ounces flank steak,  trimmed',
          '1 tablespoon water',
          '¼ teaspoon baking soda',
          '5 teaspoons soy sauce,  divided',
          '1 tablespoon oyster sauce,  divided',
          '1 tablespoon Shaoxing wine,  divided',
          '1 teaspoon cornstarch',
          '¼ teaspoon white pepper',
          '2 teaspoons dark soy sauce',
          '12 ounces  fresh ho fun noodles',
          '2 tablespoons vegetable oil,  divided',
          '6 ounces (3 cups) bean sprouts',
          '½  small onion,  sliced ¼  inch thick',
          '2  garlic cloves,  minced',
          '1 teaspoon grated fresh ginger',
          '3  scallions,  green parts only, cut into 1½‐inch pieces'
        ],
        steps: [
          'Cut beef with grain into 2½- to 3-inch-wide strips',
          'Transfer to plate and freeze until firm, about 15 minutes',
          'Slice strips crosswise against grain ¼ inch thick',
          'Combine water and baking soda in medium bowl',
          'Add beef and toss to coat; let sit for 5 minutes.',
          'Whisk 2 teaspoons soy sauce, 1 teaspoon oyster sauce, 1 teaspoon Shaoxing wine, cornstarch, and pepper together in large bowl',
          'Add beef mixture, toss to coat, and let sit at room temperature for 30 minutes.',
          'Whisk remaining 1 tablespoon soy sauce, remaining 2 teaspoons oyster sauce, remaining 2 teaspoons Shaoxing wine, and dark soy sauce together in small bowl',
          'Using fingers, unfurl noodles and transfer to rimmed baking sheet; set sauce and noodles aside.',
          'Heat empty 14-inch flat-bottomed wok over high heat until just beginning to smoke',
          'Drizzle 1 tablespoon oil around perimeter of wok and heat until just smoking',
          'Add beef mixture and cook, tossing slowly but constantly, until just beginning to brown, about 2 minutes; transfer to clean bowl',
          'Wipe wok clean with damp paper towels.',
          'Heat now-empty wok over high heat until just beginning to smoke',
          'Drizzle 1½ teaspoons oil around perimeter of wok and heat until just smoking',
          'Add bean sprouts, onion, garlic, and ginger and cook, tossing slowly but constantly, until vegetables begin to soften and lightly char, about 1 minute; transfer to bowl with beef.',
          'Heat now-empty wok over high heat until just beginning to smoke',
          'Drizzle remaining 1½ teaspoons oil around perimeter of wok and heat until just smoking',
          'Add noodles and cook, tossing gently but constantly, until beginning to char, about 1 minute',
          'Add beef mixture and scallions and gently toss to combine',
          'Drizzle reserved soy sauce mixture around perimeter of hot wok and cook, tossing gently to coat noodles, about 30 seconds',
          'Serve.'
        ],
        recipeUrl: 'https://www.americastestkitchen.com/recipes/16202'
      },
      {
        title: 'Lasagna For Two',
        tags: [
          'Main Courses',
          'Europe',
          'Italian',
          'Pasta, Grains, Rice & Beans',
          'Pasta',
          'For Two',
          'Casseroles'
        ],
        description: "It's a perfect dish for a crowd but too much work for feeding just two. We'd have to find a way to cut back the labor, not just the proportions.",
        imageUrl: 'https://res.cloudinary.com/hksqkdlah/image/upload/ar_1:1,c_fill,dpr_2.0,f_auto,fl_lossy.progressive.strip_profile,g_faces:auto,q_auto:low,w_344/9313_sfs-meatylasagna-15-294247',
        rating: '4.5',
        ratingCount: '116',
        timeAndServings: 'SERVES: 2\nTIME: 1¼ hours, plus 20 minutes cooling',
        ingredients: [
          '1 tablespoon olive oil',
          '1  small onion,  chopped fine',
          ' Salt and pepper',
          '2  garlic cloves,  minced',
          '8 ounces meatloaf mix',
          '1 (14.5-ounce) can diced tomatoes,  drained, with 1/4 cup juice reserved',
          '1 (8-ounce) can tomato sauce',
          '4 ounces whole-milk or part-skim ricotta cheese ',
          '1 ounce Parmesan cheese,  grated (1/2 cup), plus 2 tablespoons',
          '3 tablespoons chopped fresh basil',
          '1  large egg,  lightly beaten',
          '⅛ teaspoon salt',
          '⅛ teaspoon pepper',
          '4  no-boil lasagna noodles',
          '4 ounces whole-milk mozzarella cheese,  shredded (1 cup)'
        ],
        steps: [
          'Adjust oven rack to middle position and heat oven to 400 degrees.',
          'For the sauce: Heat oil in large saucepan over medium heat until shimmering',
          'Add onion and 1/8 teaspoon salt and cook until softened, 3 to 5 minutes',
          'Stir in garlic and cook until fragrant, about 30 seconds',
          'Add meatloaf mix and cook, breaking up meat into small pieces, until no longer pink, about 4 minutes.',
          'Stir in tomatoes, reserved juice, and tomato sauce and cook until slightly thickened, about 2 minutes (sauce should measure about 3 cups)',
          'Season with salt and pepper to taste.',
          'For the filling, noodles, and cheese: Combine ricotta, 1/2 cup Parmesan, basil, egg, salt, and pepper in bowl',
          'Cover bottom of 8 1/2 by 4 1/2-inch loaf pan with 1/2 cup sauce',
          'Top with 1 noodle and spread one-third of ricotta mixture evenly over noodle',
          'Sprinkle with 1/4 cup mozzarella and cover with 1/2 cup sauce',
          'Repeat twice, beginning with noodle and ending with sauce',
          'Top with remaining 1 noodle, remaining 1 cup sauce, remaining 1/4 cup mozzarella, and remaining 2 tablespoons Parmesan.',
          'Cover pan tightly with foil sprayed with vegetable oil spray and bake until bubbling around the edges, 25 to 30 minutes',
          'Discard foil and continue to bake until browned, about 10 minutes',
          'Cool on wire rack for 20 minutes',
          'Serve.'
        ],
        recipeUrl: 'https://www.americastestkitchen.com/recipes/6558'
      }
];

const testDataa = [];

// 16623
// google oauth
// find some way to extract the ingredient name
// need to check that the name matches the ingredient 
// else you'll get things like 'sugar pumpkin' for sugar
async function getRecipeAmericasTestKitchen() {
    try {
        // await client.query('DROP TABLE IF EXISTS testRecipes');
        // create table
        // await client.query(createTableQueryText);
        // await client.query(addUrlConstraintQuery);
        // console.log('Table created successfully');

        for (let category of ['breakfast', 'lunch', 'dinner', 'dessert']) {
            // console.log(category)
            // await client.query(`DROP TABLE ${category}`);
            await client.query(
                `CREATE TABLE IF NOT EXISTS ${category}(
                    title TEXT,
                    tags TEXT [],
                    description TEXT,
                    imageUrl TEXT,
                    rating TEXT,
                    ratingCount TEXT,
                    timeAndServings TEXT,
                    ingredients TEXT [],
                    ingredientNames TEXT [],
                    steps TEXT [],
                    url TEXT
                    );`
            )
            // await client.query(
            //     `ALTER TABLE ${category}
            //     ADD CONSTRAINT unique_url UNIQUE (url);`
            // );

            // await client.query(`ALTER TABLE ${category} DROP CONSTRAINT IF EXISTS unique_url`)
        }




        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto('https://www.americastestkitchen.com/sign_in');

        await page.type('[type="email"]', 'alena.lu@hotmail.com');
        await page.type('[type="password"]', 'Heychef2024');

        await page.click('.SignInForm_button__GOnId');
        console.log("pressed sign in button")

        await page.waitForNavigation({
            waitUntil: 'networkidle0',
        });

        // 16489
        // 2295
        let recipeNums = [8114, 9253, 11519, 13772, 2295, 15407, 1335, 14903, 16619, 16505] // all good
        // let recipeNums = [16505, 10441, 366, 13333, 16202, 6558, 16019, 16491];
        for (let i of recipeNums) {
        // for (let i = 1; i < 4; i++) {
            const recipeUrl = `https://www.americastestkitchen.com/recipes/${i}`;
            // console.log(recipeUrl)
            await page.goto(recipeUrl);

            // don't scrape if this is not a valid recipe url
            let noRecipeElement = await page.$$('[class="errorPage_errorContent__0v4Lf"]');
            // console.log(noRecipeElement.length);
            if (noRecipeElement.length > 0) continue;

            // title
            const titleElement = await page.$('h1');
            const title = await page.evaluate(titleElement => titleElement.textContent, titleElement);
            console.log('Title:', title);

            // rating
            const ratingElement = await page.$('#recipe-header-rating-score');
            if (ratingElement) rating = await page.evaluate(ratingElement => ratingElement.textContent, ratingElement);
            else rating = "Not rated";
            // if (ratingElement) console.log('Rating:', rating);

            // rating count
            const ratingCountElement = await page.$('#recipe-header-rating-count');
            if (ratingCountElement) ratingCount = await page.evaluate(ratingCountElement => ratingCountElement.textContent.slice(1, -1), ratingCountElement);
            else ratingCount = "no ratings";
            // console.log('Rating count:', ratingCount);

            // tags
            const tags = [];
            const tagElements = await page.$$('.Link-module_chip__ATQxp');
            for (const tagElement of tagElements) {
                const tag = await page.evaluate(tagElement => tagElement.textContent, tagElement);
                tags.push(tag);
            }
            // console.log(tags);

            // description
            const descriptionElement = await page.$('[class="typography RecipePageHeader_description__1Xwwc typography-module_base__PkumT typography-module_open-xlg__MHo6f typography-module_proxima__HDZ4V"]');
            const description = await page.evaluate(descriptionElement => descriptionElement.textContent, descriptionElement);
            // console.log(description);

            // servings and / or time
            let timeAndServings = "";
            const specNameElements = await page.$$('[class="typography typography-module_base__PkumT typography-module_caps-sm__OYAE9 typography-module_proxima__HDZ4V typography-module_font-weight--bold__xhayO"]');
            const specQuantityElements = await page.$$('[class="typography typography-module_base__PkumT typography-module_open-sm__6cWJa typography-module_proxima__HDZ4V"]');
            for (let i = 0; i < specNameElements.length; i++) {
                const specNameElement = specNameElements[i];
                const specName = await page.evaluate(specNameElement => specNameElement.textContent, specNameElement);

                const specQuantityElement = specQuantityElements[i];
                const specQuantity = await page.evaluate(specQuantityElement => specQuantityElement.textContent, specQuantityElement);

                let spec = `${specName.trim()}: ${specQuantity}`;

                if (timeAndServings) timeAndServings += `\n${spec}`;
                else timeAndServings = `${spec}`;
            }
            // console.log(timeAndServings);


            // image url
            let imageUrl = "";
            const imageElements = await page.$$('img');
            for (const imageElement of imageElements) {
                let alt = await page.evaluate(imageElement => imageElement.getAttribute('alt'), imageElement);
                if (!alt || alt === title) {
                    imageUrl = await page.evaluate(imageElement => imageElement.getAttribute('src'), imageElement);
                    break;
                }
            }
            // console.log(imageUrl);

            // ingredients
            const ingredientElements = await page.$$('[class="typography typography-module_base__PkumT typography-module_open-lg__b6RLE typography-module_proxima__HDZ4V"]');
            const ingredients = [];
            let ingredientString = "";
            for (const ingredientElement of ingredientElements) {
                const ingredient = await page.evaluate(ingredientElement => ingredientElement.textContent, ingredientElement);
                if (!ingredientString.includes(ingredient)) ingredients.push(ingredient);
                ingredientString += ingredient;
            }
            // console.log(ingredients)
            // <div class="typography RecipeInstruction_content__aD7N7 typography-module_base__PkumT typography-module_open-lg__b6RLE typography-module_proxima__HDZ4V typography-module_dangerouslySet__S4r6M"><p>Roll dough into 12-inch circle on floured counter. Loosely roll dough around rolling pin and gently unroll it onto 9-inch pie plate, letting excess dough hang over edge. Ease dough into plate by gently lifting edge of dough with your hand while pressing into plate bottom with your other hand.</p>
// </div>

            // steps
            let stepElements = await page.$$('[class="typography RecipeInstruction_content__aD7N7 typography-module_base__PkumT typography-module_open-lg__b6RLE typography-module_proxima__HDZ4V typography-module_dangerouslySet__S4r6M"]');
            // console.log(stepElements.length)
            let steps = [];
            for (const stepElement of stepElements) {
                const stepText = await page.evaluate(stepElement => stepElement.textContent, stepElement);
                let splitByPeriod = stepText.trim().split(". ");
                steps = [...steps, ...splitByPeriod];
            }
            // console.log(steps);

            let recipeObject = {
                title: title,
                tags: tags,
                description: description,
                imageUrl: imageUrl,
                rating: rating,
                ratingCount: ratingCount,
                timeAndServings: timeAndServings,
                ingredients: ingredients,
                steps: steps,
                recipeUrl: recipeUrl

            }

            

            console.log(recipeObject)
            // title, tags, description, imageUrl, rating, ratingCount, timeAndServings, ingredients, steps, recipeUrl
            // testDataa.push(recipeObject);

            /*
            breakfast recipes -> Breakfast & Brunch
            dessert recipes -> Desserts or Baked Goods
            lunch and dinner recipes -> everything else
            */
           let recipeCategories = [];
           if (tags.includes('Breakfast & Brunch')) {
            recipeCategories = ['breakfast'];
           } else if (tags.includes('Desserts or Baked Goods')) {
            recipeCategories = ['dessert'];
            } else recipeCategories = ['lunch', 'dinner'];

            // CREATE TABLE IF NOT EXISTS testRecipes(
            //     title TEXT,
            //     description TEXT,
            //     imageUrl TEXT
            //     rating TEXT,
            //     timeAndServings TEXT,
            //     ingredients TEXT [],
            //     steps TEXT [],
            //     url TEXT
            //     );`;
            // let insertQueryText = `
            //     INSERT INTO testRecipes(title, tags, description, imageUrl, rating, ratingCount, timeAndServings, ingredients, steps, url)
            //     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            //     ON CONFLICT (url) DO NOTHING`;

            // client.query(insertQueryText, [title, tags, description, imageUrl, rating, ratingCount, timeAndServings, ingredients, steps, recipeUrl]);


            // for (let recipeCategory of recipeCategories) {
            //     let recipeVars = [title, tags, description, imageUrl, rating, ratingCount, timeAndServings, ingredients, steps, recipeUrl];
            //     client.query(
            //         `INSERT INTO ${recipeCategory}(title, tags, description, imageUrl, rating, ratingCount, timeAndServings, ingredients, steps, url)
            //         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`, recipeVars
            //         // ON CONFLICT (url) DO NOTHING`, recipeVars
            //     )
            // }
            // console.log(recipeCategories)
            // let r = await client.query(`SELECT * FROM ${recipeCategories[0]}`);
            // console.log(r.rows);



            // console.log(recipeData);

            // const res = await client.query('SELECT * FROM testRecipes');
            // console.log(res)
            // await client.end();

            // INSERT INTO tab_name(col_list)
            // SELECT val_list
            // WHERE
            // NOT EXISTS (
            // SELECT col_name FROM tab_name WHERE condition
            // );


            // INSERT INTO users (email, name)
            // VALUES ('example@example.com', 'John Doe')
            // ON CONFLICT (email) DO NOTHING;



        }
        // console.log("select all from testRecipes table")
        // let res = await client.query('SELECT * FROM testRecipes');
        // console.log(res.rowCount)
        // // Accessing each row individually
        // let row1 = res.rows[0];
        // const row2 = res.rows[1];
        // const row3 = res.rows[2];

        // // Displaying each row (object) individually
        // console.log(row1); // First object
        // console.log(row2); // Second object
        // console.log(row3); // Third object

        // await client.end();
        // for (recipe of testDataa) {
        //     console.log("recipe: ", recipe.title)
        //     getIngredientNames(recipe.ingredients)
        // }
        console.log("closing browser");
        await browser.close();
    } catch (error) {
        console.log(error)
    }
}

getRecipeAmericasTestKitchen()





// count garlic as a "spice"/"condiment"
// vegetable oil and olive oil too



// parse ingredient strings to extract only ingredient name
// call this while scraping and add another field to recipe object (ingredientNames TEXT [])
// or call this in the function that gets recipe recommendations (might be too slow)
function getIngredientNames(ingredients) {
    result = [];

    // measurement / filler / non-ingredient words
    let wordsToIgnore = new Set([
        "cup", "teaspoon", "tablespoon", "ounce", "fluid ounce", 
        "pint", "quart", "gallon", "pound", "large", "medium",
        "small", "cups", "teaspoons", "ounces", "fluid ounces",
        "pints", "quarts", "gallons", "pounds", "tablespoons",
        "canned", "packed", "all-purpose", "ground", "dried",
        "table", "unsalted", "grated", "minced", "grams", "pitted",
        "recipe", "golden", "delicious", "inch", "head", "pinch",
        "bulb", "chopped", "fresh", "unsweetened", "piece",
        "frozen", "or", "plus", "and", "dry", "dried", "coarse",
        "coarsely", "fine", "finely","granulated"
    ]);


    for (let ingredient of ingredients) {
        // console.log(ingredient)
        ingredient = ingredient.replace(/\p{N}/gu, '');
        // console.log(ingredient);
        let words = ingredient.toLowerCase().split(',');
        words = words[0].split(' ');
        // console.log(words)
        let parens = false;

        let ingredientName = "";

        for (let word of words) {
            
            // check for parentheses
            if (word[0] === '(' && word[word.length-1] === ')') continue;

            if (word[0] === '(' && word[word.length-1] != ')') {
                parens = true;
                continue;
            }
            if (word[0] != '(' && word[word.length-1] === ')') {
                parens = false;
                continue;
            }
            if (parens) continue;

            // check for words to ignore
            if (wordsToIgnore.has(word)) continue;

            if (!(/^[a-zA-Z]+$/.test(word))) continue;


            ingredientName = ingredientName + ` ${word}`;

            
        }

        // console.log("ingredient name: ", ingredientName)
        result.push(ingredientName.trim());
    }
    console.log("ingredients: ", result);
}


// for (recipe of moreTestRecipeData) {
//     console.log("recipe: ", recipe.title)
//     getIngredientNames(recipe.ingredients)
// }




/*
- for every ingredient provided, check that it's in the ingredient list
- keep track of number of ingredients in the recipe
    - if you get through all ingredients in the recipe and you have all of them, we chillin
*/

async function getRecipeRecommendations(userIngredients, recipeCategory) {
    try {
        /* some database query or api call to get recipes from the specified category */
        // console.log("select all from testRecipes table")
        let recipes = await client.query(`SELECT * FROM ${recipeCategory}`);

        let spices = new Set([
            "salt", "pepper", "olive oil", "vegetable oil", "basil", "cumin",
            "cinnamon", "paprika", "cloves", "clove", "anise", "star anise",
            "nutmeg", "allspice", "tumeric", "garlic clove", "garlic cloves",
            "garlic", "garlic powder", "onion powder", "chili powder", 
            "cumin seeds", "baking soda", "baking powder", "white pepper", 
            "water", "cornstarch", "bay leaves", "bay leaf", "oregano",
            "curry powder", "mustard seeds", "rosemary", "peppercorns",
            "cardamom", "cayenne pepper", "chili flakes", "soy sauce",
            "parsley", "cilantro", "corriander", "celery seeds", "lemon",
            "lime", "oil", "powder", "garlic", "soda", "seeds", "seed"
        ]);

        // console.log(res.rowCount)
        // Accessing each row individually
        // let row1 = res.rows[0];
        // const row2 = res.rows[1];
        // const row3 = res.rows[2];

        // // Displaying each row (object) individually
        // console.log(row1); // First object
        // console.log(row2); // Second object
        // console.log(row3); // Third object

        // parse ingredients to get a set of just ingredient names

        // tuples of [[<ingredients the user is missing (empty list if user has all ingredients)], recipe object]
        let recipeRecommendations = [];
        // tuples of [[<ingredients the user is missing>], recipe object]
        let missingIngredientRecipes = [];
        let userIngredientSet = new Set(userIngredients);
        
        for (recipe of recipes.rows) {
            let recipeIngredients = []; /* the ingredients list for the recipe - list of strings */
            let recipeIngredientSet = new Set(recipeIngredients); // why turn recipe ingredients into a set?

            let missingIngredients = [];
            let isViableRecipe = true;

            for (recipeIngredient of recipeIngredientSet) {
                if (!userIngredientSet.has(recipeIngredient)) {
                    if (spices.has(recipeIngredient)) missingIngredients.push();
                    else {
                        isViableRecipe = false;
                        break;
                    }
                }
                
            }

            if (isViableRecipe) {
                if (missingIngredients.length === 0) recipeRecommendations.push([[], recipe]);
                else missingIngredientRecipes.push([missingIngredients, recipe]);
            }
        }

        let numMissingIngredientRecipesToAdd = Math.floor(recipeRecommendations.length*5/95);
        let missingIngredientRecipesToAdd = missingIngredientRecipes.slice(0, numMissingIngredientRecipesToAdd);
        return [...recipeRecommendations, ...missingIngredientRecipesToAdd];



    } catch (error) {
        console.log(error)
    }
}




// some api stuff
const port = 8080;
const bodyParser = require('body-parser');

// Middleware to parse JSON data from requests
app.use(bodyParser.json());


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// all recipes 
app.post('/api/search-recipes', async (req, res) => {
    const searchPhrase = req.body;
    console.log(searchPhrase);

    // const selectQueryText = `
    //     SELECT *
    //     FROM lunch
    //     WHERE EXISTS (
    //     SELECT 1
    //     FROM unnest(ingredients) AS ingredient
    //     WHERE ingredient ILIKE '%${searchPhrase.searchText}%'
    // );`;

    // let results = await client.query(selectQueryText);
    let results = [];

    for (let category of ['breakfast', 'lunch', 'dessert']) {
        let recipes = await client.query(
            `SELECT *
            FROM ${category}
            WHERE EXISTS (
            SELECT 1
            FROM unnest(ingredients) AS ingredient
            WHERE ingredient ILIKE '%${searchPhrase.searchText}%');`
        )
        results = [...results, ...recipes.rows];
    }

    // remove duplicates
    let resultsWithoutDuplicates = [];
    console.log(results.length)
    let seen = new Set();
    for (recipe of results) {
        console.log(seen, recipe.title);
        if (!seen.has(recipe.title)) resultsWithoutDuplicates.push(recipe);
        seen.add(recipe.title);
    }    
    console.log(resultsWithoutDuplicates.length)

    // pair into tuples
    let resultsTuples = [];
    for (let i = 0; i < resultsWithoutDuplicates.length; i += 2) {
        let left = resultsWithoutDuplicates[i];
        if (i+1 < resultsWithoutDuplicates.length) right = resultsWithoutDuplicates[i+1];
        else right = null;
        
        resultsTuples.push([left, right]);
    }

    res.status(200).json({message: resultsTuples});


    // do this select on each of the four tables
    // combine the results into one list
    // [...breakfastRecs, ...lunchRecs, ...dinnerRecs, ...dessertRecs]

    // remove duplicates
    // new Set(...): Creates a new Set from the array of strings, automatically removing duplicates.
    // Array.from(...): Converts the Set back to an array.

    // let recipeRecs = await client.query(selectQueryText);
    // console.log(recipeRecs.rowCount)
    // // Accessing each row individually

    // for (let recipe of recipeRecs.rows) {
    //     console.log(recipe);
    // }

    // let row1 = res.rows[0];
    // const row2 = res.rows[1];
    // const row3 = res.rows[2];

    // // Displaying each row (object) individually
    // console.log(row1); // First object
    // console.log(row2); // Second object
    // console.log(row3); // Third object


    // res.status(200).json({message: recipeRecs.rows});
});

app.post('/api/new-recipe', (req, res) => {
    const newRecipe = req.body;
    let category = newRecipe.category;

    // let insertQueryText = `
    //     INSERT INTO ${category}(title, description, imageUrl, rating, ratingCount, timeAndServings, ingredients, steps, url)
    //     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    //     ON CONFLICT (url) DO NOTHING`;

    let insertQueryText = `
        INSERT INTO testRecipes(title, tags, description, imageUrl, rating, ratingCount, timeAndServings, ingredients, steps, url)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (url) DO NOTHING`;

    client.query( 
        `INSERT INTO ${category}(title, tags, description, imageUrl, rating, ratingCount, timeAndServings, ingredients, steps, url)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        
        [newRecipe.title, newRecipe.tags, newRecipe.description, newRecipe.imageUrl, newRecipe.rating, newRecipe.ratingCount, newRecipe.timeAndServings, newRecipe.ingredients, newRecipe.steps, newRecipe.recipeUrl]);

    console.log(newRecipe);
    res.status(200).json({message: 'new recipe added!'});
})

app.post('/api/alena-test', async (req, res) => {
    // let recipe = await client.query('SELECT * FROM testRecipes');
    // Accessing each row individually
    // let row = recipe.rows[0];
    const request = req.body;
    let category = request.category;
    let ingredients = request.ingredients;

    let recs = await getRecipeRecommendations(ingredients, category);


    // console.log(ingredients);
    res.status(200).json({message:recs})
})





























































































































































async function getRecipeAllRecipes() {
	try {
        // console.log('in getRecipePage');
        // await client.connect();
        // console.log('connected');
        // await client.query(createTableQueryText);
        // console.log("table created successfully");









        for (let j = 0; j < websites.length; j++) {

            // fetch html file from the website
            const response = await axios.get(websites[j]);
            const htmlFile = response.data;

            // parse the website html file
            const dom = new JSDOM(htmlFile);

            // recipe title
            const recipeTitle = dom.window.document.getElementsByClassName("article-heading type--lion")[0].textContent;

            // recipe description
            const recipeDescription = dom.window.document.getElementsByClassName("article-subheading type--dog")[0].textContent;

            // stars + rating counts
            const starCount = dom.window.document.getElementById("mm-recipes-review-bar__rating_1-0").textContent;
            const ratingCount = dom.window.document.getElementById("mm-recipes-review-bar__rating-count_1-0").textContent;
            const ratingCountWithoutParens = ratingCount.slice(1, -1);
            const rating = `${starCount} stars from ${ratingCountWithoutParens} ratings`;

            // cook, prep, total times, num servings
            const metricLabels = dom.window.document.getElementsByClassName("mm-recipes-details__label");
            const metricValues = dom.window.document.getElementsByClassName("mm-recipes-details__value");
            let time = "";
            let servings = "";
            for (let i = 0; i < metricLabels.length; i++) {
                let metric = `${metricLabels[i].textContent} ${metricValues[i].textContent}`;
                if (i === 0) time = metric;
                else if (i < 3) time += `, ${metric}`;
                else servings = metric;
            }

            // ingredient list and quantities
            const ingredientQuantities = dom.window.document.querySelectorAll('[data-ingredient-quantity="true"]');
            const ingredientUnits = dom.window.document.querySelectorAll('[data-ingredient-unit="true"]');
            const ingredientNames = dom.window.document.querySelectorAll('[data-ingredient-name="true"]');
            let ingredientsMap = new Map();

            for (let i = 0; i < ingredientNames.length; i++) {
                let ingredientName = ingredientNames[i].textContent.split(',')[0];
                let ingredientAmount = `${ingredientQuantities[i].textContent} ${ingredientUnits[i].textContent}`;
                ingredientsMap.set(ingredientName, ingredientAmount);
            }
            const ingredientsJson = JSON.stringify(Object.fromEntries(ingredientsMap));

            // steps
            const stepElements = dom.window.document.getElementById("mm-recipes-steps__content_1-0");
            const stepTextDescriptions = stepElements.getElementsByClassName("comp mntl-sc-block mntl-sc-block-html");
            let steps = [];
            for (let i = 0; i < stepTextDescriptions.length; i++) {
                let splitByPeriod = stepTextDescriptions[i].textContent.trim().split(". ");
                steps = [...steps, ...splitByPeriod];
            }
            // console.log(steps)
            const stepImages = stepElements.querySelectorAll("img[data-src]");
            // console.log(stepImages.length);
            const lastImage = stepImages[stepImages.length-1];
            const lastImageUrl = lastImage.getAttribute('data-src');
            // console.log(lastImageUrl);
            

            let recipeData = {
                title: recipeTitle,
                description: recipeDescription,
                imageUrl: lastImageUrl,
                rating: rating,
                starCount: Number(starCount),
                time: time,
                servings: servings,
                ingredientsMap: ingredientsMap,
                ingredientsJson: ingredientsJson,
                steps: steps,
                url: websites[j]
                // htmlFile: htmlFile

            }

            // let insertQueryText = `
            //     INSERT INTO breakfast(title, ingredients, time, servings, rating, steps)
            //     VALUES ($1, $2, $3, $4, $5, $6)`;

            // client.query(insertQueryText, [recipeTitle, ingredientsJson, time, servings, rating, steps]);

            console.log(recipeData);

            // const res = await client.query('SELECT * FROM breakfast');
            // console.log(res)
            // await client.end();
        }

	} catch (error) {
		console.error(error)
	}
}
// getRecipeAllRecipes()

































/*
// rpi version (fixed alena-test api, database details)
const express = require('express');
const app = express();
const axios = require("axios");
const { JSDOM } = require('jsdom');
const { Client } = require('pg');
const puppeteer = require('puppeteer');
const cors = require('cors');

// app.use(cors({ origin: 'http://localhost:3000' })); // Replace with your frontend URL

app.use(cors({ origin: 'http://172.26.0.79:3000' }))


app.get('/', (req, res) => {
    res.send('Hello World!');
});

// app.listen(8080, () => {
//     console.log('server listening on port 8080');
// });


const client = new Client({
  user: 'heychef',
  host: 'localhost',
  database: 'heychefdb',
  password: 'heychefdbpassword',
  port: 5432, // Default PostgreSQL port
});

// const client = new Client({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'mydb',
//     password: 'Man-45663',
//     port: 5432, // Default PostgreSQL port
//   });

client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Error connecting to database:', err));


// const createTableQueryText = `
//     CREATE TABLE IF NOT EXISTS ${category}(
//     title TEXT,
//     tags TEXT [],
//     description TEXT,
//     imageUrl TEXT,
//     rating TEXT,
//     ratingCount TEXT,
//     timeAndServings TEXT,
//     ingredients TEXT [],
//     steps TEXT [],
//     url TEXT
//     );`;

const createTableQueryText = `
    CREATE TABLE IF NOT EXISTS testRecipes(
    title TEXT,
    tags TEXT [],
    description TEXT,
    imageUrl TEXT,
    rating TEXT,
    ratingCount TEXT,
    timeAndServings TEXT,
    ingredients TEXT [],
    steps TEXT [],
    url TEXT
    );`;

const addUrlConstraintQuery = `
    ALTER TABLE testRecipes
    ADD CONSTRAINT unique_url UNIQUE (url);`


// 16623
// google oauth

async function getRecipeAmericasTestKitchen() {
    try {
        // await client.query('DROP TABLE IF EXISTS testRecipes');
        // create table
        // await client.query(createTableQueryText);
        // await client.query(addUrlConstraintQuery);
        // console.log('Table created successfully');

        for (let category of ['breakfast', 'lunch', 'dinner', 'dessert']) {
            console.log(category)
            // await client.query(`DROP TABLE ${category}`);
            await client.query(
                `CREATE TABLE IF NOT EXISTS ${category}(
                    title TEXT,
                    tags TEXT [],
                    description TEXT,
                    imageUrl TEXT,
                    rating TEXT,
                    ratingCount TEXT,
                    timeAndServings TEXT,
                    ingredients TEXT [],
                    steps TEXT [],
                    url TEXT
                    );`
            )
            // await client.query(
            //     `ALTER TABLE ${category}
            //     ADD CONSTRAINT unique_url UNIQUE (url);`
            // );

            // await client.query(`ALTER TABLE ${category} DROP CONSTRAINT IF EXISTS unique_url`)
        }




        // const browser = await puppeteer.launch();
        const browser = await puppeteer.launch({
            executablePath: '/usr/bin/chromium-browser', // Adjust the path if necessary
            headless: true, // Optional
        });
        const page = await browser.newPage();

        await page.goto('https://www.americastestkitchen.com/sign_in');

        await page.type('[type="email"]', 'klei@andrew.cmu.edu');
        await page.type('[type="password"]', 'Man-45663');

        await page.click('.SignInForm_button__GOnId');
        console.log("pressed sign in button")

        await page.waitForNavigation({
            waitUntil: 'networkidle0',
        });

        // 16489
        // 2295
        // let recipeNums = [2295, 16489, 14903] // all good
        let recipeNums = [16624, 16489, 8114];
        // for (let i of recipeNums) {
        for (let i = 4; i < 16000; i++) {
            const recipeUrl = `https://www.americastestkitchen.com/recipes/${i}`;
            // console.log(recipeUrl)
            await page.goto(recipeUrl);

            // don't scrape if this is not a valid recipe url
            let noRecipeElement = await page.$$('[class="errorPage_errorContent__0v4Lf"]');
            // console.log(noRecipeElement.length);
            if (noRecipeElement.length > 0) continue;

            // title
            const titleElement = await page.$('h1');
            const title = await page.evaluate(titleElement => titleElement.textContent, titleElement);
            console.log('Title:', title);

            // rating
            const ratingElement = await page.$('#recipe-header-rating-score');
            if (ratingElement) rating = await page.evaluate(ratingElement => ratingElement.textContent, ratingElement);
            else rating = "Not rated";
            // if (ratingElement) console.log('Rating:', rating);

            // rating count
            const ratingCountElement = await page.$('#recipe-header-rating-count');
            if (ratingCountElement) ratingCount = await page.evaluate(ratingCountElement => ratingCountElement.textContent.slice(1, -1), ratingCountElement);
            else ratingCount = "no ratings";
            // console.log('Rating count:', ratingCount);

            // tags
            const tags = [];
            const tagElements = await page.$$('.Link-module_chip__ATQxp');
            for (const tagElement of tagElements) {
                const tag = await page.evaluate(tagElement => tagElement.textContent, tagElement);
                tags.push(tag);
            }
            // console.log(tags);

            // description
            const descriptionElement = await page.$('[class="typography RecipePageHeader_description__1Xwwc typography-module_base__PkumT typography-module_open-xlg__MHo6f typography-module_proxima__HDZ4V"]');
            const description = await page.evaluate(descriptionElement => descriptionElement.textContent, descriptionElement);
            // console.log(description);

            // servings and / or time
            let timeAndServings = "";
            const specNameElements = await page.$$('[class="typography typography-module_base__PkumT typography-module_caps-sm__OYAE9 typography-module_proxima__HDZ4V typography-module_font-weight--bold__xhayO"]');
            const specQuantityElements = await page.$$('[class="typography typography-module_base__PkumT typography-module_open-sm__6cWJa typography-module_proxima__HDZ4V"]');
            for (let i = 0; i < specNameElements.length; i++) {
                const specNameElement = specNameElements[i];
                const specName = await page.evaluate(specNameElement => specNameElement.textContent, specNameElement);

                const specQuantityElement = specQuantityElements[i];
                const specQuantity = await page.evaluate(specQuantityElement => specQuantityElement.textContent, specQuantityElement);

                let spec = `${specName.trim()}: ${specQuantity}`;

                if (timeAndServings) timeAndServings += `\n${spec}`;
                else timeAndServings = `${spec}`;
            }
            // console.log(timeAndServings);


            // image url
            let imageUrl = "";
            const imageElements = await page.$$('img');
            for (const imageElement of imageElements) {
                let alt = await page.evaluate(imageElement => imageElement.getAttribute('alt'), imageElement);
                if (!alt || alt === title) {
                    imageUrl = await page.evaluate(imageElement => imageElement.getAttribute('src'), imageElement);
                    break;
                }
            }
            // console.log(imageUrl);

            // ingredients
            const ingredientElements = await page.$$('[class="typography typography-module_base__PkumT typography-module_open-lg__b6RLE typography-module_proxima__HDZ4V"]');
            const ingredients = [];
            let ingredientString = "";
            for (const ingredientElement of ingredientElements) {
                const ingredient = await page.evaluate(ingredientElement => ingredientElement.textContent, ingredientElement);
                if (!ingredientString.includes(ingredient)) ingredients.push(ingredient);
                ingredientString += ingredient;
            }
            // console.log(ingredients)

            // steps
            let stepElements = await page.$$('[class="typography typography-module_base__PkumT typography-module_open-lg__b6RLE typography-module_proxima__HDZ4V typography-module_dangerouslySet__S4r6M"]');
            stepElements = stepElements.slice(1);   // remove the "Before You Begin" section
            let steps = [];
            for (const stepElement of stepElements) {
                const stepText = await page.evaluate(stepElement => stepElement.textContent, stepElement);
                let splitByPeriod = stepText.trim().split(". ");
                steps = [...steps, ...splitByPeriod];
            }
            // console.log(steps);


            /*
            breakfast recipes -> Breakfast & Brunch
            dessert recipes -> Desserts or Baked Goods
            lunch and dinner recipes -> everything else
            *//*
           let recipeCategories = [];
           if (tags.includes('Breakfast & Brunch')) {
            recipeCategories = ['breakfast'];
           } else if (tags.includes('Desserts or Baked Goods')) {
            recipeCategories = ['dessert'];
            } else recipeCategories = ['lunch', 'dinner'];

            // CREATE TABLE IF NOT EXISTS testRecipes(
            //     title TEXT,
            //     description TEXT,
            //     imageUrl TEXT
            //     rating TEXT,
            //     timeAndServings TEXT,
            //     ingredients TEXT [],
            //     steps TEXT [],
            //     url TEXT
            //     );`;
            // let insertQueryText = `
            //     INSERT INTO testRecipes(title, tags, description, imageUrl, rating, ratingCount, timeAndServings, ingredients, steps, url)
            //     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            //     ON CONFLICT (url) DO NOTHING`;

            // client.query(insertQueryText, [title, tags, description, imageUrl, rating, ratingCount, timeAndServings, ingredients, steps, recipeUrl]);


            for (let recipeCategory of recipeCategories) {
                let recipeVars = [title, tags, description, imageUrl, rating, ratingCount, timeAndServings, ingredients, steps, recipeUrl];
                client.query(
                    `INSERT INTO ${recipeCategory}(title, tags, description, imageUrl, rating, ratingCount, timeAndServings, ingredients, steps, url)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`, recipeVars
                    // ON CONFLICT (url) DO NOTHING`, recipeVars
                )
            }
            // console.log(recipeCategories)
            // let r = await client.query(`SELECT * FROM ${recipeCategories[0]}`);
            // console.log(r.rows);



            // console.log(recipeData);

            // const res = await client.query('SELECT * FROM testRecipes');
            // console.log(res)
            // await client.end();

            // INSERT INTO tab_name(col_list)
            // SELECT val_list
            // WHERE
            // NOT EXISTS (
            // SELECT col_name FROM tab_name WHERE condition
            // );


            // INSERT INTO users (email, name)
            // VALUES ('example@example.com', 'John Doe')
            // ON CONFLICT (email) DO NOTHING;



        }
        // console.log("select all from testRecipes table")
        // let res = await client.query('SELECT * FROM testRecipes');
        // console.log(res.rowCount)
        // // Accessing each row individually
        // let row1 = res.rows[0];
        // const row2 = res.rows[1];
        // const row3 = res.rows[2];

        // // Displaying each row (object) individually
        // console.log(row1); // First object
        // console.log(row2); // Second object
        // console.log(row3); // Third object

        // await client.end();
        console.log("closing browser");
        await browser.close();
    } catch (error) {
        console.log(error)
    }
}

// getRecipeAmericasTestKitchen()


/*
- for every ingredient provided, check that it's in the ingredient list
- keep track of number of ingredients in the recipe
    - if you get through all ingredients in the recipe and you have all of them, we chillin
*/
/*
async function getRecipeRecommendations(ingredients, recipeCategory) {
    try {
        // console.log("select all from testRecipes table")
        let recipes = await client.query(`SELECT * FROM ${recipeCategory}`);
        // console.log(res.rowCount)
        // Accessing each row individually
        // let row1 = res.rows[0];
        // const row2 = res.rows[1];
        // const row3 = res.rows[2];

        // // Displaying each row (object) individually
        // console.log(row1); // First object
        // console.log(row2); // Second object
        // console.log(row3); // Third object

        let recipeRecommendations = [];
        console.log("recipe.rows.length", recipes.rows.length);
        
        for (recipe of recipes.rows) {
            let recipeIngredients = recipe.ingredients; 
            let numMatchingIngredients = 0;

            for (ingredient of ingredients) {
                for (recipeIngredient of recipeIngredients) {
                    if (recipeIngredient.includes(ingredient)) {
                        numMatchingIngredients += 1;
                        break;
                }
                }
            if (numMatchingIngredients == recipeIngredients.length) recipeRecommendations.push(recipe);
            }
        }
        console.log("recipeRecs.length", recipeRecommendations.length)
        return recipeRecommendations;
    } catch (error) {
        console.log(error)
    }
}




// some api stuff
const port = 8080;
const bodyParser = require('body-parser');

// Middleware to parse JSON data from requests
app.use(bodyParser.json());

// Mock database interaction function (replace with your actual database query logic)
// const mockDatabase = [];
// const getUsers = () => mockDatabase;
// const addUser = (user) => mockDatabase.push(user);

// Endpoint to retrieve users
app.get('/api/users', (req, res) => {
  const users = getUsers();
  res.json(users);
});

// Endpoint to add a new user
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  addUser(newUser);
  res.status(201).json({ message: 'User added successfully', user: newUser });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


app.post('/api/search-recipes', async (req, res) => {
    const searchPhrase = req.body;
    console.log(searchPhrase);

    const selectQueryText = `
        SELECT *
        FROM testRecipes
        WHERE EXISTS (
        SELECT 1
        FROM unnest(ingredients) AS ingredient
        WHERE ingredient ILIKE '%${searchPhrase.searchText}%'
    );`;

    let results = [];

    for (let category of ['breakfast', 'lunch', 'dessert']) {
        let recipes = await client.query(
            `SELECT *
            FROM ${category}
            WHERE EXISTS (
            SELECT 1
            FROM unnest(ingredients) AS ingredient
            WHERE ingredient ILIKE '%${searchPhrase.searchText}%');`
        )
        results = [...results, ...recipes.rows];
    }

    res.status(200).json({message: results});


    // do this select on each of the four tables
    // combine the results into one list
    // [...breakfastRecs, ...lunchRecs, ...dinnerRecs, ...dessertRecs]

    // remove duplicates
    // new Set(...): Creates a new Set from the array of strings, automatically removing duplicates.
    // Array.from(...): Converts the Set back to an array.

    // let recipeRecs = await client.query(selectQueryText);
    // console.log(recipeRecs.rowCount)
    // // Accessing each row individually

    // for (let recipe of recipeRecs.rows) {
    //     console.log(recipe);
    // }

    // let row1 = res.rows[0];
    // const row2 = res.rows[1];
    // const row3 = res.rows[2];

    // // Displaying each row (object) individually
    // console.log(row1); // First object
    // console.log(row2); // Second object
    // console.log(row3); // Third object


    // res.status(200).json({message: recipeRecs.rows});
});

app.post('/api/new-recipe', (req, res) => {
    const newRecipe = req.body;
    let category = newRecipe.category;

    // let insertQueryText = `
    //     INSERT INTO ${category}(title, description, imageUrl, rating, ratingCount, timeAndServings, ingredients, steps, url)
    //     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    //     ON CONFLICT (url) DO NOTHING`;

    let insertQueryText = `
        INSERT INTO testRecipes(title, tags, description, imageUrl, rating, ratingCount, timeAndServings, ingredients, steps, url)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (url) DO NOTHING`;

    client.query( 
        `INSERT INTO ${category}(title, tags, description, imageUrl, rating, ratingCount, timeAndServings, ingredients, steps, url)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        
        [newRecipe.title, newRecipe.tags, newRecipe.description, newRecipe.imageUrl, newRecipe.rating, newRecipe.ratingCount, newRecipe.timeAndServings, newRecipe.ingredients, newRecipe.steps, newRecipe.recipeUrl]);

    console.log(newRecipe);
    res.status(200).json({message: 'new recipe added!'});
})

app.post('/api/alena-test', async (req, res) => {
    // let recipe = await client.query('SELECT * FROM testRecipes');
    // Accessing each row individually
    // let row = recipe.rows[0];
    const request = req.body;
    let category = request.category;
    let ingredients = request.ingredients;

    console.log("alena-test", category, ingredients);

    let recs = await getRecipeRecommendations(ingredients, category);
    console.log("recs.length", recs.length);


    // console.log(ingredients);
    res.status(200).json({message:recs[0]})
})


// const spices = new Set([
//     'aidan fruit', 'carom seeds', 'ajwain', 'alexanders', 'alkanet', 'alligator pepper', 
//     'mbongo spice', 'hepper pepper', 'allspice', 'angelica', 'anise', 'star anise', 'aniseed myrtle',
//     'annatto', 'artemisia', 'asafoetida', 'avens', 'avocado leaf', 'barberry', 'sweet basil', 
//     'african basil', 'holy basil', 'lemon basil', 'thai basil', 'bay leaf', 'bay leaves',
//     'blue melilot', 'blue fenugreek', 'boldo', 'borage', 'california bay laurel', 
//     'black cardamom', 'nutmeg', ''
// ])


// const spices = new Set([
//     'allspice', 'anise', 'star anise', 'basil', 'bay leaf', 'bay leaves', 'nutmeg',
//     'caper', 'capers', 'caraway', 'caraway seeds', 'caraway seed', 'cardamom',
//     'black cardamom', 'cassia', 'cayenne pepper', 'celery leaf', 
// ])



























































































































































async function getRecipeAllRecipes() {
	try {
        // console.log('in getRecipePage');
        // await client.connect();
        // console.log('connected');
        // await client.query(createTableQueryText);
        // console.log("table created successfully");









        for (let j = 0; j < websites.length; j++) {

            // fetch html file from the website
            const response = await axios.get(websites[j]);
            const htmlFile = response.data;

            // parse the website html file
            const dom = new JSDOM(htmlFile);

            // recipe title
            const recipeTitle = dom.window.document.getElementsByClassName("article-heading type--lion")[0].textContent;

            // recipe description
            const recipeDescription = dom.window.document.getElementsByClassName("article-subheading type--dog")[0].textContent;

            // stars + rating counts
            const starCount = dom.window.document.getElementById("mm-recipes-review-bar__rating_1-0").textContent;
            const ratingCount = dom.window.document.getElementById("mm-recipes-review-bar__rating-count_1-0").textContent;
            const ratingCountWithoutParens = ratingCount.slice(1, -1);
            const rating = `${starCount} stars from ${ratingCountWithoutParens} ratings`;

            // cook, prep, total times, num servings
            const metricLabels = dom.window.document.getElementsByClassName("mm-recipes-details__label");
            const metricValues = dom.window.document.getElementsByClassName("mm-recipes-details__value");
            let time = "";
            let servings = "";
            for (let i = 0; i < metricLabels.length; i++) {
                let metric = `${metricLabels[i].textContent} ${metricValues[i].textContent}`;
                if (i === 0) time = metric;
                else if (i < 3) time += `, ${metric}`;
                else servings = metric;
            }

            // ingredient list and quantities
            const ingredientQuantities = dom.window.document.querySelectorAll('[data-ingredient-quantity="true"]');
            const ingredientUnits = dom.window.document.querySelectorAll('[data-ingredient-unit="true"]');
            const ingredientNames = dom.window.document.querySelectorAll('[data-ingredient-name="true"]');
            let ingredientsMap = new Map();

            for (let i = 0; i < ingredientNames.length; i++) {
                let ingredientName = ingredientNames[i].textContent.split(',')[0];
                let ingredientAmount = `${ingredientQuantities[i].textContent} ${ingredientUnits[i].textContent}`;
                ingredientsMap.set(ingredientName, ingredientAmount);
            }
            const ingredientsJson = JSON.stringify(Object.fromEntries(ingredientsMap));

            // steps
            const stepElements = dom.window.document.getElementById("mm-recipes-steps__content_1-0");
            const stepTextDescriptions = stepElements.getElementsByClassName("comp mntl-sc-block mntl-sc-block-html");
            let steps = [];
            for (let i = 0; i < stepTextDescriptions.length; i++) {
                let splitByPeriod = stepTextDescriptions[i].textContent.trim().split(". ");
                steps = [...steps, ...splitByPeriod];
            }
            // console.log(steps)
            const stepImages = stepElements.querySelectorAll("img[data-src]");
            // console.log(stepImages.length);
            const lastImage = stepImages[stepImages.length-1];
            const lastImageUrl = lastImage.getAttribute('data-src');
            // console.log(lastImageUrl);
            

            let recipeData = {
                title: recipeTitle,
                description: recipeDescription,
                imageUrl: lastImageUrl,
                rating: rating,
                starCount: Number(starCount),
                time: time,
                servings: servings,
                ingredientsMap: ingredientsMap,
                ingredientsJson: ingredientsJson,
                steps: steps,
                url: websites[j]
                // htmlFile: htmlFile

            }

            // let insertQueryText = `
            //     INSERT INTO breakfast(title, ingredients, time, servings, rating, steps)
            //     VALUES ($1, $2, $3, $4, $5, $6)`;

            // client.query(insertQueryText, [recipeTitle, ingredientsJson, time, servings, rating, steps]);

            console.log(recipeData);

            // const res = await client.query('SELECT * FROM breakfast');
            // console.log(res)
            // await client.end();
        }

	} catch (error) {
		console.error(error)
	}
}
// getRecipeAllRecipes()*/