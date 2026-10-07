import{test,expect} from '@playwright/test'

//we can also write function in place of ()=>
test("POST Request Demo Auth data with Token",async function({request}){
    
    const authData1={
        "username":"admin",
        "password":"password123"
    }
    //below are the invalid credentials, let us see how the API responds
    const authData2={
        "username":"admin123",
        "password":"password123"
    }
    const response1=await request.post("https://restful-booker.herokuapp.com/auth",
        {headers:{'Content-type':"application/json"},data:authData1});
    console.log(response1.status())         //response Code:200
    const responseJsonData=await response1.json();
    console.log(responseJsonData)     //{ token: '67ee2578872d9b2' }


    const response2=await request.post("https://restful-booker.herokuapp.com/auth",
        {headers:{"Content-type":"application/json"}, data:authData2});
    console.log(response2.status());        //response code is 200 only, but look at the json() content
    console.log(await response2.json());      //{ reason: 'Bad credentials' }

    //lets verify that the token is not null, everytime the token changes, but it should not be null
    expect(responseJsonData.token).not.toBeNull();
});