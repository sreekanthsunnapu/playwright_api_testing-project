import {test, expect} from '@playwright/test'
import { error } from 'node:console';

//by default playwright assume the test to be  finished in 30 seconds
//so, even if we keep the code in a wile loop with true always, the test stops after 30 seconds
//to avois this we can use test.setTimeout(), pass 0-zero to it, to say No TimeOut
test("Check API Health", async ({request})=>{
    
    test.setTimeout(0);

    let flag:boolean=true;

    while(flag){
    
    let startTime=Date.now()
    
    const response=await request.get("https://restful-booker.herokuapp.com/ping")

    let endTime=Date.now();

    let duration=endTime-startTime;

    if(duration>400){
        throw new Error(`API response is slow ${duration}`)
    }else{
        console.log(`Total Duration of the response is : ${duration}`)
    }

    const status=response.status();

    console.log(`Response Code from API is : ${status}`,)

    if(status!==201) flag=false;
    //expect(status).toBe(201)
    }
})