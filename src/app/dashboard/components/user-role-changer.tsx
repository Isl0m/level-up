"use client"

import { useState } from "react"
import axios from "axios"
import { Check } from "lucide-react"

import { route } from "@/lib/config"
import { cn } from "@/lib/utils"
import { UpdateUser } from "@/lib/validators/user"
import { Button } from "@ui/button"
import { Command, CommandGroup, CommandItem } from "@ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover"
import { UserRole } from "@/db/schema"

const roles: Record<UserRole, string> = {
  admin: "Admin",
  user: "User",
}

export function UserRoleChanger({ role: defaultRole }: { role: UserRole }) {
  const [role, setRole] = useState(defaultRole)
  const [open, setOpen] = useState(false)

  const handleChangeRole = async (selectedRole: UserRole) => {
    if (selectedRole === role) return

    const body: UpdateUser = { role: selectedRole }
    const response = await axios.post(route.api.update, JSON.stringify(body))
    if (response.status === 200) {
      setRole(selectedRole)
      setOpen(false)
    } else {
      setOpen(false)
    }
  }

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
  )
}
