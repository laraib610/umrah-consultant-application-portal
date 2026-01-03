import emailjs from '@emailjs/browser';
import { ApplicationData } from '../types';

// Service Credentials
const SERVICE_ID = 'service_l73spqc';
const TEMPLATE_ID = 'template_660cxoe';
const PUBLIC_KEY = 'Q-7ODva1zUj2CDFhn';
const ADMIN_EMAIL = 'laraibmushtaq43@gmail.com';

export const initEmailService = () => {
    emailjs.init(PUBLIC_KEY);
};

interface EmailTemplateParams {
    to_name: string;
    to_email: string; // The user's email
    message: string;
    subject: string;
    action_link?: string;
    admin_email: string; // For the admin copy
    [key: string]: unknown;
}

const sendEmail = async (params: EmailTemplateParams) => {
    try {
        console.log('Sending email with params:', params); // Debug log
        // Add variations to catch whatever the user set in their template "To Email" field
        const enhancedParams = {
            ...params,
            email: params.to_email,
            user_email: params.to_email,
            recipient_email: params.to_email,
            reply_to: params.to_email
        };
        const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, enhancedParams as unknown as Record<string, unknown>);
        console.log('Email sent successfully:', response.status, response.text);
        return true;
    } catch (error) {
        console.error('Failed to send email:', error);
        return false;
    }
};

export const sendWelcomeEmail = async (data: ApplicationData, password: string) => {
    const message = `
        Welcome to Umrah Consultant Application!
        
        Your application has been started successfully.
        Here are your login credentials to resume your application at any time:
        
        Login Link: ${window.location.origin}/login
        Email: ${data.email}
        Password: ${password}
        
        Please proceed to upload your introduction video.
    `;
    console.log(data);

    return sendEmail({
        to_name: data.name,
        to_email: data.email,
        subject: 'Welcome & Application Credentials',
        message: message,
        admin_email: ADMIN_EMAIL,
        action_link: `${window.location.origin}/login`
    });
};

export const sendVideoUploadedEmail = async (data: ApplicationData, videoLink: string) => {
    const message = `
        Video Uploaded by ${data.name}.
        
        Video Link: ${videoLink}
        
        This user is now PENDING APPROVAL.
        Please review and activate the user in the CRM.
    `;

    return sendEmail({
        to_name: 'Admin',
        to_email: ADMIN_EMAIL,
        subject: `ACTION REQUIRED: Video Uploaded by ${data.name}`,
        message: message,
        admin_email: ADMIN_EMAIL
    });
};

export const sendActivationEmail = async (data: ApplicationData) => {
    const message = `
        Congratulations ${data.name}!
        
        Your profile has been approved. You are now an ACTIVE Umrah Consultant.
        
        Please login to sign your contract and access your dashboard.
        
        Login Link: ${window.location.origin}/login
    `;

    return sendEmail({
        to_name: data.name,
        to_email: data.email,
        subject: 'Profile Approved! Proceed to Contract',
        message: message,
        admin_email: ADMIN_EMAIL,
        action_link: `${window.location.origin}/login`
    });
};

export const sendCompletionEmail = async (data: ApplicationData) => {
    const message = `
        Application Completed by ${data.name}.
        
        The signed contract has been uploaded.
        Please review the full application in the dashboard.
    `;

    // Notify Admin
    await sendEmail({
        to_name: 'Admin',
        to_email: ADMIN_EMAIL,
        subject: `Application Completed: ${data.name}`,
        message: message,
        admin_email: ADMIN_EMAIL
    });

    // Notify User
    return sendEmail({
        to_name: data.name,
        to_email: data.email,
        subject: 'Application Received',
        message: 'Thank you for completing your application. We will review it and get back to you shortly.',
        admin_email: ADMIN_EMAIL
    });
};
