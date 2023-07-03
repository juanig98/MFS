import { ClrAlertTypesEnum } from "../enums/ClrAlert.enums";

export class ClrAlertSimple {
  show: boolean;
  type: ClrAlertTypesEnum;
  data: string;
  class: string;

  constructor(clrAlertProps: {
    show: boolean,
    type: ClrAlertTypesEnum,
    data: string
  },
  ) {
    const { show, type, data } = clrAlertProps
    this.show = show;
    this.type = type;
    this.data = data;
    this.class = "alert-" + type;
  }
}
