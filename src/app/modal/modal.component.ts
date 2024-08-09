import { Component, inject, Input } from '@angular/core';
import { PaymentService } from '../payment/payment.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {

  //@Input() id: any;
  //@Input() name: any;
  //@Input() description: any;
  //@Input() price: any;

  readonly dialogRef = inject(MatDialogRef<ModalComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  constructor(private paymentService: PaymentService, private _snackBar: MatSnackBar) {}

  confirm(id: string): void {
    this.paymentService.confirm(id).subscribe(
      data => {
        this.dialogRef.close();
        this._snackBar.open("Pago confirmado", "Cerrar", {
          duration: 5000
        });
      },
      err => {
        this.dialogRef.close();
        this._snackBar.open("Error al confirmar: " + err, "Cerrar", {
          duration: 5000
        });
      }
    )
  }

  cancel(id: string): void  {
    this.paymentService.cancel(id).subscribe(
      data => {
        this.dialogRef.close();
        this._snackBar.open("Pago cancelado", "Cerrar", {
          duration: 5000
        });
      },
      err => {
        console.log(err);
        this.dialogRef.close();
        this._snackBar.open("Error al cancelar: " + err, "Cerrar", {
          duration: 5000
        });
      }
    )
  }
}
