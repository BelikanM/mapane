import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1") // ton endpoint
  .setProject("67bb24ad002378e79e38"); // ton Project ID

const account = new Account(client);

export { client, account };
