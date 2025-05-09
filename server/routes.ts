import type {Express, Request, Response} from "express";
import {createServer, type Server} from "http";
import {insertContactMessageSchema} from "@shared/schema";
import {z} from "zod";
import nodemailer from "nodemailer";

// Nodemailer transporter for sending emails
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.example.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
        user: process.env.SMTP_USER || "user@example.com",
        pass: process.env.SMTP_PASS || "password",
    },
});

export async function registerRoutes(app: Express): Promise<Server> {
    // API endpoint for contact form submissions
    app.post("/api/contact", async (req: Request, res: Response) => {
        try {
            // Validate request body
            const validatedData = insertContactMessageSchema.parse(req.body);

            try {
                await transporter.sendMail({
                    from: `"Portfolio Contact" <${process.env.SMTP_USER || "noreply@example.com"}>`,
                    to: process.env.CONTACT_EMAIL || "sahil.hossain@example.com",
                    subject: `New Contact Form Submission: ${validatedData.subject}`,
                    text: `Name: ${validatedData.name}\nEmail: ${validatedData.email}\nSubject: ${validatedData.subject}\nMessage: ${validatedData.message}`,
                    html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Subject:</strong> ${validatedData.subject}</p>
            <p><strong>Message:</strong> ${validatedData.message}</p>
          `,
                });
            } catch (emailError) {
                console.error('Failed to send email notification:', emailError);
                // Continue with response even if email fails
            }

            res.status(201).json({success: true, message: "Contact message received"});
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    message: "Invalid form data",
                    errors: error.errors
                });
            }
            console.error('Error processing contact form:', error);
            res.status(500).json({message: "Failed to process contact form"});
        }
    });

    return createServer(app);
}
