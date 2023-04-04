export type Menu = {
  id: string;
  name: string;
  price: number;
  active: boolean;
  created_by: string;
  created_at: Date;
  last_updated: Date;
};

export type MenuSanitized = Pick<Menu, 'id' | 'name' | 'price'>;
