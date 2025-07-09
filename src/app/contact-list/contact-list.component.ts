import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Contact, ContactResponse } from '../models/contact';
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent {

  contacts: Contact[] = [];
  selectedContact: Contact | null = null;
  contactToDelete: Contact | null = null;
  isEditMode = false;
  showFormModal = false;
  showDeleteModal = false;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.getAllContacts();
  }

  getAllContacts() {
    this.contactService.getAllContacts().subscribe({
      next: (response: ContactResponse) => {
        this.contacts = response.contactDetails.filter(contact => !contact.isActive);
      },
      error: (error) => {
        console.error('Error fetching contacts:', error);
      }
    });
  }

  openAddModal() {
    this.isEditMode = false;
    this.selectedContact = null;
    this.showFormModal = true;
  }

  openEditModal(contact: Contact) {
    this.isEditMode = true;
    this.selectedContact = contact ;
    this.showFormModal = true;
  }

  onFormClosed(reload: boolean) {
    this.showFormModal = false;
    if (reload) {
      this.getAllContacts();
    }
  }

  confirmDelete(contact: Contact) {
    this.contactToDelete = contact;
    this.showDeleteModal = true;
  }

  onDeleteConfirmed(reload: boolean) {
    this.showDeleteModal = false;
    if( reload) {
      this.getAllContacts();
    }
  }
}
