import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "src/utils/dynamodbClient";

interface ICreateTodo {
  title: string;
  deadline: Date;
}

export const handler: APIGatewayProxyHandler = async (event) => {
  const { title, deadline } = JSON.parse(event.body) as ICreateTodo;
  const { userId } = event.pathParameters;

  await document.put({
    TableName: 'todos',
    Item: {
      title,
      deadline: new Date(deadline),
      done: false,
      user_id: userId
    }
  }).promise()

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Todo created!'
    })
  }
}