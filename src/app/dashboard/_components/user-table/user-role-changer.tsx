"use client";

import { useState } from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@ui/button";
import { Command, CommandGroup, CommandItem } from "@ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { trpc } from "@/app/_trpc/client";
import { UserRole } from "@/db/schema/user";

const roles: Record<UserRole, string> = {
  admin: "Admin",
  user: "User",
};

type Props = {
  userId: string;
  role: UserRole;
};

export function UserRoleChanger({ userId, role: defaultRole }: Props) {
  const [role, setRole] = useState(defaultRole);
  const [open, setOpen] = useState(false);
  const { mutateAsync: updateUser, isError } = trpc.user.update.useMutation();

  const handleChangeRole = async (selectedRole: UserRole) => {
    if (selectedRole === role) return;

    const data = { role: selectedRole };
    await updateUser({ data, id: userId });
    if (!isError) {
      setRole(selectedRole);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open}>
          {roles[role]}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-32 p-0">
        <Command>
          <CommandGroup>
            {Object.keys(roles).map((roleKey) => (
              <CommandItem
                key={roleKey}
                onSelect={() => handleChangeRole(roleKey as UserRole)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    role === roleKey ? "opacity-100" : "opacity-0"
                  )}
                />
                {roles[roleKey as UserRole]}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
