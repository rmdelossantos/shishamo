"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

export default function NotFound() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [displayedCTA, setDisplayedCTA] = useState<string>("");

  const typingIndexRef = useRef<number>(0);
  const messageRef = useRef<string>("");

  const randomTypingSpeed = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  const messages = [
    "This page didn't meet its development goal.",
    "Looks like this data point went missing.",
    "We couldn't locate that indicator.",
    "This route isn’t on the world development map.",
    "No metrics found here.",
    "That endpoint may have been restructured.",
    "This resource has been decommissioned.",
    "You've reached an unclassified economy.",
    "No data available for this path.",
    "The data for this region has gone offline.",
    "Page not found—like a misreported GDP.",
    "This location isn’t in our global index.",
    "Query failed to return sustainable results.",
    "The project ID you're looking for doesn't exist.",
  ];

  const ctasToHome = [
    "Return to global dashboard",
    "Back to development data",
    "Take me to the main dataset",
    "Reboot your search",
    "Go back to the homepage",
    "Try another indicator",
    "Let’s get back to the data",
    "Navigate to safety",
    "Find your way back",
    "Exit this fiscal void",
    "Re-enter the global economy",
    "Start a new query",
    "Access the world overview",
    "Back to project listings",
    "Return to safe coordinates",
  ];

  useEffect(() => {
    setShow(true);
    setMessage(messages[Math.floor(Math.random() * messages.length)]);
  }, []);

  useEffect(() => {
    setShow(true);
    setMessage(messages[Math.floor(Math.random() * messages.length)]);
    const randomizer = Math.floor(Math.random() * ctasToHome.length);
    const chosenCTA = ctasToHome[randomizer];
    messageRef.current = chosenCTA;
    typingIndexRef.current = 0;
  }, []);

  useEffect(() => {
    if (!displayedCTA) {
      const typeMessage = () => {
        if (typingIndexRef.current < messageRef.current.length) {
          setDisplayedCTA((current) => {
            const updatedMessage =
              current +
              messageRef.current[
                typingIndexRef.current !== 0
                  ? typingIndexRef.current - 1
                  : typingIndexRef.current
              ];
            return updatedMessage;
          });
          typingIndexRef.current += 1;
          setTimeout(typeMessage, randomTypingSpeed());
        }
      };
      typeMessage();
    }
  }, [messageRef.current]);

  return (
    <div
      className={`h-screen flex flex-col items-center justify-center px-4 transform text-center space-y-4 transition-all duration-500 ease-out ${
        show ? "opacity-100 -translate-y-20" : "opacity-0 translate-y-0"
      }`}
    >
      <h1 className="text-5xl font-bold">error 404</h1>
      {message && <p className="text-lg text-gray-600">{message}</p>}
      {displayedCTA && (
        <Link
          href="/"
          className="text-lg text-gray-600 hover:underline hover:text-gray-600"
        >
          {displayedCTA} <span className="text-gray-600">→</span>
        </Link>
      )}
    </div>
  );
}
