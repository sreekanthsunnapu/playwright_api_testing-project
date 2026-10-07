import {test, expect} from '@playwright/test'
import { convertProcessSignalToExitCode } from 'node:util';


/**
 * Pre-Requesite:
 * keep Students.json API up & running
 */
test("GET Request Call Demo ", async({request})=>{
    const response= await request.get("http://localhost:3000/students/1")
    
    // console.log(response);
    
    //gets the response as json() body
    const responseJsonData=await response.json();
    console.log("Json Data :",responseJsonData)

    // Returns the buffer with response body.
    console.log(await response.body())

    //Headers from response 
    const responseHeaders=response.headers()
    console.log("Response Headers: ",responseHeaders)

    //Headers as an Array - so that to traverse through
    const arrayOfHeaders=response.headersArray();
    console.log("Array of Headers: ", arrayOfHeaders)

    //Response Status
    const responseStatus=response.status();
    console.log("Response Status: ",responseStatus); 

    const statusText=response.statusText();
    console.log("Status Text: ", statusText)

    //validations on status
    expect(responseStatus).toBe(200);
    expect(statusText).toBe('OK')

    //Contains a boolean stating whether the response was successful (status in the range 200-299) or not
    expect(response.ok()).toBeTruthy();

    //validations on response data properties - wrt to single record (see TC_002_GET_MultipleDataSet_Validations)
    expect(responseJsonData).toHaveProperty('name','sreekanth')
    expect(responseJsonData).toHaveProperty('id',"1")

    //validate to have expected data
    expect(responseJsonData.courses).toContain("C++")

})