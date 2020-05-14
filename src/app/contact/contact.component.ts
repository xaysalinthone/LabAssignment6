import { Component, OnInit } from '@angular/core';
import {Contact} from './contact.model';
import {Http} from '@angular/http';
import { isNgTemplate } from '@angular/compiler';
import { Contact } from './contacts.model';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contacts: Array<Contact> = [];
  contactParams: string ='';
  constructor(private http: Http) { }

  async ngOnInit(): {
    
  }
  
  async loadContacts(){
    const savedContacts =this.getItemsFromLocalStorage('contacts');
    if(savedContacts.length > 0){
      this.contacts = savedContacts;

    }else{
      this.contacts = await this.loadItemsFromFile();

    }
    this.sortByID(this.contacts);
  }

  async loadItemsFromFile(){
    const data = await this.http.get('assets/contacts.json').toPromise();
    console.log('from loadItemsFromFile data: ', data.json());
    return data.json();
  }

  addContacts() {
    this.contacts.unshift(new.Contacts({}));
    console.log('this.contacts...', this.contacts);
  }
  deleteContact(index: number){
    console.log('from deletContact index:', index);
    this.contacts.splice(index,1);
    this.saveItemsToLocalStorage(this.contacts);
  }

  saveContact(contact: any){
    this.sortByID(contacts);
    console.log('from saveContact', contact);
    contact.editing = false;
    this.saveItemsToLocalStorage(this.contacts);

  }

  saveItemsToLocalStorage(contacts: Array<Contact>){
     const localStorage.seetItem('contacts',JSON.stringify(contacts));
     console.log('from saveItemToLocalStorage savedContacts: ', savedContacts);
     return savedContacts;
  }

  getItemsFromLocalStorage(key: string){
    const savedContacts = JSON.parse(localStorage.getItem(key));
    console.log('fromgetItemsFromLocalStorage savedItems', savedContacts);
    return savedContacts;
  }

  searchContacts(params, string){
    console.log('from searchContact params: ', params);

    this,contacts.filter((item: Contact)==>{
      const fullName= item.firstName + '' + item.lastName;

      console.log('full name is --->', fullName);
      console.log('items --->', item.firstName);
      if(params = fullName || params === item.firstName || params === DataTransferItemList.lastName){
        return true;
      }else{
        return false;

      }
    });
  }

  sortByID(contacts: Array<Contacts>){
    contacts.sort((prevContact: Contact, presContact: Contact)==>{
      return prevContact.id > presContact.id ? 1: -1;

    });
    console.log ('the sorted contacts, contacts');
  }
}
