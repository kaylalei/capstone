const express = require('express');
const app = express();
const axios = require("axios");
const { JSDOM } = require('jsdom');
const { Client } = require('pg');
const puppeteer = require('puppeteer');

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
// console.log('created Client object');


const createTableQueryText = `
    CREATE TABLE IF NOT EXISTS breakfast(
    title TEXT,
    description TEXT,
    imageUrl TEXT
    rating TEXT,
    
    time TEXT,
    servings TEXT,
    ingredients JSONB,
    steps TEXT []
    url TEXT
    );`;

// try {
//     await client.query(queryText);
//     console.log('Table created successfully');
// } catch (error) {
//     console.error('Error creating table:', error);
// }


/*
const puppeteer = require('puppeteer');

(async () => {
  // Launch a new browser session
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the login page
  await page.goto('https://example.com/login');

  // Enter username and password
  await page.type('#username', 'yourUsername');
  await page.type('#password', 'yourPassword');

  // Click the login button
  await page.click('#loginButton');

  // Wait for navigation to finish
  await page.waitForNavigation();

  // Navigate to the page you want to scrape (after login)
  await page.goto('https://example.com/protected-page');

  // Perform the scraping actions you need, e.g., get the page content
  const data = await page.content();

  // Process the data (this is just an example, you'll need to parse the content as needed)
  console.log(data);

  // Close the browser session
  await browser.close();
})();
*/







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
                   'https://www.allrecipes.com/recipe/8499/basic-chicken-salad/',
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

// const websites = ["https://www.allrecipes.com/recipe/17891/golden-sweet-cornbread/"];
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

// 16623
// google oauth

async function getRecipeAmericasTestKitchen() {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto('https://www.americastestkitchen.com/sign_in');

        // let elements = await page.$$('.SignInForm_form__86vFk'); 
        // console.log(elements.length)

        await page.type('[type="email"]', 'klei@andrew.cmu.edu');
        await page.type('[type="password"]', 'Man-45663');

        await page.click('.SignInForm_button__GOnId');
        console.log("pressed sign in button")

        await page.waitForNavigation({
            waitUntil: 'networkidle0',
        });

        // console.log("after waiting")

        // elements = await page.$$('.SignInForm_form__86vFk'); 
        // console.log(elements.length)

        // console.log("should not see the sign in form anymore")


        // elements = await page.$$('.AccountDropdown-module_accountDropdown__kpDwC'); 
        // console.log(elements.length)

        // console.log("should see the account drop down")
        for (let i = 16489; i < 16490; i++) {
            await page.goto(`https://www.americastestkitchen.com/recipes/${i}`);

            // title
            const titleElement = await page.$('h1');
            const title = await page.evaluate(titleElement => titleElement.textContent, titleElement);
            console.log('Title:', title);

            // rating
            const ratingElement = await page.$('#recipe-header-rating-score');
            const rating = await page.evaluate(ratingElement => ratingElement.textContent, ratingElement);
            console.log('Rating:', rating);

            // rating count
            const ratingCountElement = await page.$('#recipe-header-rating-count');
            const ratingCount = await page.evaluate(ratingCountElement => ratingCountElement.textContent.slice(1, -1), ratingCountElement);
            console.log('Rating count:', ratingCount);

            // tags
            const tags = [];
            const tagElements = await page.$$('.Link-module_chip__ATQxp');
            for (const tagElement of tagElements) {
                const tag = await page.evaluate(tagElement => tagElement.textContent, tagElement);
                tags.push(tag);
            }
            console.log(tags);

            // description
            const descriptionElement = await page.$('[class="typography RecipePageHeader_description__1Xwwc typography-module_base__PkumT typography-module_open-xlg__MHo6f typography-module_proxima__HDZ4V"]');
            const description = await page.evaluate(descriptionElement => descriptionElement.textContent, descriptionElement);
            console.log(description);

            // servings and / or time
            let specs = "";
            const specNameElements = await page.$$('[class="typography typography-module_base__PkumT typography-module_caps-sm__OYAE9 typography-module_proxima__HDZ4V typography-module_font-weight--bold__xhayO"]');
            const specQuantityElements = await page.$$('[class="typography typography-module_base__PkumT typography-module_open-sm__6cWJa typography-module_proxima__HDZ4V"]');
            for (let i = 0; i < specNameElements.length; i++) {
                const specNameElement = specNameElements[i];
                const specName = await page.evaluate(specNameElement => specNameElement.textContent, specNameElement);

                const specQuantityElement = specQuantityElements[i];
                const specQuantity = await page.evaluate(specQuantityElement => specQuantityElement.textContent, specQuantityElement);

                let spec = `${specName.trim()}: ${specQuantity}`;

                if (specs) specs += `\n${spec}`;
                else specs = `${spec}`;
            }
            console.log(specs);


            // image url
            let imageUrl = "";
            const imageElements = await page.$$('img');
            for (const imageElement of imageElements) {
                let alt = await page.evaluate(imageElement => imageElement.getAttribute('alt'), imageElement);
                if (!alt) {
                    imageUrl = await page.evaluate(imageElement => imageElement.getAttribute('src'), imageElement);
                    break;
                }
            }
            console.log(imageUrl);
            // console.log(imageElement);
            // const imageUrl = await page.evaluate(imageElement => imageElement.getAttribute('src'), imageElement);
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
            console.log(ingredients)
            console.log(ingredientString)

            // steps
            const stepElements = await page.$$('[class="typography typography-module_base__PkumT typography-module_open-lg__b6RLE typography-module_proxima__HDZ4V typography-module_dangerouslySet__S4r6M"]');
            let steps = [];
            for (const stepElement of stepElements) {
                const stepText = await page.evaluate(stepElement => stepElement.textContent, stepElement);
                let splitByPeriod = stepText[i].stepText.trim().split(". ");
                steps = [...steps, ...splitByPeriod];
            }

            console.log(steps);
        }

        await browser.close();
    } catch (error) {
        console.log(error)
    }
}

getRecipeAmericasTestKitchen()

































































































































































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