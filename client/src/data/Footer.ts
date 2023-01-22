import {FooterColumnContent} from "@/components/footer/Footer";

/**
 * Returns static footer content used for footer links
 */
export function getStaticFooterContent(): FooterColumnContent[] {
  return [
    {
      title: 'Parent A',
      items: [
        {
          name: 'Child A',
          href: '#'
        },
        {
          name: 'Child B',
          href: '#'
        },
        {
          name: 'Child C',
          href: '#'
        }
      ]
    },
    {
      title: 'Parent B',
      items: [
        {
          name: 'Child A',
          href: '#'
        },
        {
          name: 'Child B',
          href: '#'
        },
        {
          name: 'Child C',
          href: '#'
        }
      ]
    },
    {
      title: 'Parent C',
      items: [
        {
          name: 'Child A',
          href: '#'
        },
        {
          name: 'Child B',
          href: '#'
        },
        {
          name: 'Child C',
          href: '#'
        }
      ]
    },
  ]
}