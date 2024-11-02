const express = require('express');
const app = express();
const axios = require("axios");
const { JSDOM } = require('jsdom');
const { Client } = require('pg');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(8080, () => {
    console.log('server listening on port 8080');
});


const client = new Client({
    user: 'klei',
    password: 'hey-chef-db-password',
    host: 'hey-chef-db.cngq6g8kks7t.us-east-1.rds.amazonaws.com',
    port: 5432,
    database: 'mydb',
    ssl: {
        require: true,
        rejectUnauthorized: false,  // Bypass certificate verification if you don't have a local cert
      }
})
console.log('created Client object');


const createTableQueryText = `
    CREATE TABLE IF NOT EXISTS breakfast(
    title TEXT,
    ingredients JSONB,
    time TEXT,
    servings TEXT,
    rating TEXT,

    steps TEXT []
    );`;

// try {
//     await client.query(queryText);
//     console.log('Table created successfully');
// } catch (error) {
//     console.error('Error creating table:', error);
// }


const breakfastUrls = ['https://www.allrecipes.com/recipe/21014/good-old-fashioned-pancakes/',
                       'https://www.allrecipes.com/recipe/213717/chakchouka-shakshouka/',
                       'https://www.allrecipes.com/recipe/16895/fluffy-french-toast/',
                       'https://www.allrecipes.com/recipe/244251/no-cook-overnight-oatmeal/',
                       'https://www.allrecipes.com/recipe/15057/overnight-blueberry-french-toast/',
                       'https://www.allrecipes.com/recipe/220895/old-charleston-style-shrimp-and-grits/',
                       'https://www.allrecipes.com/recipe/162760/fluffy-pancakes/',
                       'https://www.allrecipes.com/recipe/257657/lemon-ricotta-pancakes/',
                       'https://www.allrecipes.com/recipe/87013/hash-brown-and-egg-casserole/',
                       'https://www.allrecipes.com/recipe/24148/easy-broccoli-quiche/',
                       'https://www.allrecipes.com/recipe/16383/basic-crepes/',
                       'https://www.allrecipes.com/recipe/51013/baked-oatmeal-ii/',
                       'https://www.allrecipes.com/recipe/98390/megans-granola/',
                       'https://www.allrecipes.com/recipe/17205/eggs-benedict/',
                       'https://www.allrecipes.com/recipe/20513/classic-waffles/',
                       'https://www.allrecipes.com/recipe/279754/chef-johns-blueberry-dutch-baby/',
                       'https://www.allrecipes.com/recipe/20334/banana-pancakes-i/',
                       'https://www.allrecipes.com/recipe/23900/german-apple-pancake/',
                       'https://www.allrecipes.com/recipe/244767/cinnamon-roll-pancakes/',
                       'https://www.allrecipes.com/recipe/228426/loaded-vegetarian-quiche/',
                       'https://www.allrecipes.com/recipe/24532/sausage-casserole/',
                       'https://www.allrecipes.com/recipe/143886/creamy-strawberry-crepes/',
                       'https://www.allrecipes.com/recipe/57783/emilys-famous-hash-browns/'
                    ];

const lunchUrls = ['https://www.allrecipes.com/recipe/23891/grilled-cheese-sandwich/',
                   'https://www.allrecipes.com/recipe/187342/banh-mi/',
                   'https://www.allrecipes.com/recipe/47717/reuben-sandwich-ii/',
                   'https://www.allrecipes.com/recipe/188473/buffalo-chicken-wraps/',
                   'https://www.allrecipes.com/recipe/13309/rich-and-simple-french-onion-soup/',
                   'https://www.allrecipes.com/recipe/77981/butternut-squash-soup-ii/',
                   'https://www.allrecipes.com/recipe/26460/quick-and-easy-chicken-noodle-soup/',
                   'https://www.allrecipes.com/recipe/13113/rich-and-creamy-tomato-basil-soup/',
                   'https://www.allrecipes.com/recipe/39544/garden-fresh-tomato-soup/',
                   'https://www.allrecipes.com/recipe/49552/quinoa-and-black-beans/',
                   'https://www.allrecipes.com/recipe/62763/terrific-turkey-chili/',
                   'https://www.allrecipes.com/recipe/20447/cheesy-tuna-melts/',
                   'https://www.allrecipes.com/recipe/85933/the-ultimate-pasta-salad/',
                   'https://www.allrecipes.com/recipe/143069/super-delicious-zuppa-toscana/',
                   'https://www.allrecipes.com/recipe/13045/broccoli-cheese-soup/',
                   'https://www.allrecipes.com/recipe/73963/pasta-salad-with-homemade-dressing/',
                   'https://www.allrecipes.com/recipe/13933/black-bean-and-corn-salad-ii/',
                   'https://www.allrecipes.com/recipe/24264/sloppy-joes-ii/',
                   'https://www.allrecipes.com/recipe/47717/reuben-sandwich-ii/',
                   'https://www.allrecipes.com/recipe/147103/delicious-egg-salad-for-sandwiches/',
                   'https://www.allrecipes.com/recipe/14415/cobb-salad/',
                   'https://www.allrecipes.com/recipe/16729/old-fashioned-potato-salad/'
                ];

const dinnerUrls = ['https://www.allrecipes.com/recipe/23600/worlds-best-lasagna/',
                    'https://www.allrecipes.com/recipe/158140/spaghetti-sauce-with-ground-beef/',
                    'https://www.allrecipes.com/recipe/172958/no-noodle-zucchini-lasagna/',
                    'https://www.allrecipes.com/recipe/14685/slow-cooker-beef-stew-i/',
                    'https://www.allrecipes.com/recipe/15925/creamy-au-gratin-potatoes/',
                    'https://www.allrecipes.com/recipe/26317/chicken-pot-pie-ix/',
                    'https://www.allrecipes.com/recipe/16354/easy-meatloaf/',
                    'https://www.allrecipes.com/recipe/216888/good-new-orleans-creole-gumbo/',
                    'https://www.allrecipes.com/recipe/31848/jambalaya/',
                    'https://www.allrecipes.com/recipe/11758/baked-ziti-i/',
                    'https://www.allrecipes.com/recipe/11679/homemade-mac-and-cheese/',
                    'https://www.allrecipes.com/recipe/18379/best-green-bean-casserole/',
                    'https://www.allrecipes.com/recipe/242352/greek-lemon-chicken-and-potatoes/',
                    'https://www.allrecipes.com/recipe/12720/grilled-salmon-i/',
                    'https://www.allrecipes.com/recipe/14759/pork-dumplings/',
                    'https://www.allrecipes.com/recipe/17991/stuffed-green-peppers-i/',
                    'https://www.allrecipes.com/recipe/18417/spanakopita-greek-spinach-pie/',
                    'https://www.allrecipes.com/recipe/14497/portobello-mushroom-burgers/',
                    'https://www.allrecipes.com/recipe/58211/authentic-louisiana-red-beans-and-rice/',
                    'https://www.allrecipes.com/recipe/79543/fried-rice-restaurant-style/',
                    'https://www.allrecipes.com/recipe/85389/gourmet-mushroom-risotto/',
                    'https://www.allrecipes.com/recipe/228823/quick-beef-stir-fry/'
                ];

const dessertUrls = ['https://www.allrecipes.com/recipe/12409/apple-crisp-ii/',
                     'https://www.allrecipes.com/recipe/52547/triple-berry-crisp/',
                     'https://www.allrecipes.com/recipe/8350/chantals-new-york-cheesecake/',
                     'https://www.allrecipes.com/recipe/13477/double-layer-pumpkin-cheesecake/',
                     'https://www.allrecipes.com/recipe/169305/sopapilla-cheesecake-pie/',
                     'https://www.allrecipes.com/recipe/9174/peanut-butter-pie/',
                     'https://www.allrecipes.com/recipe/12682/apple-pie-by-grandma-ople/',
                     'https://www.allrecipes.com/recipe/12142/sweet-potato-pie-i/',
                     'https://www.allrecipes.com/recipe/15093/grandmas-lemon-meringue-pie/',
                     'https://www.allrecipes.com/recipe/23439/perfect-pumpkin-pie/',
                     'https://www.allrecipes.com/recipe/17377/chocolate-cupcakes/',
                     'https://www.allrecipes.com/recipe/153245/pumpkin-spice-cupcakes/',
                     'https://www.allrecipes.com/recipe/230204/maris-banana-cupcakes/',
                     'https://www.allrecipes.com/recipe/79313/carrot-cupcakes-with-white-chocolate-cream-cheese-icing/',
                     'https://www.allrecipes.com/recipe/22749/the-best-banana-pudding/',
                     'https://www.allrecipes.com/recipe/7177/bread-pudding-ii/',
                     'https://www.allrecipes.com/recipe/19165/creme-brulee/',
                     'https://www.allrecipes.com/limoncello-ricotta-cake-recipe-7970804',
                     'https://www.allrecipes.com/recipe/25037/best-big-fat-chewy-chocolate-chip-cookie/',
                     'https://www.allrecipes.com/recipe/17891/golden-sweet-cornbread/',
                     'https://www.allrecipes.com/recipe/17981/one-bowl-chocolate-cake-iii/',
                     'https://www.allrecipes.com/recipe/9827/chocolate-chocolate-chip-cookies-i/'
                ];

const websites = ['https://www.allrecipes.com/recipe/158140/spaghetti-sauce-with-ground-beef/',
                  'https://www.allrecipes.com/recipe/17891/golden-sweet-cornbread/',
                  'https://www.allrecipes.com/recipe/10813/best-chocolate-chip-cookies/'
                ];
/*
recipe {
    title: string
    description?: string
    ingredients: map (ingredient (string): quantity (int))
    time: string "Prep Time: __, Cook Time: __, Total Time: __"
    servings: string "Servings: __"
    rating: string "XX Stars From XX Ratings"
    starCount: int  // sort recipe recommendations by starCount (highest to lowest)
    steps: list of strings
    htmlFile: response.data (to be displayed in the app?)
}
*/


async function getRecipePage() {
	try {
        // console.log('in getRecipePage');
        // await client.connect();
        // console.log('connected');
        // await client.query(createTableQueryText);
        // console.log("table created successfully");


		// Request recipe and "await" the response

        for (let j = 0; j < websites.length; j++) {

            // fetch html file from the website
            const response = await axios.get(websites[j]);
            const htmlFile = response.data;

            // parse the website html file
            const dom = new JSDOM(htmlFile);

            // recipe title
            const recipeTitle = dom.window.document.getElementsByClassName("article-heading type--lion")[0].textContent;

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
            const stepElements = dom.window.document.getElementById("mm-recipes-steps__content_1-0")
                                                    .getElementsByClassName("comp mntl-sc-block mntl-sc-block-html");
            let steps = []
            for (let i = 0; i < stepElements.length; i++) {
                let splitByPeriod = stepElements[i].textContent.trim().split(". ");
                steps = [...steps, ...splitByPeriod];
            }
            console.log(steps)

            let recipeData = {
                title: recipeTitle,
                ingredientsJson: ingredientsJson,
                ingredientsMap: ingredientsMap,
                time: time,
                servings: servings,
                rating: rating,
                // starCount: Number(starCount),
                steps: steps,
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
getRecipePage()