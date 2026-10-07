import {test, expect} from '@playwright/test'

test("GET Request & Validations on multiple data sets", async ({request})=>{

    const response=await request.get("http://localhost:3000/students")
    
    const responseJsonData=await response.json();

    console.log(responseJsonData)

    expect(response.status()).toBe(200);

    //cont use { } inside find()  --> simply write as : find((student:any)=> student.id==="1") 
    // if you want to use then put a return statement like: {return student.id==="1"}
    const studentRecord=responseJsonData.find((student:any)=>student.id==='1')

    console.log(studentRecord)

    expect(studentRecord).toBeDefined();
    expect(studentRecord).toHaveProperty("id","1");
    expect(studentRecord.name).toContain("sreekanth");
    expect(studentRecord.courses).toContain("C++");
    expect(studentRecord).toHaveProperty("location","hyderabad")
})