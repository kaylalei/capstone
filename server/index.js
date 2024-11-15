const express = require('express');
const app = express();
const axios = require("axios");
const { JSDOM } = require('jsdom');
const { Client } = require('pg');
const puppeteer = require('puppeteer');
const cors = require('cors');

app.use(cors({ origin: 'http://localhost:3000' })); // Replace with your frontend URL

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// app.listen(8080, () => {
//     console.log('server listening on port 8080');
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

// // Example query
// client.query('SELECT NOW()', (err, res) => {
//   if (err) {
//     console.error('Error executing query:', err);
//   } else {
//     console.log('Current time:', res.rows[0].now);
//   }
//   client.end();
// });









// const client = new Client({
//     user: 'postgres',
//     password: 'Man-45663',
//     host: 'localhost',
//     port: 5432,
//     database: 'mydb',
//     ssl: {
//         require: true,
//         rejectUnauthorized: false,  // Bypass certificate verification if you don't have a local cert
//       }
// })
// console.log('created Client object');


const createTableQueryText = `
    CREATE TABLE IF NOT EXISTS testRecipes(
    title TEXT,
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

// try {
//     await client.query(queryText);
//     console.log('Table created successfully');
// } catch (error) {
//     console.error('Error creating table:', error);
// }


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

        // create table
        await client.query(createTableQueryText);
        // await client.query(addUrlConstraintQuery);
        console.log('Table created successfully');




        const browser = await puppeteer.launch();
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
        for (let i of recipeNums) {
        // for (let i = 2295; i < 2296; i++) {
            const recipeUrl = `https://www.americastestkitchen.com/recipes/${i}`;
            console.log(recipeUrl)
            await page.goto(recipeUrl);

            // don't scrape if this is not a valid recipe url
            let noRecipeElement = await page.$$('[class="errorPage_errorContent__0v4Lf"]');
            console.log(noRecipeElement.length);
            if (noRecipeElement.length > 0) continue;




            // title
            const titleElement = await page.$('h1');
            const title = await page.evaluate(titleElement => titleElement.textContent, titleElement);
            console.log('Title:', title);

            // rating
            const ratingElement = await page.$('#recipe-header-rating-score');
            if (ratingElement) rating = await page.evaluate(ratingElement => ratingElement.textContent, ratingElement);
            else rating = "Not rated";
            if (ratingElement) console.log('Rating:', rating);

            // rating count
            const ratingCountElement = await page.$('#recipe-header-rating-count');
            if (ratingCountElement) ratingCount = await page.evaluate(ratingCountElement => ratingCountElement.textContent.slice(1, -1), ratingCountElement);
            else ratingCount = "no ratings";
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
            console.log(timeAndServings);


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
            console.log(imageUrl);

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

            // steps
            let stepElements = await page.$$('[class="typography typography-module_base__PkumT typography-module_open-lg__b6RLE typography-module_proxima__HDZ4V typography-module_dangerouslySet__S4r6M"]');
            stepElements = stepElements.slice(1);   // remove the "Before You Begin" section
            let steps = [];
            for (const stepElement of stepElements) {
                const stepText = await page.evaluate(stepElement => stepElement.textContent, stepElement);
                let splitByPeriod = stepText.trim().split(". ");
                steps = [...steps, ...splitByPeriod];
            }
            console.log(steps);


            /*
            breakfast recipes -> Breakfast & Brunch
            dessert recipes -> Desserts or Baked Goods
            lunch and dinner recipes -> everything else
            */

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
            let insertQueryText = `
                INSERT INTO testRecipes(title, description, imageUrl, rating, ratingCount, timeAndServings, ingredients, steps, url)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                ON CONFLICT (url) DO NOTHING`;

            client.query(insertQueryText, [title, description, imageUrl, rating, ratingCount, timeAndServings, ingredients, steps, recipeUrl]);

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
        console.log("select all from testRecipes table")
        let res = await client.query('SELECT * FROM testRecipes');
        console.log(res.rowCount)
        // Accessing each row individually
        let row1 = res.rows[0];
        const row2 = res.rows[1];
        const row3 = res.rows[2];

        // Displaying each row (object) individually
        console.log(row1); // First object
        console.log(row2); // Second object
        console.log(row3); // Third object

        await client.end();
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

function getRecipeRecommendations(ingredients, recipeCategory) {
    /* some database query or api call to get recipes from the specified category */
    let recipes; /* all the recipes retrieved from the database */
    let recipeRecommendations = [];
    
    for (recipe of recipes) {
        let recipeIngredients = []; /* the ingredients list for the recipe - list of strings */
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
}




// some api stuff
// const express = require('express');
// const app = express();
const port = 8080;
const bodyParser = require('body-parser');

// Middleware to parse JSON data from requests
app.use(bodyParser.json());

// Mock database interaction function (replace with your actual database query logic)
const mockDatabase = [];
const getUsers = () => mockDatabase;
const addUser = (user) => mockDatabase.push(user);

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


app.post('/api/search', (req, res) => {
    const searchPhrase = req.body;
    console.log(searchPhrase);
    res.status(200).json({message: `${searchPhrase} recipeee`});
});

app.post('/api/new-recipe', (req, res) => {
    const newRecipe = req.body;
    console.log(newRecipe);
    res.status(200).json({message: 'new recipe added!'});
})

// app.post('/api/alena-test', (req, res) => {
//     const reqBody = req.body;
//     console.log(reqBody);
//     res.status(200).json({message: 'hiii alena'});
// })

app.get('/api/alena-test', async (req, res) => {
    let recipe = await client.query('SELECT * FROM testRecipes');
    // Accessing each row individually
    let row = recipe.rows[0];
    res.status(200).json({message:row})
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
// getRecipeAllRecipes()