export const SelectTravellersList = [
    {
        id:1,
        title: 'Solo',
        desc: 'Discover the world on your own terms, one adventure at a time.',
        icon: '🎒',
        people:'1'
    },
    {
        id:2,
        title: 'Couple',
        desc: 'Perfect for couples seeking memorable moments together.',
        icon: '🥂',
        people:'2'
    },
    {
        id:3,
        title: 'Family',
        desc: 'Create lasting memories with your loved ones on a shared journey.',
        icon: '🏡',
        people:'4'
    },
    {
        id:4,
        title: 'Group',
        desc: 'Gather your crew and embark on a thrilling adventure together.',
        icon: '⛵',
        people:'5 to 10'
    }
]

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Budget-Friendly',
        desc: 'Ideal for cost-conscious travelers',
        icon: '🪙',
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Balanced costs for comfort and affordability',
        icon: '💵',
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Indulge without worrying about expenses',
        icon: '💎',
    },
]

export const SelectThemeOptions = [
    {
        id: 1,
        title: 'Heritage',
        img: 'https://i.pravatar.cc/40?img=6'
    },
    {
        id: 2,
        title: 'Nightlife',
        img: 'https://i.pravatar.cc/40?img=7'
    },
    {
        id: 3,
        title: 'Adventure',
        img: 'https://i.pravatar.cc/40?img=8'
    },
    {
        id: 4,
        title: 'Luxury',
        img: 'https://i.pravatar.cc/40?img=9'
    },
    {
        id: 5,
        title: 'Beach',
        img: 'https://i.pravatar.cc/40?img=10'
    },
    {
        id: 6,
        title: 'Nature',
        img: 'https://i.pravatar.cc/40?img=11'
    }
]

export const AI_PROMPT='Generate travel plan for location: {location}, for {noOfDays} days, for {noOfTraveler} people with a {budget} budget with a focus on {theme}. All in JSON format. Give me best hotel list, at least 5 with name, exact Address, Price, Rating, Description. Suggest itinerary plan as array for each day as list with place name, place details, ticket pricing, rating, time to explore that place and best to visit that place for each of the location for {noOfDays} days.'

export const PHOTO_REF_URL='https://places.googleapis.com/v1/{placeName}/media?maxHeightPx=1000&maxWidthPx=1000&key=' + import.meta.env.VITE_GOOGLE_API_KEY
export const PHOTO_REF_URL_LOW_QUAL='https://places.googleapis.com/v1/{placeName}/media?maxHeightPx=400&maxWidthPx=400&key=' + import.meta.env.VITE_GOOGLE_API_KEY