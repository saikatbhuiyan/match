import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { GiMatchTip } from "react-icons/gi";

export default async function TopNav() {
  const memberLinks = [
    { href: "/members", label: "Matches" },
    { href: "/lists", label: "Lists" },
    { href: "/messages", label: "Messages" },
  ];

  const adminLinks = [{ href: "/admin/moderation", label: "Photo Moderation" }];

  return (
    <>
      <Navbar
        maxWidth="xl"
        className="bg-gradient-to-r from-purple-400 to-purple-700"
        classNames={{
          item: [
            "text-xl",
            "text-white",
            "uppercase",
            "data-[active=true]:text-yellow-200",
          ],
        }}
      >
        <NavbarBrand as={Link} href="/">
          <GiMatchTip size={40} className="text-gray-200" />
          <div className="font-bold text-3xl flex">
            <span className="text-gray-900">My</span>
            <span className="text-gray-200">Match</span>
          </div>
        </NavbarBrand>
        <NavbarContent justify="center">
          {memberLinks &&
            memberLinks.map((item) => (
              <NavbarItem as={Link} key={item.href} href={item.href}>
                {" "}
                {item.label}
              </NavbarItem>
            ))}
        </NavbarContent>
        <NavbarContent justify="end">
          <>
            <Button
              as={Link}
              href="/login"
              variant="bordered"
              className="text-white"
            >
              Login
            </Button>
            <Button
              as={Link}
              href="/register"
              variant="bordered"
              className="text-white"
            >
              Register
            </Button>
          </>
        </NavbarContent>
      </Navbar>
    </>
  );
}
