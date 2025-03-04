import express from 'express'
import nodemailer, { createTransport } from 'nodemailer'

 
    const transporter  = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: "saching@pearlorganisation.com",
            pass:  "scoc qtvm djdo ygqq"
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