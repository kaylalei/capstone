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

const breakfastCardData = [
  {
    img: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2022%2F06%2F21%2F4518440-lemon-ricotta-pancakes-Chef-John-1x1-1.jpg&q=60&c=sc&poi=auto&orient=true&h=512',
    tag: 'Breakfast',
    title: "Lemon Ricotta Pancakes",
    description:
      "If these lemon ricotta pancakes were any lighter, they would float off the plate! They are easy to make and delicious served with a pat of butter, lemon zest, and a drizzle of maple syrup.",
    stars: 4.8,
    ratings: 203
  },
  {
    img: 'https://www.allrecipes.com/thmb/Q9tSLO44euYUv960CoO_bb2tD4Y=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-24148-easy-broccoli-quiche-beauty-4x3-e73d1f8a3a7c466f86f8b6cf33e76050.jpg',
    tag: 'Breakfast',
    title: "Easy Broccoli Quiche",
    description:
      "This broccoli quiche is vegetarian and a snap to make with your favorite crust. It looks great on any buffet table.",
    stars: 4.4,
    ratings: 1495
  },
];

const lunchCardData = [
  {
    img: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2020%2F06%2F19%2FSuper-Delicious-Zuppa-Toscana.jpeg&q=60&c=sc&poi=auto&orient=true&h=512',
    tag: 'Lunch',
    title: "Super-Delicious Zuppa Toscana",
    description:
      "Zuppa Toscana is oh-so-good! This recipe has just the right amount of spice to keep you coming back for more!",
    stars: 4.8,
    ratings: 3568
  },
  {
    img: 'https://www.allrecipes.com/thmb/sKoeSuJsr2A47e-q0P5bVqGDTzg=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/47717-reuben-sandwich-ddmfs-hero-3x4-0624-88eae0b6357843b593b4f03f7debc7e1.jpg',
    tag: 'Lunch',
    title: "Reuben Sandwich",
    description:
      "A Reuben sandwich is one of my family's fix-it-quick favorites. They are really delicious and easy to make. I like to serve them with big bowls of steaming vegetable soup and dill pickles on the side.",
    stars: 4.7,
    ratings: 704
  },
];

const dinnerCardData = [
  {
    img: 'https://www.allrecipes.com/thmb/wj4a78k4z3GFayT_PrGqU51aCKs=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/242352-greek-lemon-chicken-and-potatoes-DDMFS-4x3-6111-76a4d0f07389450ca6d559113574076e.jpg',
    tag: 'Dinner',
    title: "Greek Lemon Chicken and Potatoes",
    description:
      "This Greek lemon chicken dish with garlic and herb roast potatoes is a classic recipe and easy to cook in one roasting pan. The lemony crispy chicken is a proven crowd-pleaser, easy on the wallet, and a favorite of mine.",
    stars: 4.8,
    ratings: 1346
  },
  {
    img: 'https://www.allrecipes.com/thmb/dmajq6rh5MZUlrpgu7wO0AFr6sk=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/14759-pork-dumplings-DDMFS-4x3-f87c9459ec73475f9dcab4cc651c46d3.jpg',
    tag: 'Dinner',
    title: "Pork Dumplings",
    description:
      "These tasty steamed pork dumplings make a perfect appetizer for a party or you can serve them as a main dish.  Serve with hoisin sauce, hot Chinese-style mustard, and toasted sesame seeds.",
    stars: 4.6,
    ratings: 385
  },
];

const dessertCardData = [
  {
    img: 'https://www.allrecipes.com/thmb/uVIfnzDWQ9WxRTshzoy9IbrVjyg=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/52547-Triple-Berry-Crisp-DDMFS-3x4-9c9c40ae0762443d92163d16f5397476.jpg',
    tag: 'Dessert',
    title: "Triple Berry Crisp",
    description:
      "This berry crisp recipe is made with a triple berry mixture of raspberries, blackberries, and blueberries. It's a very pretty dessert and tastes fantastic. My family loves it! Delicious served warm with whipped cream.",
    stars: 4.7,
    ratings: 1325
  },
  {
    img: 'https://www.allrecipes.com/thmb/3vyKrtDL_9lFvNqcnV1Ra1xngjk=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/17377-chocolate-cupcakes-DDMFS-4x3-622a7a66fcd84692947794ed385dc991.jpg',
    tag: 'Dessert',
    title: "Chocolate Cupcakes",
    description:
      "Chocolate cupcakes are the ultimate party food. These are super moist and bursting with rich, chocolaty flavor — and they're so easy to make. Frost these delicious chocolate cupcakes with buttercream or cream cheese frosting, or try royal icing or even whipped cream.",
    stars: 4.1,
    ratings: 1561
  },
];






const allCategoryCardData = [
  {
    img: 'https://www.allrecipes.com/thmb/GvI7NxsOoNqbP52MM8bsaTWFUSE=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/76594-grandmothers-buttermilk-cornbread-beauty-3x4-0135064414801604-dd84dcaf1d0f421eb3b6fdced8cf0ad3.jpg',
    tag: 'Dessert',
    title: "Grandmother's Buttermilk Cornbread",
    description:
      "The best cornbread recipe is my grandmother's, and this is it — sweet and moist!",
    stars: 4.8,
    ratings: 7508
  },
  {
    img: 'https://www.allrecipes.com/thmb/iOfxQGOJTdM0K6edW-MFkn-nydE=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/23600-worlds-best-lasagna-DDMFS-4x3-1196-24c5401652934ffb96d3d94bc9fbe2d7.jpg',
    tag: 'Dinner',
    title: "World's Best Lasagna",
    description:
      "This lasagna recipe takes a little work, but it is so satisfying and filling that it's worth it!",
    stars: 4.8,
    ratings: 20691
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
  console.log(starType)
  if (starType === "empty") return <StarBorder/>;
  if (starType === "half") return <StarHalf/>;
  return <Star/>;
}

function Stars({ starCount, ratings }) {
  let stars = starCount
  let starIcons = [];
  while (starCount > 0) {
    console.log(starCount)
    if (starCount <= 0) starIcons.push("empty");
    else if (starCount < 0.5) starIcons.push("half");
    else starIcons.push("full");
    starCount -= 1;
  }
  console.log(starIcons)

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
  const [cardCategory, setCardCategory] = React.useState("all categories")

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
      case "all categories":
        setCardData(allCategoryCardData);
        setCardCategory("all categories");
        break;
    }
  };

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
        <Search />
        <IconButton size="small" aria-label="RSS feed">
          <RssFeedRoundedIcon />
        </IconButton>
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
          <Search />
          <IconButton size="small" aria-label="RSS feed">
            <RssFeedRoundedIcon />
          </IconButton>
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
              <Typography gutterBottom variant="caption" component="div">
                {cardData[0].tag}
              </Typography>
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
              <Typography gutterBottom variant="caption" component="div">
                {cardData[1].tag}
              </Typography>
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
