export const getResetPasswordMsg = (email, resetToken) => {
  return {
    to: `${email}`,
    from: 'evgeniygal@gmail.com',
    subject: 'Foodies - reset password',
    text: `Follow the link below to reset your password: ${process.env.RESET_PASS_FRONT_URL}/${resetToken}`,
    html: `<h1>Reset password</h1><p>Follow the link below to reset your password:</p><a href="${process.env.RESET_PASS_FRONT_URL}/${resetToken}">Reset password</a>`,
  };
};
