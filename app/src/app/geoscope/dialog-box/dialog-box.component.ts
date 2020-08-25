import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GeoScopeModel} from '../../model/geoscope.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {
  action: string;
  local_data: any;
  description: 'My Dialog';

  dialogForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: GeoScopeModel) {
    console.log('Dialog Data' + JSON.stringify(data));
    this.local_data = {...data};
    this.action = this.local_data.action;
    this.dialogForm = new FormGroup({
      id: new FormControl(this.local_data._id, Validators.required),
      code: new FormControl(this.local_data._locationCode, Validators.required),
      type: new FormControl(this.local_data._geoScopeType, Validators.required),
      country: new FormControl(this.local_data._countryCode, Validators.required)

    });
  }

  ngOnInit(): void {
  }


  doAction() {

    console.log('Dialog Data FORM' + JSON.stringify(this.dialogForm.value));
    this.dialogRef.close({event: this.action, data: this.dialogForm.value});
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }
}
