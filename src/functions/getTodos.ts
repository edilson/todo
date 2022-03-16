import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "src/utils/dynamodbClient";

interface ITodo {
  id: string;
  user_id: string;
  title: string;
  done: boolean;
  deadline: Date;
}

export const handler: APIGatewayProxyHandler = async (event) => {
  const { userId } = event.pathParameters;

  const response = await document.query({
    TableName: 'todos',
    KeyConditionExpression: "user_id = :user_id",
    ExpressionAttributeValues: {
      ":user_id": userId
    }
  }).promise()

  const userTodos = response.Items[0] as ITodo;

  if(userTodos) {
    return {
      statusCode: 200,
      body: response.Items.toString()
    }
  }

  return {
    statusCode: 404,
    body: JSON.stringify({
      message: 'Todos not found for user'
    })
  }
}