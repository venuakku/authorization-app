import AWS from "aws-sdk";
import message from 'aws-sdk/lib/maintenance_mode_message.js';
message.suppress = true;
import dotenv from "dotenv";
dotenv.config()

const SES_CONFIG = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
}

const AWS_SES = new AWS.SES(SES_CONFIG);

export default async function sendEmail(recipientEmail, name, id) {
    let params = {
        Source: "ivenu28@gmail.com",
        Destination: {
            ToAddresses: [recipientEmail],
        },
        ReplyToAddresses: [],
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `
                    <h1>Verify your email address</h1>
                    <p>Hello ${name} ,</p>
                    <p>Thankyou for signing up on our platform.<p/>
                    <p>Please click the link below to verify your email address: ${recipientEmail}</p>
                    <a href='http://localhost:5173/authorization/?id=${id}'>Verify Email</a>
                    <p>This link has no expire time.</p>
                    `
                },
                Text: {
                    Charset: "UTF-8",
                    Data: "AWS-SES Disconnected "
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: `Email Verification`,
            }
        },
    };

    try {
        const res = await AWS_SES.sendEmail(params).promise();
        console.log("Email has been sent!", res);
    } catch (error) {
        console.error(error);
    }
}
