import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../models/contact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.scss']
})
export class ContactDialogComponent {

  @Input() contact!:  Contact | null;
  @Output() deleteConfirmed = new EventEmitter<boolean>();

  constructor(private contactService: ContactService) { }

  confirmDelete() {
    if(!this.contact?.id)return
    this.contactService.deleteContact(this.contact.id).subscribe({
      next: () => {
        this.deleteConfirmed.emit(true);
      },
      error: (error) => {
        console.error('Error deleting contact:', error);
        this.deleteConfirmed.emit(false);
      }
    });
  }
  cancelDelete() {
    this.deleteConfirmed.emit(false);
  }
}
