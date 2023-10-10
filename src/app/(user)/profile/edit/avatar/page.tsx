"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icons } from "@components/icons";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { SUPABASE } from "@/lib/supabase";
import { Avatar, AvatarImage } from "@ui/avatar";
import { Button } from "@ui/button";
import { Heading } from "@ui/heading";
import { Input } from "@ui/input";
import { trpc } from "@/app/_trpc/client";

export default function EditAvatar() {
  const [isLoading, setIsLoading] = useState(false);
  const { back } = useRouter();

  const { data: session, update } = useSession();
  const { mutateAsync: updateUser } = trpc.user.update.useMutation();

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);

    const file = e.target.files?.[0];
    const userId = session?.user.id;
    if (file && userId) {
      try {
        const path = await SUPABASE.uploadFile(file, userId);
        if (path) {
          const prevImage = session.user.image;
          if (prevImage) {
            const deletePrev = await SUPABASE.deleteFiles([prevImage]);
          }
          const newSession = await update({ image: path });
          await updateUser({ data: { image: path }, id: userId });
          toast.success("Image updated");
        }
      } catch (e) {
        console.log(e);
        toast.error("Failed to update image");
        setIsLoading(false);
      }
    }

    setIsLoading(false);
  };
  return (
    <main className="container max-w-lg py-8">
      <Heading>Edit Profile Avatar</Heading>
      <div className="my-8 flex items-center gap-4">
        {session?.user.image && (
          <Avatar className="h-24 w-24">
            {isLoading ? (
              <Icons.spinner className="mr-2 h-24 w-24 animate-spin" />
            ) : (
              <AvatarImage src={session?.user.image} alt={session?.user.id} />
            )}
          </Avatar>
        )}
        <Input
          type="file"
          name="avatar"
          accept="image/*"
          className="w-64"
          onChange={handleInputChange}
          disabled={isLoading}
        />
      </div>
      {/* error with cache of profile pic */}
      <Button disabled={isLoading} onClick={back}>
        Go Back
      </Button>
    </main>
  );
}
