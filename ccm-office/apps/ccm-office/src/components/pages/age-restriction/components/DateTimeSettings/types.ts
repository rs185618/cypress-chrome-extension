import { FunctionComponent } from 'react';
import { IGenericObject } from 'types';

export interface IRepeatableContainer {
  Component: FunctionComponent<IDateCompProps>;
  data: IGenericObject;
  title: string;
  onAdd: () => void;
  onDelete: (index: number) => void;
}
export interface IDateCompProps {
  value: IGenericObject;
  index: number;
}
