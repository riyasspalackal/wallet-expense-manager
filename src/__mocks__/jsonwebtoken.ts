const jwt = jest.genMockFromModule("jsonwebtoken") as any;

jwt.sign = jest.fn().mockReturnValue("test_jwt_token");

jwt.verify = jest.fn(
  (
    token: string,
    secretOrPublicKey: string,
    optionsOrCallback: any,
    callback?: any
  ) => {
    const cb =
      typeof optionsOrCallback === "function" ? optionsOrCallback : callback;
    cb(null, { userId: 1, role: "user" });
  }
);

export = jwt;
