import {test, expect} from '@playwright/test'

//PUT is a FULL Update request
//It replaces the entire source data with a new data that we send

//PATCH is a Partial Update Request
//this request replaces a targeted property in the source

test("PUT Full Update Demo", async({request})=>{
    
    const authData={
    "username" : "admin",
    "password" : "password123"
    }

    //first I need a token, so I am making a POST Request
    const response=await request.post('https://restful-booker.herokuapp.com/auth', 
        {headers:{'Content-type':'application/json'}, data:authData}) 
    
    const responseJsonData=await response.json()

    const authToken=responseJsonData.token;
    
    console.log("Token is: ", authToken)

    //creating a new booking, through a POST call and storing bookingid into bookingID (our local variable)
    const newBookingData={
        "firstname" : "Sreekanth",
        "lastname" : "Sunnapu",
        "totalprice" : 400,
        "depositpaid" : true,
        "bookingdates" : {
            "checkin" : "2026-01-01",
            "checkout" : "2026-02-01"
        },
        "additionalneeds" : "Dinner"
    }
    const newBookingResponse=await request.post('https://restful-booker.herokuapp.com/booking',
        {headers:{'Content-type':'application/json'}, data:newBookingData})
    
    const newBookingResponseJsonData=await newBookingResponse.json();

    console.log("Original Booking Details: ",newBookingResponseJsonData)

    const bookingID=newBookingResponseJsonData.bookingid;

    //console.log(newBookingResponseJsonData)
    console.log("New Booking ID is: ",bookingID)


    // Let us Update the Booking
    //we need====> bookingID: to pass along with url, token: to pass in coockie header

    const updatedBookingData={
        "firstname" : "Sreekanth",
        "lastname" : "Sunnapu",
        "totalprice" : 600,
        "depositpaid" : false,
        "bookingdates" : {
            "checkin" : "2026-01-01",
            "checkout" : "2026-02-01"
        },
        "additionalneeds" : "Self Drive Car"
    }
    const updatedResponse=await request.put('https://restful-booker.herokuapp.com/booking/'+bookingID,
        {headers:{"Content-type":"application/json","Accept":"application/json","Cookie":"token="+authToken},
        data:updatedBookingData})
    
    const updatedResponseJsonData=await updatedResponse.json();

    console.log("Updated Booking Details: ",updatedResponseJsonData)

    // console.log(updatedResponse.status())

    expect(updatedResponse.status()).toBe(200)

})
