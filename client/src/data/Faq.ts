import {PHONE_NUMBER} from '@/util/Constants';

type FaqEntry = {
  title: string;
  items: FaqItem[];
};

type FaqItem = {
  question: string;
  answer: string;
};

export function getFaqData(): FaqEntry[] {
  return [
    {
      title: 'General',
      items: [
        {
          question: 'Are children allowed?',
          answer:
            'Yes, children are allowed to dine at Kame. You will need to include them as a member of your group and we do not offer a kids menu at this time.',
        },
        {
          question: 'Is there free parking?',
          answer:
            'Yes. Free reserved parking is available in front of our restaurant.',
        },
        {
          question: 'Is there a dress code?',
          answer: 'We do not have an enforced dress code.',
        },
      ],
    },

    {
      title: 'Reservations',
      items: [
        {
          question: 'Is my credit card charged when I make a reservation?',
          answer:
            'No. The credit card you provide when creating a reservation is only charged if you do not show up without cancelling or you cancel within 72 hours of your reservation time.',
        },
        {
          question:
            'Can I use a different payment method than the one I provided for my reservation?',
          answer:
            'Yes. The payment details provided when creating your reservation are only used for cancellation fees.',
        },
        {
          question: 'Can I cancel my reservation?',
          answer:
            'Yes, you can cancel your reservation by logging in and visiting your reservations page or by calling us at ' +
            PHONE_NUMBER +
            '. Please be mindful of our cancellation policy, as reservations cancelled within 72 hours of the reservation time are subject to a cancellation fee.',
        },
        {
          question: "What happens if I'm late?",
          answer:
            'Our chefs start at the same time. If you are late you will miss the courses that we serve during that time.',
        },
      ],
    },

    {
      title: 'Menu',
      items: [
        {
          question: 'How often does the menu change?',
          answer: 'We change our menu every 2-3 weeks.',
        },
        {
          question: 'What should I do if I have dietary restrictions?',
          answer:
            'Please give us a call at ' +
            PHONE_NUMBER +
            ' so we can make adjustments to the menu ahead of time. In addition, if you are unable to eat an item we are serving you have the option to share it with someone else in your group or skip it entirely.',
        },
      ],
    },
  ];
}
