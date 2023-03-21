type NavigationItem = {
  name: string;
  href: string;
}

export function getNavigatorData(auth?: boolean): NavigationItem[] {
  let result: NavigationItem[] = [];

  // push auth protected endpoints here
  if (auth) {
    result.push({
      name: 'My Account',
      href: '#'
    });
  } // TODO: Do we want to maybe have a separate login page and apply it in an else statement here?

  // push the rest here
  const items: NavigationItem[] = [
    {
      name: 'Menu',
      href: 'http://www.sushikame.com/#ourmenu',
    },
    {
      name: 'People',
      href: 'http://www.sushikame.com/#people',
    },
    {
      name: 'FAQ',
      href: '/about/faq',
    },
    {
      name: 'Legal',
      href: '/legal',
    },
  ];

  result.push(...items);
  return result;
}