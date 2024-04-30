import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../models/user';

@Component({
  selector: 'app-user-info-modal',
  templateUrl: './user-info-modal.component.html',
  styleUrls: ['./user-info-modal.component.scss'],
})
export class UserInfoModalComponent {
  constructor(
    public dialogRef: MatDialogRef<UserInfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  closeModal(): void {
    this.dialogRef.close();
  }

  saveChanges(): void {
    // Burada kullanıcı bilgilerini kaydetme işlemi gerçekleştirilecek
    // Örneğin, bir API'ye güncelleme isteği gönderilebilir
    // Sonrasında modal kapatılabilir veya hata durumunda kullanıcıya bilgi verilebilir
    this.dialogRef.close();
  }
}
