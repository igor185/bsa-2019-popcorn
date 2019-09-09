import * as emailRepository from "../repository/email.repository";
import * as emailView from "../public/email/email.view";

const resetUrl = token => `${process.env.FRONTEND_HOST}/reset/${token}`;
const confirmUrl = token => `${process.env.FRONTEND_HOST}/confirm/${token}`;

export const sendToken = (email, token) => {
  const msg = {
    to: email,
    from: process.env.USER_MAIL,
    subject: "Reset password",
    html: `<p>You requested for a password reset, kindly use this <a href="${resetUrl(
      token
    )}">link</a> to reset your password</p>`
  };
  return emailRepository.send(msg);
};

export const sendConfirmEmailChange = (email, token) => {
  const msg = {
    to: email,
    from: process.env.USER_MAIL,
    subject: "Confirm email change",
    html: `<p align='center'>You requested for a password change, please click the button to confirm it.</p>
    <div align="center" class="button-container" style="padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
<div style="text-decoration:none;color:#ffffff;background-color:#ff6501;border-radius:4px;border:1px solid #ff6501;padding-top:5px;
padding-bottom:5px;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;text-align:center;word-break:keep-all;">
<span style="padding-left:20px;padding-right:20px;font-size:16px;">
<span style="font-size: 16px; line-height: 32px;"><a style="color:white; text-decoration:none;" href="${confirmUrl(
      token
    )}">Confirm</a></span>
</span></div>`
  };
  return emailRepository.send(msg);
};

export const sendConfirmPasswordChange = (email, token) => {
  const msg = {
    to: email,
    from: process.env.USER_MAIL,
    subject: "Confirm password change",
    html: `<p align='center'>You requested for a password change, please click the button to confirm it.</p>
    <div align="center" class="button-container" style="padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
<div style="text-decoration:none;color:#ffffff;background-color:#ff6501;border-radius:4px;border:1px solid #ff6501;padding-top:5px;
padding-bottom:5px;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;text-align:center;word-break:keep-all;">
<span style="padding-left:20px;padding-right:20px;font-size:16px;">
<span style="font-size: 16px; line-height: 32px;"><a style="color:white; text-decoration:none;" href="${confirmUrl(
      token
    )}">Confirm</a></span>
</span></div>`
  };
  return emailRepository.send(msg);
};

export const sendWelcomeEmail = email => {
  const msg = {
    to: email,
    from: process.env.USER_MAIL,
    subject: "Congratulation with registration",
    html: emailView.welcome()
  };
  return emailRepository.send(msg);
};
