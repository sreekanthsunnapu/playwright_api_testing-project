import {test, expect} from '@playwright/test'

test("Delete Request Demo", async({request})=>{

    //in order to delete a record, let us first create one and delete the same 

    //let us first make a POST call to generate a token and store it
    const authData={
        "username" : "admin",
        "password" : "password123"
    }
    const tokenResponse=await request.post('https://restful-booker.herokuapp.com/auth',{headers:{"Content-Type": "application/json"}, data:authData})

    const tokenResponseJsonData=await tokenResponse.json();

    expect(tokenResponse.status()).toBe(200)

    const token=tokenResponseJsonData.token;

    console.log("token is: ", token)

    //now let us create a booking, with POST Request
    const bookingData={
        "firstname" : "Revanth Reddy",
        "lastname" : "Anumula",
        "totalprice" : 999,
        "depositpaid" : true,
        "bookingdates" : {
            "checkin" : "2026-10-01",
            "checkout" : "2026-11-01"
        },
        "additionalneeds" : "Breakfast and Dinner"
    }
    const bookingResponse=await request.post("https://restful-booker.herokuapp.com/booking",
        {headers:{"Content-Type": "application/json"}, data:bookingData});
    
    const bookingResponseJsonData=await bookingResponse.json();

    expect(bookingResponse.status()).toBe(200)

    const bookingID=bookingResponseJsonData.bookingid;

    console.log("Booking ID is : ", bookingID)

    //let us now get the booking data that we created with the bookingID through a GET Request
    const GetResponse=await request.get("https://restful-booker.herokuapp.com/booking/"+bookingID)
    
    console.log("Booking Details: ", await GetResponse.json());

    expect(GetResponse.status()).toBe(200)


    //let us now delete the booking that we made against a bookingID
    const deleteResponse=await request.delete("https://restful-booker.herokuapp.com/booking/"+bookingID,
        {headers:{"Content-type":"application/json", "Cookie":"token="+token}});

    //const deleteResponseJsonData=await deleteResponse.json()

    console.log("Delete Status Text(): ",deleteResponse.statusText())
    expect(deleteResponse.status()).toBe(201)

    //let us now try to retrieve the booking data with bookingID that we have deleted
    const getResponseAfterDelete=await request.get("https://restful-booker.herokuapp.com/booking/"+bookingID)
    
    //const getResponseAfterDeleteJsonData=await getResponseAfterDelete.json()

    console.log("Status Code: ", getResponseAfterDelete.status())
    console.log("Status Text: ",getResponseAfterDelete.statusText())

    expect(getResponseAfterDelete.status()).toBe(404)
    const statusText=getResponseAfterDelete.statusText();
    expect(statusText).toContain("Not Found")
})