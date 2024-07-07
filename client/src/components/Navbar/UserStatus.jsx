"use client"

import { useUserStore } from "@/store/store";
import { useState } from "react";
import ButtonFilled from "@/ui/ButtonFilled";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Logout from "@/libs/Logout";
import Link from "next/link";

function UserStatus() {
  const user = useUserStore((state) => state.user);
  const [drop, setDrop] = useState(false);
  const logout = useUserStore((state)=>state.logout);
  async function logoutHandler() {
    await Logout();
    logout();
    setDrop(false);
  }
  return (
    <>
      {user ? (
        <div
          onClick={() => setDrop((prev) => !prev)}
          className="relative h-10 w-10 rounded-full overflow-hidden"
        >
          {user?.avatar ? (
            <Image
              src={user.avatar}
              fill={true}
              sizes="100%"
              className="object-cover cursor-pointer"
              alt="cover image"
            />
          ) : (
            <div>
              <p>{user.name.charAt(0)}</p>
            </div>
          )}
        </div>
      ) : (
        <Link href="/login">
          <ButtonFilled>Login/Signup</ButtonFilled>
        </Link>
      )}
      <AnimatePresence>
        {drop && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="h-[60vh] w-[70vw] md:h-[50vh] md:w-[20vw] bg-white absolute top-16 right-10 md:right-32 z-10 center flex-col gap-4"
          >
            <div className="relative h-28 w-28 rounded-full overflow-hidden">
              {user?.avatar ? (
                <Image
                  src={user.avatar}
                  fill={true}
                  alt="cover image"
                  className="object-cover cursor-pointer"
                />
              ) : (
                <div>
                  <p>{user?.name.charAt(0)}</p>
                </div>
              )}
            </div>
            <ButtonFilled className="w-3/4" >My account</ButtonFilled>
            <ButtonFilled className="w-3/4" onClick ={logoutHandler}>Logout</ButtonFilled>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default UserStatus;
