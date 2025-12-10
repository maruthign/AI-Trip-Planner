export const SelectTravelesList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A solo traveles in exploration',
        icon: '🕴️',
        people: '1'
    },
    {
        id: 2,
        title: 'A Couple',
        desc: 'Two travels in tandem',
        icon: '👫',
        people: '2 peoples'
    },
    {
        id: 3,
        title: 'A Family',
        desc: 'A droup of fun loving adv',
        icon: '🏡',
        people: '3 to 5 peoples'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of thrill-seeks',
        icon: '👨🏻‍👩🏻‍👦🏻‍👦🏻',
        people: '5 to 10 peoples'
    },
]


export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: '💰',
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Comfortable and affordable',
        icon: '💵',
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Comfort and luxury',
        icon: '💸',
    },
]


export const AI_PROMPT = 'Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget. Return ONLY a JSON object with a "hotels" array (limit to 3 items: HotelName, HotelAddress, Price, hotel_image_url, geo_coordinates, rating, description) and an "itinerary" array (day, plan array (limit to 3 places per day: time, place_name, place_details, place_image_url, geo_coordinates, ticket_pricing, time_to_travel)). JSON only.'