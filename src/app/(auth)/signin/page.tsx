import Link from "next/link"
import { OAuthSignIn } from "@components/auth/oauth-signin"
import { SignInForm } from "@components/auth/signin-form"

import { route } from "@/lib/config"
import { Button } from "@ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@ui/card"

export default function SignIn() {
  return (
    <main className="container py-8">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>Log in to account</CardTitle>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to log in
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
          <SignInForm />
        </CardContent>
        <CardFooter className="flex items-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?
          </p>
          <Button asChild variant="link">
            <Link href={route.signup}>Sign up</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}
