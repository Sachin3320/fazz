import express from 'express'
import nodemailer, { createTransport } from 'nodemailer'

 
    const transporter  = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: "saching@pearlorganisation.com",
            pass:  "pbwf wnin zyzr qiox"
        }
    })

    export const sendEmail = async ({ email, otp }) => {
        const info =  await transporter.sendMail({
            from: '"fazz" <faz@gmail.com>', 
            to:email, 
            subject: "Email Verification",
            message:`{ Your otp for Email Verification is ${otp} }`,
            html: "<b>Hello world?</b>", 
          });
          console.log("Message sent:", info);

}   