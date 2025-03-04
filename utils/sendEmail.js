import express from 'express'
import nodemailer, { createTransport } from 'nodemailer'

 
    const transporter  = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    export const sendEmail = async ({ email, otp }) => {
        const info =  await transporter.sendMail({
            from: '"fazz" <faz@gmail.com>', 
            to:email, 
            subject: "Email Verification",
            text:` Your otp for Email Verification is ${otp} `,
            
          });
          console.log("Message sent:", info);

}   
