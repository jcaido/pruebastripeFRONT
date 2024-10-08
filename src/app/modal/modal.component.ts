import { Component, inject, Input } from '@angular/core';
import { PaymentService } from '../payment/payment.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {

  readonly dialogRef = inject(MatDialogRef<ModalComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  constructor(private paymentService: PaymentService, private _snackBar: MatSnackBar, private route: Router) {}

  confirm(id: string, userName: string, titleProduct: string): void {
    this.paymentService.confirm(id).subscribe(
      data => {
        this.dialogRef.close();
        this._snackBar.open("Pago confirmado", "Cerrar", {
          duration: 5000
        });
        this.paymentService.getReceiptPdf(id, userName, titleProduct).subscribe(
          (data: Blob) => {
            const downloadURL = window.URL.createObjectURL(data);
            const link = document.createElement('a');
            link.href = downloadURL;
            link.download = 'receipt.pdf';
            link.click();
          },
          error => {
            console.error('Error downloading the receipt', error);
          }
        )
        this.route.navigate(['/']);
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
        this.dialogRef.close();
        this._snackBar.open("Error al cancelar: " + err, "Cerrar", {
          duration: 5000
        });
      }
    )
  }
}
