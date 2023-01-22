import {FooterColumnContent} from "@/components/footer/Footer";

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