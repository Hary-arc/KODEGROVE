type SendEmailParams = {
    to: string;
    subject: string;
    html?: string;
    text?: string;
};
export declare function SendEmail({ to, subject, html, text }: SendEmailParams): Promise<any>;
declare const _default: {
    SendEmail: typeof SendEmail;
};
export default _default;
