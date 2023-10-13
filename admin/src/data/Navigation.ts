export type NavigationEntry = {
  label: string;
  items: NavigationItem[];
}

export type NavigationItem = {
  label: string;
  href: string;
}

export function getNavigationItems(): NavigationEntry[] {
  return [
    {
      label: 'General',
      items: [
        {
          label: 'Summary',
          href: '/summary'
        }
      ]
    },
    {
      label: 'Reservations',
      items: [
        {
          label: 'View Reservations',
          href: '/reservations/view'
        },
        {
          label: 'Create Reservation',
          href: '/reservations/create'
        },
        {
          label: 'View Blackouts',
          href: '/reservations/blackout/view'
        },
        {
          label: 'Create Blackout',
          href: '/reservations/blackout/create'
        }
      ]
    },
    {
      label: 'Menus',
      items: [
        {
          label: 'View Menus',
          href: '/menus/view'
        },
        {
          label: 'Create Menu',
          href: '/menus/create'
        }
      ]
    },
    {
      label: 'Customers',
      items: [
        {
          label: 'View Customers',
          href: '/users/view'
        },
        {
          label: 'Create Customer',
          href: '/users/create'
        }
      ]
    }
  ]
}