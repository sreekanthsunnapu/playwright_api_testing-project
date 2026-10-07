import {test, expect} from '@playwright/test'
import fs from 'fs'

const jsonPath="test-data/TravellerInfo.json"
const fileContent=fs.readFileSync(jsonPath,'utf-8')
const bookingData=JSON.parse(fileContent)
// for(let i=0;i<bookingData.length;i++){
for(let booking of bookingData){
test(`Creating a New Booking for ${booking.firstname} with External JSON File`, async({request})=>{

    const bookingResponse=await request.post("https://restful-booker.herokuapp.com/booking",
        {headers:{"Content-type":"application/json"},
        data:booking})
    const bookingResponseJsonData=await bookingResponse.json();
    expect(bookingResponse.status()).toBe(200);
    console.log(bookingResponse.statusText())
    console.log(bookingResponseJsonData)
})
}

/**
 //This code is for creating a booking with POST Request for One set of booking Data in JSON FILE  
 test(`Creating a New Booking for ${booking.firstname} with External JSON File`, async({request})=>{

    const bookingResponse=await request.post("https://restful-booker.herokuapp.com/booking",
        {headers:{"Content-type":"application/json"},
        data:booking})
    const bookingResponseJsonData=await bookingResponse.json();
    expect(bookingResponse.status()).toBe(200);
    console.log(bookingResponse.statusText())
    console.log(bookingResponseJsonData)
})
 */