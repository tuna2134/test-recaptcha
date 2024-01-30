"use server";

export async function verify({
  response,
}: {
  response: string;
}): Promise<boolean> {
  const params = new URLSearchParams();
  params.append("response", response);
  params.append("secret", process.env.RECAPTCHA_SECRET_KEY as string);
  const data = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?${params.toString()}`,
    {
      method: "POST",
    },
  );
  const json = await data.json();
  console.log(json);
  return json.success;
}
