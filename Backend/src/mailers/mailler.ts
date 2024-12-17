import { config } from "../config/app.config";
import { resend } from "./resendClient";

type Params = {
  to: string | string[];
  subject: string;
  text: string;
  html: string;
  from?: string;
};

const mailer_sender =
  config.NODE_ENV === "development"
    ? `no-reply <onboarding@resend.dev>`
    : `no-reply <${config.MAILER_SENDER}>`;

export const sendEmail = async ({
  to,
  from = mailer_sender,
  subject,
  text,
  html,
}: Params) => {
  try {
    const response = await resend.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      text,
      subject,
      html,
    });
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};
