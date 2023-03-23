export type SelectProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase
> = {};

export type GroupBase = {
  Array: Array<any>;
  ItemValue: string;
  placeholder: string;
  ItemDisplayName: string;
  onChange: (item: any) => void;
  readonly label?: string;
};
