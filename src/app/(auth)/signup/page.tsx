import { OAuthSignIn } from "@components/auth/oauth-signin";
import { SignUpForm } from "@components/auth/sigup-form";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";

export default function SignUp() {
  return (
    <main className="container py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to create account
          </p>
        </CardHeader>
        <CardContent>
          <OAuthSignIn />
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <SignUpForm />
        </CardContent>
      </Card>
    </main>
  );
}
