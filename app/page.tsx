"use client";

import type { NextPage } from "next";
import ReCaptcha from "react-google-recaptcha";
import React from "react";
import { verify } from "./actions";
import Image from "next/image";

const Page: NextPage = () => {
  const recaptchaRef = React.useRef<ReCaptcha>(null);
  const [verified, setVerified] = React.useState<boolean>(false);
  React.useEffect(() => {
    let func = async () => {
      const token: string =
        (await recaptchaRef.current?.executeAsync()) as string;
      const result = await verify({
        response: token,
      });
      setVerified(result);
      if (result) {
        const audio = new Audio("/tada.mp3");
        audio?.play();
      }
    };
    func();
  }, [setVerified, recaptchaRef]);

  return (
    <div className="h-screen flex items-center">
      <div className="w-full max-w-4xl px-6 mx-auto h-64 flex ml-auto">
        <div>
          <h1 className="font-bold text-4xl">Test captcha</h1>
          <p className="text-xl">
            You're {verified ? "verified" : "not verfied"}
          </p>
          <ReCaptcha
            sitekey={process.env.NEXT_PUBLIC_SITE_KEY as string}
            size="invisible"
            ref={recaptchaRef}
          />
        </div>
        <Image
          className="ml-auto w-[300px] h-[398px]"
          alt="robot"
          src="/omocha_robot.png"
          width={476}
          height={632}
        />
      </div>
    </div>
  );
};

export default Page;
