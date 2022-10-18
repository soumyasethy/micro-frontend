export const api = {
  sendOTP:
    "http://beta-clien-zzc1gtn0du42-1819219454.ap-south-1.elb.amazonaws.com/sendOTP",
  userContext:
    "http://beta-appor-jymzof76jn3q-1625527618.ap-south-1.elb.amazonaws.com:80/app/borrower/user",
  userContextLocal: "http://localhost:8080/app/borrower/user",
  token:
    "eyJraWQiOiJyU0lXTjVUa1R2XC9pQVZXWXV5YzJUdXNhanFMaUI4a3BpYTBXdGp0eTIwUT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI0MmRlZjlkOC1jYjQ1LTQ4ZGEtODhjMi0yOGQ1OWU4MTE4ZjQiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGgtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aC0xX1NKc01CcnBRViIsInZlcnNpb24iOjIsImNsaWVudF9pZCI6IjVsZXQwa2JjY2ViNGg2c2Y4aHBwZGljNDhjIiwib3JpZ2luX2p0aSI6IjZkYzI0MTEzLWE3ODAtNDNlMC1iZWY3LTRiYjY4NmMxODhhOSIsImV2ZW50X2lkIjoiODFmYmQ0MDEtODlhMC00MTIxLWFjOWItYzNlOTJjZjBhNTA3IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJwaG9uZSBvcGVuaWQgZW1haWwiLCJhdXRoX3RpbWUiOjE2NjYwMTIwMDksImV4cCI6MTY2NjAxNTYwOSwiaWF0IjoxNjY2MDEyMDA5LCJqdGkiOiIzODc2YzU2YS1kMzhmLTQ2MTctOGI4Yy05ODIxYTM1NjU1NDgiLCJ1c2VybmFtZSI6IjQyZGVmOWQ4LWNiNDUtNDhkYS04OGMyLTI4ZDU5ZTgxMThmNCJ9.SeS7D8iwwjRFNSBiAkQuGWrHmUbaXsRXH0kM4-viNeyIMoM3jwOwYZEkSzx5KYH7YguGZlJFc3JTeGLxv-pKdnm0ntq140gljZybNbbGWtTTY64A543m2vCrOSUKuGzVtNbUTCcNxkUs-qR67K4JeleFMYh7pshzsdPT0iPWHKFl69uKuY6XDYBfVt4Mt5lHIlSrStB4BwPCLKE7AjwZa2WX4nlKD2GiIDEEnSc_nk3yK-XOuwnjJF8fMgilMpyptPbJLM-auvmRp3EenxSKBvP9uqUk0qu8s4sIo5aCRNpx-8YIKZbP3wX13ZDZ77L6FFRioCu6YHfGKYV0nIuC7A",
  saveEmail:
    "http://Beta-AppOr-JYMZOF76JN3Q-1625527618.ap-south-1.elb.amazonaws.com:80/app/borrower/accountAttributes/",
  panVerify:
    "http://Beta-AppOr-JYMZOF76JN3Q-1625527618.ap-south-1.elb.amazonaws.com:80/app/borrower/application/kyc/pan/panVerify",
  login:
    "http://beta-appor-jymzof76jn3q-1625527618.ap-south-1.elb.amazonaws.com/api/client/auth/requestOtp/",
  verifyOtp:
    "http://beta-appor-jymzof76jn3q-1625527618.ap-south-1.elb.amazonaws.com/api/client/auth/verifyOtp/",
  pledgeInit:
    "http://beta-appor-jymzof76jn3q-1625527618.ap-south-1.elb.amazonaws.com/app/borrower/application/pledge/init",
};

export const StoreKey = {
  accessToken: "access_token",
  refreshToken: "refresh_token",
  userContext: "user_context",
};
