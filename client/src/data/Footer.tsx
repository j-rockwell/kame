import {AiFillFacebook, AiFillInstagram} from "react-icons/ai";
import {IconType} from "react-icons";
import {ReactElement} from "react";
import {ColorMode, Link, Text} from "@chakra-ui/react";
import {
  ADDRESS,
  ADDRESS_GOOGLE,
  FACEBOOK,
  FAQ_URL,
  INSTAGRAM,
  LEGAL_URL,
  PHONE_NUMBER,
  PHONE_NUMBER_RAW
} from "@/util/Constants";

type FooterEntry = {
  title: string;
  subtitle?: ReactElement[];
  items: FooterItem[];
}

type FooterItem = {
  name: string;
  href: string;
}

type FooterSocial = {
  icon?: IconType;
  alt: string;
  href: string;
}

/**
 * Returns an array of socials to render under the logo within the footer
 */
export function getFooterSocials(): FooterSocial[] {
  return [
    {
      icon: AiFillInstagram,
      alt: 'instagram',
      href: INSTAGRAM,
    },
    {
      icon: AiFillFacebook,
      alt: 'facebook',
      href: FACEBOOK,
    }
  ]
}

/**
 * Returns compiled footer-data used to render footer links
 * @param colorMode Current Chakra Colormode
 */
export function getFooterData(colorMode: ColorMode): FooterEntry[] {
  const phoneElem = (
    <Text color={`text.${colorMode}`}>
      <b>Phone</b>: <Link href={`tel:${PHONE_NUMBER_RAW}`}>{PHONE_NUMBER}</Link>
    </Text>
  );

  const addrElem = (
    <Text color={`text.${colorMode}`}>
      <b>Address</b>: <Link href={ADDRESS_GOOGLE}>{ADDRESS}</Link>
    </Text>
  )

  return [
    {
      title: 'About',
      subtitle: [phoneElem, addrElem],
      items: [
        {
          name: 'FAQ',
          href: FAQ_URL,
        },
        {
          name: 'Menu',
          href: '#',
        },
        {
          name: 'People',
          href: 'http://www.sushikame.com/#people',
        },
      ]
    },
    {
      title: 'Legal',
      items: [
        {
          name: 'Reservation Policy',
          href: LEGAL_URL + '#reservations',
        },
        {
          name: 'Privacy Policy',
          href: LEGAL_URL + '#privacy',
        },
        {
          name: 'Terms of Service',
          href: LEGAL_URL + '#tos',
        },
      ]
    },
    {
      title: 'More',
      items: [
        {
          name: 'Forgot Password',
          href: '#',
        },
        {
          name: 'Catering',
          href: '#',
        },
        {
          name: 'Special Occasions',
          href: '#',
        },
      ]
    },
  ]
}