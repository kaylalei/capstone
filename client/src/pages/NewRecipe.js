import { useState, useEffect } from 'react';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import NavBar from './components/NavBar.js';
import AppTheme from '../theme/AppTheme.js';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import { Select, MenuItem } from '@mui/material';

export default function NewRecipe(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <NavBar />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <NewRecipeForm />
      </Container>
    </AppTheme>
  );
}


















// title TEXT,
// description TEXT,
// imageUrl TEXT
// rating TEXT,

// timeAndServings TEXT,
// ingredients TEXT [],
// steps TEXT [],
// url TEXT,
// notes TEXT []



function NewRecipeForm() {
  const [recipeCategory, setRecipeCategory] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([""]);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [rating, setRating] = useState("");
  const [timeAndServings, setTimeAndServings] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [steps, setSteps] = useState([""]);
  const [url, setUrl] = useState("");
  // const [newUser, setNewUser] = useState({ name: '', email: '' });

  const saveRecipeInDatabase = async () => {
    try {
      const newRecipe = {
        category: recipeCategory,
        title: title,
        description: description,
        imageUrl: imageUrl,
        rating: rating,
        timeAndServings: timeAndServings,
        ingredients: ingredients,
        steps: steps,
        url: url
      };
      console.log(newRecipe);
      // const response = await fetch('http://localhost:8080/api/new-recipe', {
      const response = await fetch('http://172.26.0.79:8080/api/new-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecipe),
      });
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('Error saving recipe in database: ', error);
    }
  }






  // Fetch users from the backend
  // const fetchUsers = async () => {
  //   try {
  //     const response = await fetch('http://localhost:8080/api/users');
  //     const data = await response.json();
  //     // setUsers(data);
  //   } catch (error) {
  //     console.error('Error fetching users:', error);
  //   }
  // };

  // Add a new user to the backend
  // const addUser = async () => {
  //   try {
  //     const response = await fetch('http://localhost:8080/api/users', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(newUser),
  //     });
  //     const data = await response.json();
  //     console.log(data.message);
  //     fetchUsers(); // Refresh the user list after adding a new user
  //   } catch (error) {
  //     console.error('Error adding user:', error);
  //   }
  // };

  // Fetch users on component mount
  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  return (
    <div>
      <h1>New Recipe</h1>

      <h2>Recipe Category</h2>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={recipeCategory}
        label="Recipe category"
        onChange={(e) => {setRecipeCategory(e.target.value)}}
      >
        <MenuItem value={"Breakfast"}>Breakfast</MenuItem>
        <MenuItem value={"Lunch"}>Lunch</MenuItem>
        <MenuItem value={"Dinner"}>Dinner</MenuItem>
        <MenuItem value={"Dessert"}>Dessert</MenuItem>
      </Select>

      <h2>Title</h2>
      <OutlinedInput
        // id={index}
        type="text"
        placeholder="Recipe title"
        value={title}
        // onChange={(e) => setIngredients({ ...ingredients, name: e.target.value })}
        // onChange={(e) => setIngredients([...ingredients, e.target.value])}
        onChange={(e) => {setTitle(e.target.value); console.log(title)}}
        sx={{
          width: '100%'
        }}
      />

      <h2>Tags (Optional)</h2>
      {tags.map((tag, index) => (
        <div>
          <OutlinedInput
            id={index}
            type="text"
            placeholder="Recipe tag"
            value={tag}
            // onChange={(e) => setIngredients({ ...ingredients, name: e.target.value })}
            // onChange={(e) => setIngredients([...ingredients, e.target.value])}
            onChange={(e) => {let newTags = [...tags];
                              console.log(e.target.id, e.target.value)
                              newTags[e.target.id] = e.target.value;
                              console.log(newTags)
                              setTags(newTags)
            }}
            sx={{
              width: '91%'
            }}
          />
          <Button variant="contained" color="primary" size="small"
            // href={index}
            onClick={() => {let newTags = [...tags];
                            if (newTags.length > 1) newTags.splice(index, 1);
                            setTags(newTags);

            }}>
            <b>Remove Tag</b>
          </Button>
        </div>
      ))
      }

      <Button variant="contained" color="primary" size="small" border="gray"
        onClick={() => {let newTags = [...tags, ""];
                        setTags(newTags);
        }}>
        <b>Add Tag</b>
      </Button>

      <h2>Description (Optional)</h2>
      <OutlinedInput
        // id={index}
        type="text"
        placeholder="Recipe description"
        value={description}
        // onChange={(e) => setIngredients({ ...ingredients, name: e.target.value })}
        // onChange={(e) => setIngredients([...ingredients, e.target.value])}
        onChange={(e) => {setDescription(e.target.value); console.log(description)}}
        sx={{
          width: '100%'
        }}
      />

      <h2>Image URL (Optional)</h2>
      <OutlinedInput
        // id={index}
        type="text"
        placeholder="Recipe image url"
        value={imageUrl}
        // onChange={(e) => setIngredients({ ...ingredients, name: e.target.value })}
        // onChange={(e) => setIngredients([...ingredients, e.target.value])}
        onChange={(e) => {setImageUrl(e.target.value); console.log(imageUrl)}}
        sx={{
          width: '100%'
        }}
      />

      <h2>Rating (Optional)</h2>
      <OutlinedInput
        // id={index}
        type="text"
        placeholder="Recipe rating"
        value={rating}
        // onChange={(e) => setIngredients({ ...ingredients, name: e.target.value })}
        // onChange={(e) => setIngredients([...ingredients, e.target.value])}
        onChange={(e) => {setRating(e.target.value); console.log(rating)}}
        sx={{
          width: '100%'
        }}
      />

      <h2>Cook Time and Servings Estimates (Optional)</h2>
      <OutlinedInput
        // id={index}
        type="text"
        placeholder="Recipe cook time and serving yield estimates"
        value={timeAndServings}
        // onChange={(e) => setIngredients({ ...ingredients, name: e.target.value })}
        // onChange={(e) => setIngredients([...ingredients, e.target.value])}
        onChange={(e) => {setTimeAndServings(e.target.value); console.log(timeAndServings)}}
        sx={{
          width: '100%'
        }}
      />
    
      <h2>Ingredients</h2>
      {ingredients.map((ingredient, index) => (
        <div>
          <OutlinedInput
            id={index}
            type="text"
            placeholder="Ingredient quantity and name"
            value={ingredient}
            // onChange={(e) => setIngredients({ ...ingredients, name: e.target.value })}
            // onChange={(e) => setIngredients([...ingredients, e.target.value])}
            onChange={(e) => {let newIngredients = [...ingredients];
                              console.log(e.target.id, e.target.value)
                              newIngredients[e.target.id] = e.target.value;
                              console.log(newIngredients)
                              setIngredients(newIngredients)
            }}
            sx={{
              width: '88%'
            }}
          />
          <Button variant="contained" color="primary" size="small"
            // href={index}
            onClick={() => {let newIngredients = [...ingredients];
                            if (newIngredients.length > 1) newIngredients.splice(index, 1);
                            setIngredients(newIngredients);

            }}>
            <b>Remove Ingredient</b>
          </Button>
        </div>
      ))
      }
      


      <Button variant="contained" color="primary" size="small" border="gray"
        onClick={() => {let newIngredients = [...ingredients, ""];
                        setIngredients(newIngredients);
        }}>
        <b>Add Ingredient</b>
      </Button>


      <h2>Recipe Steps</h2>
      {steps.map((step, index) => (
        <div>
          <OutlinedInput
            id={index}
            type="text"
            placeholder="Ingredient quantity and name"
            value={step}
            // onChange={(e) => setIngredients({ ...ingredients, name: e.target.value })}
            // onChange={(e) => setIngredients([...ingredients, e.target.value])}
            onChange={(e) => {let newSteps = [...steps];
                              console.log(e.target.id, e.target.value)
                              newSteps[e.target.id] = e.target.value;
                              console.log(newSteps)
                              setSteps(newSteps)
            }}
            sx={{
              width: '88%'
            }}
          />
          <Button variant="contained" color="primary" size="small"
            // href={index}
            onClick={() => {let newSteps = [...steps];
                            if (newSteps.length > 1) newSteps.splice(index, 1);
                            setSteps(newSteps);

            }}>
            <b>Remove Ingredient</b>
          </Button>
        </div>
      ))
      }
      


      <Button variant="contained" color="primary" size="small" border="gray"
        onClick={() => {let newSteps = [...steps, ""];
                        setSteps(newSteps);
        }}>
        <b>Add Ingredient</b>
      </Button>

      <h2>Recipe Page URL (Optional)</h2>
      <OutlinedInput
        // id={index}
        type="text"
        placeholder="Recipe web page url"
        value={url}
        // onChange={(e) => setIngredients({ ...ingredients, name: e.target.value })}
        // onChange={(e) => setIngredients([...ingredients, e.target.value])}
        onChange={(e) => {setUrl(e.target.value); console.log(url)}}
        sx={{
          width: '100%'
        }}
      />
      
      <br/>
      <br/>
      <br/>
      <br/>
      <Button variant="contained" color="primary" size="large"
        onClick={saveRecipeInDatabase}>
        <b>Upload Recipe</b>
      </Button>

    </div>
  );
}


