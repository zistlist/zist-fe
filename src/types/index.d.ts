type ListItem = {
  name: string;
  comment: string;
  category: string;
  quantity: number;
  id: string;
  url: string;
};

type CheckedState = {
  checked: boolean;
};

type ListItemWithCheckedState = ListItem & CheckedState;
