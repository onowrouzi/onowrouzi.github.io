import { DialogBox } from 'app/game-2d/utilities/text-manager/dialog-box';

export interface Vocalize {
  dialogBox: DialogBox;

  setDialog(txt: string);
  startDialog(txt?: string);
}
