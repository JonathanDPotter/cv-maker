const detectMobile = (userAgent: string) =>
  userAgent.match(/crios|fxios|edgios|android|iPhone/i) ? true : false;

export default detectMobile;
