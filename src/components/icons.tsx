import type { SVGProps, ImgHTMLAttributes } from "react";
import figmaLogoUrl from "@/assets/figma-logo.svg";
import cursorLogoUrl from "@/assets/cursor-logo.svg";
import airbnbLogoUrl from "@/assets/airbnb-logo.svg";
import airbnbLogo2Url from "@/assets/airbnb-logo-2.svg";
import claudeLogoUrl from "@/assets/claude-logo.svg";
import chatgptLogoUrl from "@/assets/chatgpt-logo.svg";
import fandomLogoUrl from "@/assets/fandom-logo.svg";
import ikeaLogoUrl from "@/assets/ikea-logo.svg";
import ubdLogoUrl from "@/assets/ubd-logo 1.svg";
import antigravityLogoUrl from "@/assets/antigravity-color 1.svg";
import lovableLogoUrl from "@/assets/Lovable_Symbol_0 1.svg";
import figmaDarkLogoUrl from "@/assets/Figma-Dark logo.svg";
import cursorAIIconUrl from "@/assets/cursor-ai-code-icon 1.svg";
import linkedinIconUrl from "@/assets/linkedin-01.svg";
import instagramIconUrl from "@/assets/instagram.svg";
import dribbbleIconUrl from "@/assets/dribbble.svg";
import locationIconUrl from "@/assets/location-01.svg";
import cvIconUrl from "@/assets/CV.svg";
import handIconUrl from "@/assets/hand-pointing-right-03.svg";

type ImgIconProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> & {
  width?: number | string;
  height?: number | string;
};

/* ===== Social / UI icons (now using real SVG assets from /assets) ===== */

export const LinkedInIcon = ({ width = 24, height = 24, ...rest }: ImgIconProps) => (
  <img src={linkedinIconUrl} alt="LinkedIn" width={width} height={height} {...rest} />
);

export const InstagramIcon = ({ width = 24, height = 24, ...rest }: ImgIconProps) => (
  <img src={instagramIconUrl} alt="Instagram" width={width} height={height} {...rest} />
);

export const DribbbleIcon = ({ width = 24, height = 24, ...rest }: ImgIconProps) => (
  <img src={dribbbleIconUrl} alt="Dribbble" width={width} height={height} {...rest} />
);

export const LocationIcon = ({ width = 16, height = 16, ...rest }: ImgIconProps) => (
  <img src={locationIconUrl} alt="" width={width} height={height} {...rest} />
);

export const CVIcon = ({ width = 24, height = 24, ...rest }: ImgIconProps) => (
  <img src={cvIconUrl} alt="" width={width} height={height} {...rest} />
);

export const HandIcon = ({ width = 24, height = 24, ...rest }: ImgIconProps) => (
  <img src={handIconUrl} alt="" width={width} height={height} {...rest} />
);

/* ===== Sound toggle (kept inline — no asset needed) ===== */

export const SoundOff = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M11 5L6 9H2v6h4l5 4V5z" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);

export const SoundOn = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M11 5L6 9H2v6h4l5 4V5z" />
    <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
  </svg>
);

/* ===== Tool / Brand mini logos ===== */

export const FigmaLogo = ({ width = 16, height = 16, ...rest }: ImgIconProps) => (
  <img src={figmaLogoUrl} alt="Figma" width={width} height={height} {...rest} />
);

export const LovableLogo = ({ width = 16, height = 16, ...rest }: ImgIconProps) => (
  <img src={lovableLogoUrl} alt="Lovable" width={width} height={height} {...rest} />
);

export const CursorLogo = ({ width = 16, height = 16, ...rest }: ImgIconProps) => (
  <img src={cursorLogoUrl} alt="Cursor" width={width} height={height} {...rest} />
);

export const ClaudeLogo = ({ width = 16, height = 16, ...rest }: ImgIconProps) => (
  <img src={claudeLogoUrl} alt="Claude" width={width} height={height} {...rest} />
);

export const AntigravityLogo = ({ width = 16, height = 16, ...rest }: ImgIconProps) => (
  <img src={antigravityLogoUrl} alt="Antigravity" width={width} height={height} {...rest} />
);

export const FigmaDarkLogo = ({ width = 80, height = 80, ...rest }: ImgIconProps) => (
  <img src={figmaDarkLogoUrl} alt="Figma" width={width} height={height} {...rest} />
);

export const CursorAIIcon = ({ width = 80, height = 80, ...rest }: ImgIconProps) => (
  <img src={cursorAIIconUrl} alt="Cursor" width={width} height={height} {...rest} />
);

/* ===== Project brand marks ===== */

export const AirbnbMark = ({ width = 32, height = 32, ...rest }: ImgIconProps) => (
  <img src={airbnbLogoUrl} alt="Airbnb" width={width} height={height} {...rest} />
);

export const AirbnbModalMark = ({ width = 64, height = 64, ...rest }: ImgIconProps) => (
  <img src={airbnbLogo2Url} alt="Airbnb" width={width} height={height} {...rest} />
);

export const FandomMark = ({ width = 32, height = 32, ...rest }: ImgIconProps) => (
  <img src={fandomLogoUrl} alt="Fandom" width={width} height={height} {...rest} />
);

export const UbdMark = ({ width = 32, height = 32, ...rest }: ImgIconProps) => (
  <img src={ubdLogoUrl} alt="University of Bunda Mulia" width={width} height={height} {...rest} />
);

export const ChatGPTMark = ({ width = 32, height = 32, ...rest }: ImgIconProps) => (
  <img src={chatgptLogoUrl} alt="ChatGPT" width={width} height={height} {...rest} />
);

export const IkeaMark = ({ width = 32, height = 32, ...rest }: ImgIconProps) => (
  <img src={ikeaLogoUrl} alt="IKEA" width={width} height={height} {...rest} />
);
