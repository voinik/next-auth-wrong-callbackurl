> The example repository is maintained from a [monorepo](https://github.com/nextauthjs/next-auth/tree/main/apps/example-nextjs). Pull Requests should be opened against [`nextauthjs/next-auth`](https://github.com/nextauthjs/next-auth).

# How to reproduce the bug

1. Add an .env file with `NEXTAUTH_SECRET=heheheh`
2. Run `npm install`
3. Start the project
4. Go to `http://localhost:3000/`
5. I've setup the `middleware` to require the user to be authenticated when going to the `/client` route, so click on the `Client` anchor tag
6. You'll end up on the custom login page I created. Click on `Do it!` to attempt to log in.
7. First of all, notice the url bar. It should say `http://localhost:3000/login?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Flogin%3FcallbackUrl%3D%252Fclient&error=EmailSignin`. Notice how the callbackUrl refers to the url of the custom login page that itself has a callbackUrl.
8. Now check your terminal. I've logged the url that gets sent to the `sendVerificationRequest` function, which is the url that gets sent in the login email. It should look like this: `url: http://localhost:3000/api/auth/callback/email?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Flogin%3FcallbackUrl%3D%252Fclient&token=......`.

Notice how the callbackUrl that ends up in the email is the base url with a callback url that contains the url of the login page that itself again has a callbackUrl.

This means that when a user gets redirected to the login page (because they're attempting to access a page that requires them to be logged in), they get redirected to... the login page itself, rather than where they came from. The user will arrive on the login page and there will be a callbackUrl in the url bar to the page they actually want to go to.
