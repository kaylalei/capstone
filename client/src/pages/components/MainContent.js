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

const breakfastCardData = [
  {
    img: 'https://res.cloudinary.com/hksqkdlah/image/upload/ar_1:1,c_fill,dpr_2.0,f_auto,fl_lossy.progressive.strip_profile,g_faces:auto,q_auto:low,w_344/SFS_Buttermilk_Blueberry_Pancakes_428_bnruvy',
    tags: ['Main Courses', 'Fruit', 'Breakfast & Brunch'],
    title: "Deluxe Blueberry Pancakes",
    description:
      "Fresh fruit and a diner trick take the most beloved of flapjacks to the next level.",
    stars: 4.5,
    ratings: 121,
    url: 'https://www.americastestkitchen.com/recipes/14903'
  },
  {
    img: 'https://res.cloudinary.com/hksqkdlah/image/upload/ar_1:1,c_fill,dpr_2.0,f_auto,fl_lossy.progressive.strip_profile,g_faces:auto,q_auto:low,w_344/35610_sfs-quiche-with-leeks-and-goat-cheese-014',
    tags: ['Main Courses', 'Europe', 'French', 'Fruits & Vegetables', 'Eggs & Dairy', 'Vegetables', 'Eggs', 'Cheese', 'Vegetarian', 'Breakfast & Brunch', 'Savory Pies & Tarts'],
    title: "Leek and Goat Cheese Quiche",
    description:
      "By using the proper combination of heavy cream, milk, whole eggs, and egg yolks, you can produce a custard that makes quiche worth eating once again.",
    stars: 4.5,
    ratings: 100,
    url: 'https://www.americastestkitchen.com/recipes/1335'
  },
];

const lunchCardData = [
  {
    img: 'https://res.cloudinary.com/hksqkdlah/image/upload/ar_1:1,c_fill,dpr_2.0,f_auto,fl_lossy.progressive.strip_profile,g_faces:auto,q_auto:low,w_344/1337_cvr-sfs-bstchixdumpsup-col0018-article',
    tags: ['Main Courses', 'US & Canada', 'American', 'Southern', 'Poultry', 'Chicken', 'Stews'],
    title: "Chicken and Dumplings",
    description:
      "Our goal was to develop a dumpling that was light, substantial, tender, and durable. We also wanted to make a complete meal in one dish.",
    stars: 4,
    ratings: 193
  },
  {
    img: 'https://res.cloudinary.com/hksqkdlah/image/upload/ar_1:1,c_fill,dpr_2.0,f_auto,fl_lossy.progressive.strip_profile,g_faces:auto,q_auto:low,w_344/SFS_QuesabirriaTacos-102_mdfc7i',
    tags: ['Main Courses', 'Latin America & Caribbean', 'Mexican', 'Fruits & Vegetables', 'Meat', 'Vegetables', 'Beef'],
    title: "Quesabirria Tacos",
    description:
      "A Tucson original with its own spin.",
    stars: 4,
    ratings: 260,
    url: 'https://www.americastestkitchen.com/recipes/15407'
  },
];

const dinnerCardData = [
  {
    img: 'https://res.cloudinary.com/hksqkdlah/image/upload/ar_1:1,c_fill,dpr_2.0,f_auto,fl_lossy.progressive.strip_profile,g_faces:auto,q_auto:low,w_344/43960-sfs-indian-butter-chicken-for-two-35-1',
    tags: ['Main Courses', 'Asia', 'Indian', 'Poultry', 'Chicken'],
    title: "Murgh Makhani (Indian Butter Chicken)",
    description:
      "Of course it should be rich and creamy. But for a version of this restaurant classic that’s vibrant and complex, there’s more to consider than the namesake ingredient.",
    stars: 4.5,
    ratings: 1052,
    url: 'https://www.americastestkitchen.com/recipes/11519'
  },
  {
    img: 'https://res.cloudinary.com/hksqkdlah/image/upload/ar_1:1,c_fill,dpr_2.0,f_auto,fl_lossy.progressive.strip_profile,g_faces:auto,q_auto:low,w_344/SFS_SalmonPiccata_37_xwji2y',
    tags: ['Main Courses', 'Italian', 'Fish & Seafood', 'Weeknight'],
    title: "Salmon Piccata",
    description:
      "This classic savory sauce takes salmon in a fresh new direction.",
    stars: 4,
    ratings: 341,
    url: 'https://www.americastestkitchen.com/recipes/13772'
  },
];

const dessertCardData = [
  {
    img: 'https://res.cloudinary.com/hksqkdlah/image/upload/ar_1:1,c_fill,dpr_2.0,f_auto,fl_lossy.progressive.strip_profile,g_faces:auto,q_auto:low,w_344/22419_sfs-french-apple-tart-15',
    tags: ['Desserts or Baked Goods', 'Fruit', 'Make Ahead', 'Fruit Desserts', 'Tarts'],
    title: "French Apple Tart",
    description:
      "Classic form and good looks are compulsory for a holiday centerpiece, but they don’t matter if the dessert falls apart when you serve it. We wanted integrity with the beauty.",
    stars: 4.5,
    ratings: 89,
    url: 'https://www.americastestkitchen.com/recipes/8114'
  },
  {
    img: 'https://res.cloudinary.com/hksqkdlah/image/upload/ar_1:1,c_fill,dpr_2.0,f_auto,fl_lossy.progressive.strip_profile,g_faces:auto,q_auto:low,w_344/SFS_Millionaire_Shortbread_418_1_fi4esc',
    tags: ['Desserts or Baked Goods', 'Great Britain', 'Chocolate', 'Make Ahead', 'Brownies & Bars'],
    title: "Millionaire's Shortbread",
    description:
      "Britain’s triple-decker combo of buttery cookie, sweet caramel, and dark chocolate makes a perfect holiday gift. But only if every layer is flawless.",
    stars: 4.5,
    ratings: 562,
    url: 'https://www.americastestkitchen.com/recipes/9253'
  },
];



const allCategoryCardData = [
  {
    img: 'https://res.cloudinary.com/hksqkdlah/image/upload/ar_1:1,c_fill,dpr_2.0,f_auto,fl_lossy.progressive.strip_profile,g_faces:auto,q_auto:low,w_344/SFS_SouthernStyleCastIronSkilletCornbread-28_fhvwze',
    tags: ['Main Courses', 'Grains', 'Quick Breads'],
    title: "Southern-Style Buttermilk Cornbread",
    description:
      "Cornbread is not hard to make, but a little care and attention to detail will get you better results.",
    stars: 4.5,
    ratings: 2,
    url: 'https://www.americastestkitchen.com/recipes/16619'
  },
  {
    img: 'https://res.cloudinary.com/hksqkdlah/image/upload/ar_1:1,c_fill,dpr_2.0,f_auto,fl_lossy.progressive.strip_profile,g_faces:auto,q_auto:low,w_344/SFS_Steak_Tips_with_Pumpkin_Risotto-22919_wfokok',
    tags: ['Main Courses', 'Vegetables', 'Rice', 'Beef', 'Weeknight'],
    title: "Steak Tips with Pumpkin Risotto",
    description:
      "Canned pumpkin adds flavor and color to this fall dinner.",
    stars: 4,
    ratings: 82,
    url: 'https://www.americastestkitchen.com/recipes/16505'
  },
];

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
      const response = await fetch('http://172.26.0.79:8080/api/search-recipes', {
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

      let recipes = data.message;

      let searchResults = [];
      for (let recipe of recipes) {
        console.log(typeof recipe, recipe);
        let recipeCard = {
          img: recipe.imageurl,
          tags: recipe.tags,
          title: recipe.title,
          description: recipe.description,
          stars: recipe.rating,
          ratings: recipe.ratingcount,
          url: recipe.url
        }
        searchResults.push(recipeCard);
      }
      console.log(searchResults);

      setCardData(searchResults);
      setCardCategory("search");


    } catch (error) {
      console.error('Error saving recipe in database: ', error);
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
              image={cardData[0].img}
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
                {cardData[0].tags.map((tag) => (
                  <Chip
                    size="medium" 
                    label={tag}
                    sx={{
                      backgroundColor: 'light gray'
                    }} />
                ))}
              </Box>

              <Typography gutterBottom variant="h6" component="div">
                {cardData[0].title}
              </Typography>
              <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                {cardData[0].description}
              </StyledTypography>
              <Stars starCount={cardData[0].stars} ratings={cardData[0].ratings} />
            </SyledCardContent>
            
          </SyledCard>
        </Grid>
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
              image={cardData[1].img}
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
              {cardData[0].tags.map((tag) => (
                <Chip
                  size="medium" 
                  label={tag}
                  sx={{
                    backgroundColor: 'light gray'
                  }} />
              ))}
            </Box>
              <Typography gutterBottom variant="h6" component="div">
                {cardData[1].title}
              </Typography>
              <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                {cardData[1].description}
              </StyledTypography>
              <Stars starCount={cardData[1].stars} ratings={cardData[1].ratings} />
            </SyledCardContent>
          </SyledCard>
        </Grid>
      </Grid>
    </Box>
  );
}
