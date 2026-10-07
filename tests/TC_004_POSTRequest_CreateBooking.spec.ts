import {test, expect} from '@playwright/test'

test("POST Request Create Booking",async function({request}){
    
    const bookingData={    
        "firstname" : "Sreekanth",
        "lastname" : "Sunnapu",
        "totalprice" : 200,
        "depositpaid" : true,
        "bookingdates" : {
            "checkin" : "2026-01-01",
            "checkout" : "2026-03-01"
        },
        "additionalneeds" : "Dinner"
    }

    const response=await request.post("https://restful-booker.herokuapp.com/booking",
        {headers:{'Content-type':"application/json"},data:bookingData});
    
    console.log(response.status())         //response Code:200
    const responseJsonData=await response.json();
    console.log(responseJsonData)

    //lets put validations : bookingid - not null
    expect(responseJsonData.bookingid).not.toBeNull();

    //bookingData here is the data that we have sent
    expect(responseJsonData.booking.firstname).toBe(bookingData.firstname)

    //validate checkin date, it is a nested property
    expect(responseJsonData.booking.bookingdates.checkin).toBe('2026-01-01');
    
});