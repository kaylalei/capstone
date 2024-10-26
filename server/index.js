const express = require('express');
const app = express();
const axios = require("axios");
const { JSDOM } = require('jsdom');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(8080, () => {
    console.log('server listening on port 8080');
});


const client = new Client({
    user: 'klei',
    password: 'Man-45663',
    host: 'database.server.com',
    port: 5432,
    database: 'mydb',
})
   
await client.connect()

const createTableQueryText = `
    CREATE TABLE IF NOT EXISTS breakfast(
    title TEXT,
    ingredients JSONB,
    time TEXT,
    servings TEXT,
    rating TEXT,
    starCount SMALLINT,
    steps TEXT []
    );`;

try {
    await client.query(queryText);
    console.log('Table created successfully');
} catch (error) {
    console.error('Error creating table:', error);
}





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
            const steps = []
            for (let i = 0; i < stepElements.length; i++) {
                steps.push(stepElements[i].textContent.trim());
            }

            let recipeData = {
                title: recipeTitle,
                // ingredients: ingredients,
                time: time,
                servings: servings,
                rating: rating,
                starCount: Number(starCount),
                steps: steps,
                // htmlFile: htmlFile

            }

            let insertQueryText = `
                INSERT INTO breakfast(title, ingredients, time, servings, rating, starCount, steps)
                VALUES ($1, $2, $3, $4, $5, $6, $7)`;

            client.query(insertQueryText, [recipeTitle, ingredientsJson, time, servings, rating, starCount, steps]);

    
        }

	} catch (error) {
		console.error(error)
	}
}
getRecipePage()