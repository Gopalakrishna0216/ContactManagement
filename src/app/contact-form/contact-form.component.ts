import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact';
import { count, first } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html'
})
export class ContactFormComponent implements OnInit{

  @Input() contact: Contact | null = null;
  @Input() isEdit = false;
  @Output() formClosed = new EventEmitter<boolean>();
  
  contactForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {}
  
  ngOnInit(): void {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      postalCode: ['', Validators.required]
    });
  }
  ngOnChanges() {
    if (this.contact) {
      this.contactForm.patchValue(this.contact);
    }
  }
  onSubmit() {
    if (this.contactForm.valid) {
      const contactData: Contact = this.contactForm.value;
      if (this.isEdit && this.contact) {
        contactData.id = this.contact.id; 
        this.contactService.updateContact(contactData).subscribe({
          next: () => {
            this.formClosed.emit(true);
          },
          error: (error) => {
            console.error('Error updating contact:', error);
          }
        });
      } else {
        this.contactService.addContact(contactData).subscribe({
          next: () => {
            this.formClosed.emit(true);
          },
          error: (error) => {
            console.error('Error adding contact:', error);
          }
        });
      }
    }
  }
  onCancel() {
    this.formClosed.emit(false);
  }
}
