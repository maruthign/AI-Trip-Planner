export const SelectTravelesList=[
    {
        id:1,
        title:'Just Me',
        desc:'A solo traveles in exploration',
        icon:'🕴️',
        people:'1'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two travels in tandem',
        icon:'👫',
        people:'2 peoples'
    },
    {
        id:3,
        title:'A Family',
        desc:'A droup of fun loving adv',
        icon:'🏡',
        people:'3 to 5 peoples'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seeks',
        icon:'👨🏻‍👩🏻‍👦🏻‍👦🏻',
        people:'5 to 10 peoples'
    },
]


export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon:'💰',
    },
    {
        id:2,
        title:'Moderate',
        desc:'Comfortable and affordable',
        icon:'💵',
    },
    {
        id:3,
        title:'Luxury',
        desc:'Comfort and luxury',
        icon:'💸',
    },
]


export const AI_PROMPT='Generate Travel Plan for Location : {location}, for {totalDays} Days for {traveler} with a {budget} budget , Give me a Hotels option list with HotelName, HotelAddress, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with time, PlaaceName, PlaceDetails, Place Image url, Geo Coordinates, ticket Pricing, Time to travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.'