import { WeddingInvitation } from "@/components/WeddingInvitation";
import { Bodoni_Moda, Italiana, Pinyon_Script } from "next/font/google";

const italiana = Italiana({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-italiana",
});

const pinyonScript = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pinyon-script",
});

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-bodoni-moda",
});

export default function Home() {
  return (
    <div className={`${italiana.variable} ${pinyonScript.variable} ${bodoniModa.variable} wedding-typography`}>
      <WeddingInvitation />
    </div>
  );
}
