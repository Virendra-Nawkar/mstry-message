"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useDebounceValue } from 'usehooks-ts'
import { toast } from "sonner"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


const page = () => {
  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('')
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debouncedUsername = useDebounceValue(username, 300);
  const router = useRouter();
  return (
    <div>
      <Button
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        Show Toast
      </Button>

    </div>
  )
}

export default page
