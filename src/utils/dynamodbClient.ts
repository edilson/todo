import { DynamoDB } from "aws-sdk"


const options = {
  region: "localhost",
  //dynamodb-local
  endpoint: "http://localhost:8000",
  accessKeyId: "x",
  secretAccessKey: "x"
}

const isOffline = ()=>{
  //variavel do plugin serverless offline, ele atribui valor
  return process.env.IS_OFFLINE; 
}

export const document = isOffline()
? new DynamoDB.DocumentClient(options)
: new DynamoDB.DocumentClient();

//usa local se offline ou da aws se online